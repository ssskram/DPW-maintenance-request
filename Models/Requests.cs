
namespace maintenance_reqsts.Models
{
    public class Request
    {
        public string oid { get; set; }
        public string building { get; set; }
        public string location { get; set; }
        public string description { get; set; }
        public string submitted { get; set; }
        public string status { get; set; }
        public string lastModified { get; set; }
        public string type { get; set; }
        public string issue { get; set; }
        public string phone { get; set; }
        public string img { get; set; }
        public string notes { get; set; }
    }                   
}