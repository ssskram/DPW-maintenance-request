using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using DPW_maintenancerequest.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Identity;

namespace DPW_maintenancerequest.Controllers
{
    [Authorize]
    public class Home : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public Home(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        HttpClient client = new HttpClient();
        public async Task<IActionResult> Index()
        {
            // get facilties
            await GetFacilities();
            var facilitydata = GetFacilities().Result;

            // get issue types
            await GetIssueTypes();
            var issuetypes = GetIssueTypes().Result;

            // handle issue types
            dynamic issues = JObject.Parse(issuetypes)["cgRequestIssuesClass"];
            List<IssueTypes> it = new List<IssueTypes>();
            foreach (var item in issues)
            {
                IssueTypes issue = new IssueTypes() 
                {
                    Type = item.AppliesTocgFacilitiesField,
                    Name = item.IssueField
                };
                if (issue.Type == true)
                {
                    it.Add(issue); 
                } 
            }
            ViewBag.Issues = it;

            // lists to populate with facilities & shapes
            List<Facility> Facilities = new List<Facility>();
            string Shapes = "";

            // handle faciltiies
            dynamic facilities = JObject.Parse(facilitydata)["cgFacilitiesClass"];
            foreach (var item in facilities)
            {
                string shape = item.CgShape.Points.ToString();
                string oid = item.Oid;
                string oidformatted = "{\"oid\":" + oid + "},";
                string join = shape.Insert(1, oidformatted); 
                string formattedshape = join + ",";

                // generate image url from data center
                var encodedName = item.IDField.ToString().Replace(" ", "_");
                var link =
                    String.Format
                    ("https://tools.wprdc.org/images/pittsburgh/facilities/{0}.jpg",
                        encodedName); // 0
                
                Facility fty = new Facility()
                {
                    OID = item.Oid,
                    FacilityName = item.IDField,
                    Address = item.StreetField,
                    Neighborhood = item.NeighborhoodField,
                    ImagePath = link.ToString()
                };
                Facilities.Add(fty);
                Shapes += formattedshape;
            }
            // pass array of shapes to viewbag
            Shapes = Shapes.TrimEnd(',');
            var done = "[" + Shapes + "]";
            ViewBag.Shapes = done;

            ViewBag.Trigger = TempData["status"];
            var googleapikey = Environment.GetEnvironmentVariable("googleapikey");
            ViewData["apistring"] =
                String.Format
                ("https://maps.googleapis.com/maps/api/js?key={0}&libraries=places,visualization&callback=initMap",
                    googleapikey); // 0

            // pass facility data as model to view
            return View(Facilities);
        }

        // submit method
        public async Task Submit(Facility model)
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var submittedby = _userManager.GetUserName(HttpContext.User);
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestsClass";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("X-HTTP-Method", "POST");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            var json =
                String.Format
                ("{{ 'cgRequestsClass' : [ {{ 'BuildingNameField' : '{0}' , 'IssueField' : '{1}' , 'DescriptionField' : '{2}', 'SubmitterPhoneNumberField' : '{3}', 'SubmittedByField' : '{4}', 'LocationDescriptionField' : '{5}'  }} ] }}",
                    model.Name, // 0
                    model.Issue, // 1
                    model.Description, // 2
                    model.Phone, // 3
                    submittedby, // 4
                    model.LocationDescription); // 5
            client.DefaultRequestHeaders.Add("ContentLength", json.Length.ToString());
            try
            {
                StringContent strContent = new StringContent(json);
                strContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json;odata=verbose");
                HttpResponseMessage response = client.PostAsync(cartegraphUrl, strContent).Result;
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
            }
        }

        // API calls

        public async Task<string> GetFacilities()
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            string content = await client.GetStringAsync(cartegraphUrl);
            return content;
        }

        public async Task<string> GetIssueTypes()
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestIssuesClass";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            string content = await client.GetStringAsync(cartegraphUrl);
            return content;
        }
        
        public IActionResult Error()
        {
            return View();
        }
    }
}
