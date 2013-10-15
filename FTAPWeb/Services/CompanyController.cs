using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using FTAPWeb.Controllers;
using FTAPWeb.Models;

namespace FTAPWeb.Services
{
    public class CompanyController : ApiController
    {
        private TAPDEntities db = new TAPDEntities();

        // GET api/Company
        public IEnumerable<Company> GetCompanies()
        {
            var companies = db.Companies.Include(c => c.Location).Include(c => c.Interest);
            return companies.AsEnumerable();
        }

        // GET api/Company/5
        public Company GetCompany(int id)
        {
            Company company = db.Companies.Find(id);
            if (company == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return company;
        }

        // PUT api/Company/5
        public HttpResponseMessage PutCompany(int id, Company company)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != company.CompanyId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(company).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Company
        [HttpPost]
        [ActionName("CreateCompany")]
        public String PostCompany(CompanyUser company)
        {
            if (ModelState.IsValid)
            {
                var existinguser = (from p in db.Users where p.EmailId == company.Email select p).SingleOrDefault();
                if (existinguser == null)
                {
                    string msg = "";
                    int? result = db.pCreateCompanyUser(company.CompanyName, company.FirstName, company.LastName, company.Email, company.Phone, company.Password).First();
                    if (result > 0)
                    {
                        msg = "Thanks for registration.Please Check your email to confirm registration.";
                        Utility.SendRegisterationEmail(int.Parse(result.ToString()), company.Email, company.FirstName, company.LastName);
                    }
                    else if (result == -2)
                    {
                        msg = "Company Already Exists.";
                    }
                    else if (result == -1)
                    {
                        msg = "Sorry! There was a problem.";
                    }

                    return msg;
                }
                else
                {
                    return "User already exists.";
                }
                //db.Companies.Add(company);
                //db.SaveChanges();

                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, company);
                //response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = company.CompanyId }));
                //return response;
            }
            else
            {
                //return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                return "Error";
            }
        }

        // DELETE api/Company/5
        public HttpResponseMessage DeleteCompany(int id)
        {
            Company company = db.Companies.Find(id);
            if (company == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Companies.Remove(company);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, company);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}