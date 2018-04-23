using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration.UserSecrets;
using DPW_maintenancerequest.Data;
using Microsoft.WindowsAzure.Storage.Blob;
using DPW_maintenancerequest.Models;

namespace DPW_maintenancerequest
{
   public class Startup
    {
        string _MSClientID = null;
        string _MSClientSecret = null;
        string _CartegraphAPIkey = null;
        string _googleapikey = null;
        string _sendgrid = null;
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            _MSClientID = Configuration["MSClientId"];
            _MSClientSecret = Configuration["MSClientSecret"];
            _CartegraphAPIkey = Configuration["CartegraphAPIkey"];
            _googleapikey = Configuration["googleapikey"];
            _sendgrid = Configuration["sendgrid"];

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase(Guid.NewGuid().ToString()));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddAuthentication()
                .AddMicrosoftAccount(microsoftOptions =>
                {
                    microsoftOptions.ClientId = Configuration["MSClientId"];
                    microsoftOptions.ClientSecret = Configuration["MSClientSecret"];
                })
                .Services.ConfigureApplicationCookie(options =>
                {
                    options.Cookie.Name = ".PGH_SSO";    
                    options.Cookie.Domain = ".azurewebsites.us";
                });

            // begin sso config
            string uri = Configuration.GetValue<string>("SSOuri");
            Uri storageUri = new Uri($"{uri}");
            CloudBlobClient blobClient = new CloudBlobClient(storageUri);
            CloudBlobContainer container = blobClient.GetContainerReference("keys");
            services.AddDataProtection()
                .SetApplicationName("PGH_SSO")
                .PersistKeysToAzureBlobStorage(container, "key.xml");
            services.ConfigureApplicationCookie(options => {
                options.Cookie.Name = ".PGH_SSO";
                options.Cookie.Domain = ".azurewebsites.us";
            });
            // end sso config

            // add application services
            Environment.SetEnvironmentVariable("CartegraphAPIkey", Configuration["CartegraphAPIkey"]);
            Environment.SetEnvironmentVariable("googleapikey", Configuration["googleapikey"]);
            Environment.SetEnvironmentVariable("sendgrid", Configuration["sendgrid"]);

            services.AddMvc()
                .AddSessionStateTempDataProvider();

            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSession(); 

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
