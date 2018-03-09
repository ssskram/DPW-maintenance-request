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
    public class New : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public New(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        HttpClient client = new HttpClient();

        public async Task<IActionResult> WorkOrder(string OID)
        {
            // set api key for google
            var googleapikey = Environment.GetEnvironmentVariable("googleapikey");
            ViewData["apistring"] =
                String.Format
                ("https://maps.googleapis.com/maps/api/js?key={0}&libraries=places,visualization&callback=initMap",
                    googleapikey); // 0

            await GetFacility(OID);
            var facilitydata = GetFacility(OID).Result;

            await GetIssueTypes();
            var issuetypes = GetIssueTypes().Result;

            // handle facility data
            dynamic facility = JObject.Parse(facilitydata)["cgFacilitiesClass"][0];
            dynamic points = JObject.Parse(facilitydata)["cgFacilitiesClass"][0]["CgShape"]["Center"];
            Facility fty = new Facility()
            {
                OID = OID,
                Lat = points.Lat,
                Long = points.Lng, 
                FacilityName = facility.IDField,
                Address = facility.StreetField
            };
            ViewBag.Facility = fty;

            // generate image url
            var encodedName = facility.IDField.ToString().Replace(" ", "_");
            var link =
                String.Format
                ("https://tools.wprdc.org/images/pittsburgh/facilities/{0}.jpg",
                    encodedName); // 0
            ViewBag.ImageData = link;

            //handle issue types
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

            return View();
        }

        public async Task<IActionResult> Submit(WorkOrder model)
        {
            await PostWorkOrder(model);
            TempData["status"] = "Success";
            return RedirectToAction(nameof(Home.Index), "Home");
        }

        // API calls

        public async Task<string> GetFacility(string OID)
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl =
            String.Format
            ("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass/{0}",
                OID); // 0
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

        public async Task PostWorkOrder(WorkOrder model)
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
                ("{{ 'cgRequestsClass' : [ {{ 'BuildingNameField' : '{0}' , 'IssueField' : '{1}' , 'DescriptionField' : '{2}', 'SubmitterPhoneNumberField' : '{3}', 'SubmittedByField' : '{4}'  }} ] }}",
                    model.Name, // 0
                    model.Issue, // 1
                    model.Description, // 2
                    model.Phone, // 3
                    submittedby); // 4
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
    }
}
