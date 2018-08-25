using pmcs.Auth;
using pmcs.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;

namespace pmcs.Config.Controllers.Mvc
{
    [ConfigAuthUserAttribute]
    public abstract class SecuredBaseController : Controller
    {
        public new PmcsUserPrincipal User { get => User as PmcsUserPrincipal; }

        protected override void OnException(ExceptionContext filterContext)
        {
            base.OnException(filterContext);
            //log exception
        }
    }
}