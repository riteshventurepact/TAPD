using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;

namespace FTAPWeb.Controllers
{
    public static class SessionHelper
    {
        public static int? USERID
        {
            get
            {
                HttpContext context = HttpContext.Current;
                if (context != null && context.Application["USERID"] != null)
                {
                    int sessionId;
                    if (int.TryParse(context.Application["USERID"].ToString(), out sessionId))
                    {
                        return sessionId;
                    }
                }
                return null;
            }
            set
            {
                HttpContext context = HttpContext.Current;
                if (context != null)
                {
                    context.Application["USERID"] = value;
                }
            }
        }
    }
}