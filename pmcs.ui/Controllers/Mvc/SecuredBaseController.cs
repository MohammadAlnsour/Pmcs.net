using pmcs.Auth.UsersAuth;
using pmcs.Core;
using pmcs.Logs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;

namespace pmcs.ui.Controllers.Mvc
{
    [LoggedInAuthAttribute]
    [PmcsUserRolesAuthAttribute]
    [ErrorHandlerAttribute]
    public class SecuredBaseController : Controller
    {
        //public SecuredBaseController()
        //{
        //}
        public new PmcsUserPrincipal User
        {
            get
            {
                return ControllerContext.HttpContext.User as PmcsUserPrincipal;
            }
        }

    }
}