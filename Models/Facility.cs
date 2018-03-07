using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace DPW_maintenancerequest.Models
{
    public class Facility
    {
        public string FacilityName { get; set; }
        public string Address { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string OID { get; set; }
    }
}
