using System.Collections.Generic;
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
        public async Task<object> search()
        {
            await get();
            var response = get().Result;
            dynamic facilities = JObject.Parse(response)["cgFacilitiesClass"];
            List<Facility> Facilities = new List<Facility>();
            foreach (var item in facilities)
            {
                var encodedName = item.IDField.ToString().Replace(" ", "_");
                var link =
                    String.Format
                    ("https://tools.wprdc.org/images/pittsburgh/facilities/{0}.jpg",
                        encodedName); // 0
                Facility fty = new Facility()
                {
                    oid = item.Oid,
                    name = item.IDField,
                    neighborhood = item.NeighborhoodField,
                    img = link
                };
                Facilities.Add(fty);
            }
            return(Facilities);
        }

        [HttpGet("[action]")]
        public async Task<object> map()
        {
            await get();
            var response = get().Result;
            dynamic facilities = JObject.Parse(response)["cgFacilitiesClass"];
            List<Facility> Facilities = new List<Facility>();
            foreach (var item in facilities)
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
            return(Facilities);
        }

        public async Task<string> get() 
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass?fields=Oid,CgShape,IDField,NeighborhoodField,InactiveField&filter=(([Inactive] is equal to false))";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", key);
            var content = await client.GetStringAsync(cartegraphUrl);
            return(content);
        }


    }
}
