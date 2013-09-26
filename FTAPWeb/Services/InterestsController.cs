using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FTAPWeb.Services
{
    public class InterestsController : ApiController
    {
        private TAPDEntities db = new TAPDEntities();

        // GET api/Interests
        public IEnumerable<Interest> GetInterests()
        {
            return db.Interests.AsEnumerable();
        }

        // GET api/Interests/5
        public Interest GetInterest(int id)
        {
            Interest interest = db.Interests.Find(id);
            if (interest == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return interest;
        }

        // PUT api/Interests/5
        public HttpResponseMessage PutInterest(int id, Interest interest)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != interest.InterestId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(interest).State = EntityState.Modified;

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

        // POST api/Interests
        public HttpResponseMessage PostInterest(Interest interest)
        {
            if (ModelState.IsValid)
            {
                db.Interests.Add(interest);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, interest);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = interest.InterestId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Interests/5
        public HttpResponseMessage DeleteInterest(int id)
        {
            Interest interest = db.Interests.Find(id);
            if (interest == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Interests.Remove(interest);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, interest);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}