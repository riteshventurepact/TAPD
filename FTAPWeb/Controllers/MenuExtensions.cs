using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace FTAPWeb.Controllers
{
    public static class MenuExtensions
    {
        public static MvcHtmlString MenuItem(
        this HtmlHelper htmlHelper,
        string text,
        string action,
        string controller
    )
        {
            var span = new TagBuilder("span"); 
            var li = new TagBuilder("li");
            var routeData = htmlHelper.ViewContext.RouteData;
            var currentAction = routeData.GetRequiredString("action");
            var currentController = routeData.GetRequiredString("controller");
            if (string.Equals(currentAction, action, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(currentController, controller, StringComparison.OrdinalIgnoreCase))
            {
                //li.AddCssClass("active");
                //li.Attributes.Add("id", "selected");
                span.InnerHtml = currentAction;
                //span.SetInnerText(li.InnerHtml);
               
            }
            li.InnerHtml = htmlHelper.ActionLink(text, action, controller).ToHtmlString();
            return MvcHtmlString.Create(li.ToString());
        }
    }
}