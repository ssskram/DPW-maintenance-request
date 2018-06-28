using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using maintenance_reqsts.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace maintenance_reqsts.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class facilities : Controller
    {
        HttpClient client = new HttpClient();

        [HttpGet("[action]")]
        public async Task<object> get()
        {
            await getFacilities();
            var response = getFacilities().Result;
            dynamic facilities = JObject.Parse(response)["cgFacilitiesClass"];
            List<Facility> Facilities = new List<Facility>();
            foreach (var item in facilities)
            {
                // filter out station 16
                if (item.Oid != "1438241139") 
                {
                    var encodedName = item.IDField.ToString().Replace(" ", "_");
                    var link =
                        String.Format
                        ("https://tools.wprdc.org/images/pittsburgh/facilities/{0}.jpg",
                            encodedName); // 0
                    Facility fty = new Facility()
                    {
                        oid = item.Oid,
                        lat = item.CgShape.Center.Lat,
                        lng = item.CgShape.Center.Lng,
                        name = item.IDField,
                        neighborhood = item.NeighborhoodField,
                        img = link
                    };
                    Facilities.Add(fty);
                }
            }
            return (Facilities);
        }

        [HttpGet("[action]")]
        public async Task<object> issues()
        {
            await getIssues();
            var response = getIssues().Result;
            dynamic iss = JObject.Parse(response)["cgRequestIssuesClass"];
            List<Issue> Issues = new List<Issue>();
            foreach (var i in iss)
            {
                Issue isu = new Issue()
                {
                    type = i.InternalRequestCategoryField,
                    name = i.IssueField
                };
                Issues.Add(isu);
            }
            List<Issue> sortedIssues = Issues.OrderBy(o => o.name).ToList();
            return (sortedIssues);
        }

        public async Task<string> getFacilities()
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass?fields=Oid,CgShape,IDField,NeighborhoodField,InactiveField&filter=(([Inactive] is equal to false))";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", key);
            var content = await client.GetStringAsync(cartegraphUrl);
            return (content);
        }

        public async Task<string> getIssues()
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestIssuesClass?fields=Oid,AppliesTocgFacilitiesField,IssueField,InternalRequestCategoryField,InactiveField&filter=(([AppliesTocgFacilities] is equal to true))";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            string content = await client.GetStringAsync(cartegraphUrl);
            return content;
        }


    }
}
