using System;
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
using System.Drawing;


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
            await GetFacility(OID);
            var facilitydata = GetFacility(OID).Result;

            await GetImage(OID);
            var image = GetImage(OID).Result;

            byte[] imageByteData = Encoding.ASCII.GetBytes(image);
            string imageBase64Data= Convert.ToBase64String(imageByteData);
            string imageDataURL= string.Format("data:image/png;base64,{0}", imageBase64Data);
            
            ViewBag.ImageData = image;
            
            var googleapikey = Environment.GetEnvironmentVariable("googleapikey");
            ViewData["apistring"] =
                String.Format
                ("https://maps.googleapis.com/maps/api/js?key={0}&libraries=places,visualization&callback=initMap",
                    googleapikey); // 0

            dynamic deserialized = JObject.Parse(facilitydata)["cgFacilitiesClass"][0];
            Facility fty = new Facility()
            {
                OID = OID,
                FacilityName = deserialized.IDField,
                Address = deserialized.StreetField,
                Type = deserialized.FacilityTypeField
            };
            ViewBag.Facility = fty;
            return View();
        }

        public async Task<IActionResult> Create(WorkOrder model)
        {
            await PostWorkOrder(model);
            return RedirectToAction("Success");
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

        public async Task<string> GetImage(string OID)
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl =
            String.Format
            ("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/attachments/primary/cgFacilitiesClass/{0}",
                OID); // 0
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            var content = await client.GetStringAsync(cartegraphUrl);
            return content;
        }

        public async Task PostWorkOrder(WorkOrder model)
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var submittedby = _userManager.GetUserName(HttpContext.User);
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/{enter rest here}}";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("X-HTTP-Method", "POST");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            var json =
                String.Format
                ("{{ 'cgLabor_OvertimeLogsClass' : [ {{ 'ParentOid' : '{0}' , 'CalledByField' : '{1}' , 'ResponseField' : '{2}' }} ] }}",
                    model.OID, // 0
                    submittedby, // 1
                    model.WORK); //2
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
