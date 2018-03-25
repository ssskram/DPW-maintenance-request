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
        public IActionResult Index()
        {
            // get facilties
            // get issue types
            // handle issue types
            // await facilities
            // pass shape coordinates to array, set to viewbag
            // generate image url
            // pass facility data as model to view
            ViewBag.Trigger = TempData["status"];
            var googleapikey = Environment.GetEnvironmentVariable("googleapikey");
            ViewData["apistring"] =
                String.Format
                ("https://maps.googleapis.com/maps/api/js?key={0}&libraries=places,visualization&callback=initMap",
                    googleapikey); // 0
            return View();
        }

        // submit method
        
        public IActionResult Error()
        {
            return View();
        }
    }
}
