using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace DPW_maintenancerequest.Models
{
    public class IssueTypes
    {
        public string Type { get; set; }
    }
    public class Issues
    {
        public string Type { get; set; }
        public string Name { get; set; }
    }
}
