using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DPW_maintenancerequest.Models
{
    public class Facility
    {
        public string FacilityName { get; set; }
        public string Address { get; set; }
        public string OID { get; set; }
        public string Neighborhood { get; set; }
        public string ImagePath { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Issue { get; set; }
        public string Description { get; set; }
        public string LocationDescription { get; set; }
    }
}
