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
                if (existinguser.UserType == "CU")
                {
                    SessionHelper.USERID = existinguser.UserId;
                    return "CULogged In";
                }
                else if (existinguser.UserType == "U")
                {
                    SessionHelper.USERID = existinguser.UserId;
                    return "ULogged In";
                }
                else
                {
                    return "Invalid usertype";
                }
            }
        }


        // POST api/User/Test
        [HttpPost]
        [ActionName("Test")]
        public String Test([FromBody]CompanyPassword userpwd)
        {
            int? userid = SessionHelper.USERID;
            var existinguser = (from p in db.Users where p.UserId== userid && p.UserType==userpwd.type select p).SingleOrDefault();
            if (existinguser != null)
            {
                if (userpwd.oldPass == existinguser.Password)
                {
                    existinguser.Password = userpwd.newPass;
                    db.SaveChanges();
                    string msg = Utility.SendRegisterationEmail(existinguser.UserId,existinguser.EmailId, existinguser.FirstName, existinguser.LastName,"Dear "+existinguser.FirstName+" "+existinguser.LastName+"<br><br><br>Your password has been changed Successfully");
                    if (msg == "sent")
                    {
                        return "your password changed successfully.";
                    }
                    return msg;
                }
                else
                {
                    return "Your current password is not correct.";
                }
            }
            else
            {
                return "Your session has been expired, Please login to continue.";
            }
        }



        // to update company Infromation
        // POST api/User/Test
        [HttpPost]
        [ActionName("UpdateCompanyInformation")]
        public String UpdateCompanyInformation([FromBody]CompanyProfile userpwd)
        {
            int? userid = SessionHelper.USERID;
            var existinguser = (from p in db.Users where p.UserId == userid select p).SingleOrDefault();
            if (existinguser != null)
            {
                var existingComp = (from p in db.Companies where p.CompanyId == existinguser.CompanyId select p).SingleOrDefault();
                if (existingComp != null)
                {
                    existinguser.FirstName = userpwd.FirstName;
                    existinguser.LastName = userpwd.LastName;
                    existinguser.Phone = userpwd.Phone;

                    // updating comp name
                    existingComp.CompanyName = userpwd.CompName;

                    db.SaveChanges();
                    return "company information updates successfully.";

                }
                else
                {
                     return "no company record found.";
                }
            }
               else
                {
                     return "no user record found.";
                }
        
          
        }



        // POST api/User/Test
        [HttpPost]
        [ActionName("UpdateStudentInformation")]
        public String UpdateStudentInformation([FromBody]StudentInformation userpwd)
        {
            int? userid = SessionHelper.USERID;
            var existinguser = (from p in db.Users where p.UserId == userid select p).SingleOrDefault();
            if (existinguser != null)
            {
                var existingComp = (from p in db.Students where p.UserId == existinguser.UserId select p).SingleOrDefault();
                if (existingComp != null)
                {
                    existinguser.FirstName = userpwd.FirstName;
                    existinguser.LastName = userpwd.LastName;
                   

                    // updating comp name

                    if(userpwd.GraduationDate!="")
                    existingComp.Year = Convert.ToInt16( userpwd.GraduationDate);
                    if (userpwd.School != "")
                        existingComp.School = userpwd.School;

                    

                    db.SaveChanges();
                    return "Information updated successfully.";

                }
                else
                {
                    return "no student record found.";
                }
            }
            else
            {
                return "no user record found.";
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
                    Utility.SendRegisterationEmail(user.UserId, user.EmailId, user.FirstName, user.LastName);
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

    public class CompanyPassword
    {
        public string oldPass { get; set; }
        public string newPass { get; set; }
        public string type { get; set; }
    }


    public class CompanyProfile
    {
        public string CompName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        
    }


    public class StudentInformation
    {
        public string UserName { get; set; }
        public string SchoolEmail { get; set; }
        public string School { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string GraduationDate { get; set; }

    }
}