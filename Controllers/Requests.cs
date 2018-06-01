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
    public class requests : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public requests(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        HttpClient client = new HttpClient();

        [HttpGet("[action]")]
        public async Task<object> all()
        {
            await getAll();
            var response = getAll().Result;
            dynamic requests = JObject.Parse(response)["cgRequestsClass"];
            List<Request> Requests = new List<Request>();
            var datetimeformat = "MM/dd/yyyy HH:mm";
            foreach (var item in requests)
            {
                Request rqs = new Request()
                {   
                    oid = item.Oid,
                    building = item.BuildingNameField,
                    location = item.LocationDescriptionField,
                    description = item.DescriptionField,
                    submitted = item.EntryDateField.ToString(datetimeformat),
                    status = item.StatusField
                };
                Requests.Add(rqs);
            }
            return(Requests);
        }

        [HttpGet("[action]")]
        public async Task<object> mine()
        {
            await getMine();
            var response = getMine().Result;
            dynamic requests = JObject.Parse(response)["cgTasksClass"];
            List<Request> Requests = new List<Request>();
            var datetimeformat = "MM/dd/yyyy HH:mm";
                        var dateformat = "MM/dd/yyyy";
            foreach (var item in requests)
            {
                Request rqs = new Request()
                {
                    oid = item.Oid,
                    building = item.cgAssetIDField,
                    location = item.LocationDescriptionField,
                    description = item.NotesField,
                    submitted = item.EntryDateField.ToString(datetimeformat),
                    status = item.StatusField,
                    lastModified = item.cgLastModifiedField.ToString(dateformat),
                };
                Requests.Add(rqs);
            }
            return(Requests);
        }

        public async Task<string> getAll() 
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestsClass?fields=Oid,BuildingNameField,LocationDescriptionField,DescriptionField,EntryDateField,StatusField&filter=([EnteredBy] is equal to \"APIAdmin\")";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", key);
            var content = await client.GetStringAsync(cartegraphUrl);
            return(content);
        }
        public async Task<string> getMine() 
        {
            var user = _userManager.GetUserName(HttpContext.User);
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl =
            String.Format
            ("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/cgTasksClass?filter=(([RequesterEmail] is equal to \"{0}\"))",
                user); // 0
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            string content = await client.GetStringAsync(cartegraphUrl);
            return content;
        }
    }
}
