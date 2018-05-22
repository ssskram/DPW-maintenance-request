using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DPW_maintenancerequest.Models
{
    public class Requests
    {
        public string FacilityName { get; set; }
        public string Issue { get; set; }
        public string IssueType { get; set; }
        public string Status { get; set; }
        public string LastActivity { get; set; }
        public string Submitted { get; set; }
        public string Description { get; set; }
        public string LocationDescription { get; set; }
    }
}
