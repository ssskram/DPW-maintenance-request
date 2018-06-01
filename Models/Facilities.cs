using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace maintenance_reqsts.Models
{
    public class Facility
    {
        public string oid { get; set; }
        public string lat { get; set; }
        public string lng { get; set; }
        public string neighborhood { get; set; }
        public string name { get; set; }
        public string imgSrc { get; set; }
    }                      
}