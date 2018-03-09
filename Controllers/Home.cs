using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DPW_maintenancerequest.Models;
using Microsoft.AspNetCore.Authorization;

namespace DPW_maintenancerequest.Controllers
{
    [Authorize]
    public class Home : Controller
    {
        public IActionResult Index()
        {
            ViewBag.Trigger = TempData["status"];
            return View();
        }
        
        public IActionResult Error()
        {
            return View();
        }
    }
}
