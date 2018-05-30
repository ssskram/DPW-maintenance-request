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

                Facility fty = new Facility()
                {
                    oid = item.Oid,
                    name = item.IDField,
                    neighborhood = item.NeighborhoodField,
                    imgSrc = encodedName
                };
                Facilities.Add(fty);
            }
            return(Facilities);
        }

        [HttpGet("[action]")]
        public async Task Map()
        {
            await get();
            var response = get().Result;
        }

        public async Task<string> get() 
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", key);
            var content = await client.GetStringAsync(cartegraphUrl);
            return(content);
        }


    }
}
