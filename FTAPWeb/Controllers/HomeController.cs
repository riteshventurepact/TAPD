using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FTAPWeb.Controllers
{
    public class HomeController : Controller
    {
        private TAPDEntities db = new TAPDEntities();

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult AccountConfirmation(string id)
        {
            int urlid=int.Parse(Utility.Decrypt(id.ToString(), true));
            User user = (from p in db.Users where p.UserId == urlid select p).SingleOrDefault();
            user.IsActive = true;
            db.SaveChanges();
            ViewBag.UserObject = user;
            return View(user);
        }

        public ActionResult Default()
        {
            ViewBag.Interests = db.Interests.ToList();
            return View();
        }

        public ActionResult Interest()
        {
            ViewBag.Interests = db.Interests.ToList();
            return View();
        }

        public ActionResult Companies()
        {
            ViewBag.Companies = db.Companies.ToList();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
