using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using maintenance_reqsts.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace maintenance_reqsts.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    public class officeMoves : Controller {

        private readonly UserManager<ApplicationUser> _userManager;
        public officeMoves (UserManager<ApplicationUser> userManager) {
            _userManager = userManager;
        }

        HttpClient client = new HttpClient ();
        [HttpPost ("[action]")]
        public async Task post ([FromBody] Request model) {
            await Task.Delay (1);
        }
    }
}