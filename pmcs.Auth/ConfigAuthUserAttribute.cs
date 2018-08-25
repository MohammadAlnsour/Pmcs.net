using pmcs.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Security;

namespace pmcs.Auth
{
    public class ConfigAuthUserAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            if (filterContext != null)
            {
                PmcsUserPrincipal user = filterContext.HttpContext.User as PmcsUserPrincipal;
                if (filterContext.HttpContext.User == null ||
                    !filterContext.HttpContext.User.Identity.IsAuthenticated)
                {
                    FormsAuthentication.SignOut();
                    filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(
                        new { controller = "Auth", action = "index" }));
                }

                if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
                {
                    FormsAuthentication.SignOut();
                    filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(
                        new { controller = "Auth", action = "index" }));
                }
                //if(filterContext.HttpContext.User != null 
                //    && !((PmcsUserPrincipal)filterContext.HttpContext.User).IsAdministrator)
                //{
                    
                //}

            }
        }
    }
}
