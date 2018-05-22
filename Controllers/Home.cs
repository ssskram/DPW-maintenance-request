using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using DPW_maintenancerequest.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Identity;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace DPW_maintenancerequest.Controllers
{
    [Authorize]
    public class Home : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public Home(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        HttpClient client = new HttpClient();
        public async Task<IActionResult> Index()
        {
            var user = _userManager.GetUserName(HttpContext.User).ToString();

            // get issue types
            await GetIssueTypes();
            var issuetypes = GetIssueTypes().Result;

            // get requests
            await GetUsersItems(user);
            var tasks = GetUsersItems(user).Result;

            // get facilties
            await GetFacilities();
            var facilitydata = GetFacilities().Result;

            // handle issue types
            dynamic issues = JObject.Parse(issuetypes)["cgRequestIssuesClass"];
            List<IssueTypes> it = new List<IssueTypes>();
            HashSet<string> alreadyEncountered = new HashSet<string>();
            foreach (var i in issues)
            {
                var parentType = i.InternalRequestCategoryField.ToString();
                if (parentType == "")
                {
                    if (alreadyEncountered.Contains(parentType))
                    {
                        continue;
                    }
                    else 
                    {
                        IssueTypes type = new IssueTypes();
                        List<Issue> issue = new List<Issue>();
                        foreach (var child in issues)
                        {
                            IssueTypes types = new IssueTypes()
                            {
                                Type = i.InternalRequestCategoryField,
                                Options = null
                            };
                            if (child.InternalRequestCategoryField.ToString() == parentType)
                            {
                                Issue y = new Issue()
                                {
                                    Name = child.InternalRequestCategoryField.ToString()
                                };
                                issue.Add(y);
                            }
                            it.Add(types);
                        }
                    }
                }
            }

            ViewBag.Issues = it;

            // handle requests
            dynamic requestitems = JObject.Parse(tasks)["cgTasksClass"];
            List<Tasks> ri = new List<Tasks>();
            int counter = 0;
            var dateformat = "MM/dd/yyyy";
            var datetimeformat = "MM/dd/yyyy HH:mm";
            foreach (var item in requestitems)
            {
                counter++;
                Tasks req = new Tasks()
                {
                    FacilityName = item.cgAssetIDField,
                    Issue = item.TaskDescriptionField,
                    LastActivity = item.cgLastModifiedField.ToString(dateformat),
                    Submitted = item.EntryDateField.ToString(datetimeformat),
                    Description = item.NotesField,
                    Status = item.StatusField,
                    LocationDescription = item.LocationDescriptionField,
                    Id = item.IDField
                };
                ri.Add(req);
            }
            ViewBag.Items = counter;
            ViewBag.Requests = ri;

            // handle faciltiies
            // lists to populate with facilities & shapes
            List<Facility> Facilities = new List<Facility>();
            string Shapes = "";

            dynamic facilities = JObject.Parse(facilitydata)["cgFacilitiesClass"];
            foreach (var item in facilities)
            {
                if (item.InactiveField == "False")
                {
                    string shape = item.CgShape.Points.ToString();
                    string oid = item.Oid;
                    string oidformatted = "{\"oid\":" + oid + "},";
                    string join = shape.Insert(1, oidformatted);
                    string formattedshape = join + ",";

                    // generate image url from data center
                    var encodedName = item.IDField.ToString().Replace(" ", "_");
                    var link =
                        String.Format
                        ("https://tools.wprdc.org/images/pittsburgh/facilities/{0}.jpg",
                            encodedName); // 0

                    Facility fty = new Facility()
                    {
                        OID = item.Oid,
                        FacilityName = item.IDField,
                        Address = item.StreetField,
                        Neighborhood = item.NeighborhoodField,
                        ImagePath = link.ToString()
                    };
                    Facilities.Add(fty);
                    Shapes += formattedshape;
                }
            }
            // pass array of shapes to viewbag
            Shapes = Shapes.TrimEnd(',');
            var done = "[" + Shapes + "]";
            ViewBag.Shapes = done;

            ViewBag.Trigger = TempData["status"];
            var googleapikey = Environment.GetEnvironmentVariable("googleapikey");
            ViewData["apistring"] =
                String.Format
                ("https://maps.googleapis.com/maps/api/js?key={0}&libraries=places,visualization&callback=initMap",
                    googleapikey); // 0

            // pass facility data as model to view
            return View(Facilities);
        }

        // submit method
        public async Task Submit(Facility model)
        {
            await SendEmail(model);
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var submittedby = _userManager.GetUserName(HttpContext.User);
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestsClass";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("X-HTTP-Method", "POST");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            var json =
                String.Format
                ("{{ 'cgRequestsClass' : [ {{ 'BuildingNameField' : '{0}' , 'IssueField' : '{1}' , 'DescriptionField' : '{2}', 'SubmitterPhoneNumberField' : '{3}', 'SubmittedByField' : '{4}', 'LocationDescriptionField' : '{5}'  }} ] }}",
                    model.Name, // 0
                    model.Issue, // 1
                    model.Description, // 2
                    model.Phone, // 3
                    submittedby, // 4
                    model.LocationDescription); // 5
            client.DefaultRequestHeaders.Add("ContentLength", json.Length.ToString());
            try
            {
                StringContent strContent = new StringContent(json);
                strContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json;odata=verbose");
                HttpResponseMessage response = client.PostAsync(cartegraphUrl, strContent).Result;
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
            }
        }
        public async Task SendEmail(Facility model)
        {
            var submittedby = _userManager.GetUserName(HttpContext.User);
            var apiKey = Environment.GetEnvironmentVariable("sendgrid");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(submittedby, "Department of Public Works");
            var subject = "Your maintenance request has been received";
            var to = new EmailAddress(submittedby, "Client");
            var plainTextContent =
                String.Format
                ("<strong> Your maintenance request has been received. </strong><br><br><strong> Facility: </strong><br> {0} <br><br><strong> Issue: </strong><br> {1} <br><br><strong> Description: </strong><br> {2} <br><br><strong> Location description: </strong><br> {5} <br><br>To check on the status of your submitted items, return to the <a href='https://maintenancerequest.azurewebsites.us'>DPW Maintenance Request app</a><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                    model.Name, // 0
                    model.Issue, // 1
                    model.Description, // 2
                    model.Phone, // 3
                    submittedby, // 4
                    model.LocationDescription); // 5
            var htmlContent =
                String.Format
                ("<strong> Your maintenance request has been received. </strong><br><br><strong> Facility: </strong><br> {0} <br><br><strong> Issue: </strong><br> {1} <br><br><strong> Description: </strong><br> {2} <br><br><strong> Location description: </strong><br> {5} <br><br>To check on the status of your submitted items, return to the <a href='https://maintenancerequest.azurewebsites.us'>DPW Maintenance Request app</a><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                    model.Name, // 0
                    model.Issue, // 1
                    model.Description, // 2
                    model.Phone, // 3
                    submittedby, // 4
                    model.LocationDescription); // 5
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        // API calls

        public async Task<string> GetFacilities()
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            string content = await client.GetStringAsync(cartegraphUrl);
            return content;
        }

        public async Task<string> GetIssueTypes()
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestIssuesClass?fields=Oid,AppliesTocgFacilitiesField,IssueField,InternalRequestCategoryField,InactiveField&filter=(([AppliesTocgFacilities] is equal to true))";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            string content = await client.GetStringAsync(cartegraphUrl);
            return content;
        }

        public async Task<string> GetUsersItems(string user)
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl =
            String.Format
            ("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/cgTasksClass?filter=(([RequesterEmail] is equal to \"{0}\"))",
                user); // 0
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", key);
            string content = await client.GetStringAsync(cartegraphUrl);
            return content;
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
