using pmcs.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Security;

namespace pmcs.Auth.UsersAuth
{
    public class LoggedInAuthAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);

            if (filterContext == null)
            {
                FormsAuthentication.SignOut();
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(
                    new { controller = "Auth", action = "Authenticate" }));
                return;
            }
            PmcsUserPrincipal user = filterContext.HttpContext.User as PmcsUserPrincipal;

            if (user == null)
            {
                FormsAuthentication.SignOut();
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(
                    new { controller = "Auth", action = "Authenticate" }));
                return;
            }

            if (!user.Identity.IsAuthenticated)
            {
                FormsAuthentication.SignOut();
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(
                    new { controller = "Auth", action = "Authenticate" }));
                return;
            }

        }

    }
}
