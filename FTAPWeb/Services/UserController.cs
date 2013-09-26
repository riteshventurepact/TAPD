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
using System.Web.Http;
using System.Security.Cryptography;
using System.Text;
using FTAPWeb.Controllers;


namespace FTAPWeb.Services
{
    public class UserController : ApiController
    {
        private TAPDEntities db = new TAPDEntities();

        // GET api/User
        public IEnumerable<User> GetUsers()
        {
            return db.Users.AsEnumerable();
        }

        // GET api/User/5
        public User GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return user;
        }

        // PUT api/User/5
        public HttpResponseMessage PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != user.UserId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(user).State = EntityState.Modified;

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

        // POST api/User
        public HttpResponseMessage PostUser(User user)
        {
            if (ModelState!=null?ModelState.IsValid:true)
            {
                var existinguser = (from p in db.Users where p.EmailId == user.EmailId select p).SingleOrDefault();
                if (existinguser == null)
                {
                    db.Users.Add(user);
                    db.SaveChanges();

                    SendEmail(user.UserId, user.EmailId, user.FirstName, user.LastName);

                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, user);
                    response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = user.UserId }));
                    return response;
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }
        public string SendEmail(int userid,string email,string firstname,string lastname)
        {
            try
            {
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;

                smtp.Timeout = 600000;
                smtp.Credentials = new System.Net.NetworkCredential("tapdventurepact@gmail.com", "venturepact");
                smtp.EnableSsl = true;

                MailMessage objMailParent = new MailMessage();
                objMailParent.IsBodyHtml = true;
                objMailParent.To.Add(email);
                objMailParent.From = new MailAddress("tapdventurepact@gmail.com", "TAPD");
                objMailParent.Subject = "Welcome To TAPD";
               
                string s = Utility.Encrypt(userid.ToString(),true);
                //string x = Decrypt(s, true);
                objMailParent.Body = "Dear " + firstname + " " + lastname + ",<br/><br/>Thanks for your registration in TAPD. In order to complete your registration please verify your email by clicking on the <a href=' http://localhost:4795/Home/AccountConfirmation/" + s + "'  >link</a><br/><br/>Thanks<br/>TAPD Team";
                objMailParent.Priority = MailPriority.High;
                smtp.Send(objMailParent);
                objMailParent.Dispose();
                return "sent";
            }
            catch (Exception ex)
            {
                return "error";
            }
        }

        // DELETE api/User/5
        public HttpResponseMessage DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Users.Remove(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, user);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}