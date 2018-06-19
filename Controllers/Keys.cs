using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using maintenance_reqsts.Models;

namespace maintenance_reqsts.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class keys : Controller
    {

        [HttpGet("[action]")]
        public IActionResult google() 
        {
            return Json('1');
        }
    }
}
