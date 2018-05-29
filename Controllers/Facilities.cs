using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using maintenance_reqsts.Models;
using System.Net.Http;
using System.Net.Http.Headers;

namespace maintenance_reqsts.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class facilities : Controller
    {
        HttpClient client = new HttpClient();

        [HttpGet("[action]")]
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
