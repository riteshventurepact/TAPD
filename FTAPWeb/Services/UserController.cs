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
using System.Web.Configuration;


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

        // POST api/User/ValidateUser
        [HttpPost]
        [ActionName("ValidateUser")]
        public String ValidateUser([FromBody] User user)
        {
            var existinguser = (from p in db.Users where p.EmailId == user.EmailId && p.Password==user.Password && p.UserType==user.UserType select p).SingleOrDefault();
            if (existinguser == null)
            {
                return "Invalid username or password";
            }
            else
            {
                return existinguser.UserId.ToString();
            }
        }

        //POST api/User/ForgotPassword
        [HttpPost]
        [ActionName("ForgotPassword")]
        public String ForgotPassword([FromBody] User user)
        {
            Utility.SendForgotPasswordEmail(user.EmailId);
            return "Please check your email to reset your password";
        }


        // POST api/User
        [HttpPost]
        [ActionName("CreateUser")]
        public String PostUser([FromBody] User user)
        {
            if (ModelState!=null?ModelState.IsValid:true)
            {
                var existinguser = (from p in db.Users where p.EmailId == user.EmailId select p).SingleOrDefault();
                if (existinguser == null)
                {
                    db.Users.Add(user);
                    db.SaveChanges();
                    return "User created successfully, Please check your email to confirm your registration.";
                }
                else
                {
                    return "User Already Exists.";
                }
            }
            else
            {
                return "Oops! Something Went Wrong.";
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