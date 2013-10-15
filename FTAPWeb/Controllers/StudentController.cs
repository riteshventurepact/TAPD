using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FTAPWeb.Controllers
{
    public class StudentController : Controller
    {
        private TAPDEntities db = new TAPDEntities();
        //
        // GET: /Student/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult StudentDashboard()
        {
            int? id = SessionHelper.USERID;
            FTAPWeb.User user = db.Users.Find(id);
            ViewBag.UserDetails = user;
           
            return View();
        }

        public ActionResult StudentAccountSetting()
        {
            int? id = SessionHelper.USERID;
            FTAPWeb.User user = db.Users.Find(id);
            ViewBag.UserDetails = user;
            return View();
        }

        public ActionResult StudentInformation()
        {
            int? id = SessionHelper.USERID;
            FTAPWeb.User user = db.Users.Find(id);
            ViewBag.UserDetails = user;
            FTAPWeb.Student stu = (from p in db.Students where p.UserId == user.UserId select p).FirstOrDefault();

                
            ViewBag.StudentDetails = stu;
            return View();
        }

        public ActionResult StudentPersonalisation()
        {
            int? id = SessionHelper.USERID;
            FTAPWeb.User user = db.Users.Find(id);
            ViewBag.UserDetails = user;
            FTAPWeb.Student stu = (from p in db.Students where p.UserId == user.UserId select p).FirstOrDefault();
            ViewBag.StudentDetails = stu;


            var inter = (from p in db.Interests where p.IsActive == true select p).ToList();
            ViewBag.InterestList = inter;

            return View();
        }




    }
}
