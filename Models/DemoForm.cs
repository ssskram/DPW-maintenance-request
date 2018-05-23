using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace maintenance_reqsts.Models
{
    public class DemoForm
    {
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public string Department { get; set; }
        public string SupervisorEmail { get; set; }
        public string MachineType { get; set; }
        public string OrderType { get; set; }
        public string OTRSTicket { get; set; }
        public string SoftwareApplications { get; set; }
        [DataType(DataType.MultilineText)]
        public string Accessories { get; set; }
    }                      
}