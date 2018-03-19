using System;
using System.ComponentModel.DataAnnotations;

namespace DPW_maintenancerequest.Models
{
    public class WorkOrder
    {
        public string Name { get; set; }
        [Display(Prompt = "Enter your phone number")]
        public string Phone { get; set; }
        public string Issue { get; set; }
        [Display(Prompt = "Describe the issue")]
        [DataType(DataType.MultilineText)]
        public string Description { get; set; }
        [Display(Prompt = "Describe the location")]
        [DataType(DataType.MultilineText)]
        public string LocationDescription { get; set; }

    }
}
