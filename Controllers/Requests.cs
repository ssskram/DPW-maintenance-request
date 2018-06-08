using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using maintenance_reqsts.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace maintenance_reqsts.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class requests : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public requests(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        HttpClient client = new HttpClient();

        [HttpGet("[action]")]
        public async Task<object> all()
        {
            await getAll();
            var response = getAll().Result;
            dynamic requests = JObject.Parse(response)["cgRequestsClass"];
            List<Request> Requests = new List<Request>();
            var datetimeformat = "MM/dd/yyyy HH:mm";
            foreach (var item in requests)
            {
                Request rqs = new Request()
                {   
                    oid = item.Oid,
                    building = item.BuildingNameField,
                    location = item.LocationDescriptionField,
                    description = item.DescriptionField,
                    submitted = item.EntryDateField.ToString(datetimeformat),
                    status = item.StatusField
                };
                Requests.Add(rqs);
            }
            return(Requests);
        }

        [HttpGet("[action]")]
        public async Task<object> mine()
        {
            await getMine();
            var response = getMine().Result;
            dynamic requests = JObject.Parse(response)["cgTasksClass"];
            List<Request> Requests = new List<Request>();
            var datetimeformat = "MM/dd/yyyy HH:mm";
                        var dateformat = "MM/dd/yyyy";
            foreach (var item in requests)
            {
                Request rqs = new Request()
                {
                    oid = item.Oid,
                    building = item.cgAssetIDField,
                    location = item.LocationDescriptionField,
                    description = item.NotesField,
                    submitted = item.EntryDateField.ToString(datetimeformat),
                    status = item.StatusField,
                    lastModified = item.cgLastModifiedField.ToString(dateformat),
                };
                Requests.Add(rqs);
            }
            return(Requests);
        }

        [HttpPost("[action]")]
        public async Task post([FromBody] Request model)
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
                    model.building, // 0
                    model.issue, // 1
                    model.description, // 2
                    model.phone, // 3
                    submittedby, // 4
                    model.location); // 5
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

        public async Task SendEmail(Request model)
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
                    model.building, // 0
                    model.issue, // 1
                    model.description, // 2
                    model.phone, // 3
                    submittedby, // 4
                    model.location); // 5
            var htmlContent =
                String.Format
                ("<strong> Your maintenance request has been received. </strong><br><br><strong> Facility: </strong><br> {0} <br><br><strong> Issue: </strong><br> {1} <br><br><strong> Description: </strong><br> {2} <br><br><strong> Location description: </strong><br> {5} <br><br>To check on the status of your submitted items, return to the <a href='https://maintenancerequest.azurewebsites.us'>DPW Maintenance Request app</a><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                    model.building, // 0
                    model.issue, // 1
                    model.description, // 2
                    model.phone, // 3
                    submittedby, // 4
                    model.location); // 5
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task<string> getAll() 
        {
            var key = Environment.GetEnvironmentVariable("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestsClass?fields=Oid,BuildingNameField,LocationDescriptionField,DescriptionField,EntryDateField,StatusField&filter=([EnteredBy] is equal to \"APIAdmin\")";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", key);
            var content = await client.GetStringAsync(cartegraphUrl);
            return(content);
        }
        public async Task<string> getMine() 
        {
            var user = _userManager.GetUserName(HttpContext.User);
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
    }
}
