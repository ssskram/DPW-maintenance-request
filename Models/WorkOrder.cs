using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace DPW_maintenancerequest.Models
{
    public class WorkOrder
    {
        public string OID { get; set; }
        public string WORK { get; set; }
    }
}
