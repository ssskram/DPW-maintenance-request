using System;
using System.ComponentModel.DataAnnotations;

namespace DPW_maintenancerequest.Models
{
    public class IssueTypes
    {
        public string Type { get; set; }
        public Issue[] Options { get; set; }
    }
    public class Issue
    {
        public string Name { get; set; }
    }
}
