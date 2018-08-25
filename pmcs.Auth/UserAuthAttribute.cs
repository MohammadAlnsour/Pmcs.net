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
    public class UserAuthAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            if(filterContext != null)
            {
                IPrincipal user = filterContext.HttpContext.User;
                if (filterContext.HttpContext.User == null || 
                    !filterContext.HttpContext.User.Identity.IsAuthenticated)
                {
                    FormsAuthentication.SignOut();
                    filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(
                        new { controller = "Auth", action = "index" }));
                }
            }
            
        }
    }
}
