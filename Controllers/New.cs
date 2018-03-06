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
    public class New : Controller
    {

        public IActionResult WorkOrder(string OID)
        {
            // get facility
            // write facility data to viewmodel to display in infowindow
            return View();
        }
        
    }
}
