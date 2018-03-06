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
    public class NewRequest : Controller
    {
        public IActionResult Form()
        {
            return View();
        }
    }
}
