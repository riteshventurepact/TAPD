using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FTAPWeb.Controllers
{
    public class CompanyController : Controller
    {
        private TAPDEntities db = new TAPDEntities();

        //
        // GET: /Company/

        public ActionResult Index()
        {
            var companies = db.Companies.Include(c => c.Interest).Include(c => c.Location);
            return View(companies.ToList());
        }

        //
        // GET: /Company/Details/5

        public ActionResult Details(int id = 0)
        {
            Company company = db.Companies.Find(id);
            if (company == null)
            {
                return HttpNotFound();
            }
            return View(company);
        }

        //
        // GET: /Company/Create

        public ActionResult Create()
        {
            ViewBag.IndustryId = new SelectList(db.Interests, "InterestId", "InterestName");
            ViewBag.LocationId = new SelectList(db.Locations, "LocationId", "Location1");
            return View();
        }


        public ActionResult CompanyDashboard(string CompanyIdEncrypted)
        {
            //string id = Utility.Decrypt(CompanyIdEncrypted,true);
            Company company = db.Companies.Find(CompanyIdEncrypted);
            //ViewBag.IndustryId = new SelectList(db.Interests, "InterestId", "InterestName");
            //ViewBag.LocationId = new SelectList(db.Locations, "LocationId", "Location1");
            return View(company);
        }

        //
        // POST: /Company/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Company company)
        {
            if (ModelState.IsValid)
            {
                
                db.Companies.Add(company);
                db.SaveChanges();
                if (Request.Files["file"].ContentLength > 0)
                {
                    string filename = Server.MapPath("../Assets/CompanyPictures") + "/" + company.CompanyId + "/" + company.CompanyName + ".png";
                    company.CompanyPicture = filename;
                    Request.Files["file"].SaveAs(filename);
                }
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.IndustryId = new SelectList(db.Interests, "InterestId", "InterestName", company.IndustryId);
            ViewBag.LocationId = new SelectList(db.Locations, "LocationId", "Location1", company.LocationId);
            return View(company);
        }

        //
        // GET: /Company/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Company company = db.Companies.Find(id);
            if (company == null)
            {
                return HttpNotFound();
            }
            ViewBag.IndustryId = new SelectList(db.Interests, "InterestId", "InterestName", company.IndustryId);
            ViewBag.LocationId = new SelectList(db.Locations, "LocationId", "Location1", company.LocationId);
            return View(company);
        }

        //
        // POST: /Company/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Company company)
        {
            if (ModelState.IsValid)
            {
                db.Entry(company).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.IndustryId = new SelectList(db.Interests, "InterestId", "InterestName", company.IndustryId);
            ViewBag.LocationId = new SelectList(db.Locations, "LocationId", "Location1", company.LocationId);
            return View(company);
        }

        //
        // GET: /Company/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Company company = db.Companies.Find(id);
            if (company == null)
            {
                return HttpNotFound();
            }
            return View(company);
        }

        //
        // POST: /Company/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Company company = db.Companies.Find(id);
            db.Companies.Remove(company);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}