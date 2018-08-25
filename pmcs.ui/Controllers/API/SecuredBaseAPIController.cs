using pmcs.Auth.UsersAuth;
using pmcs.Core;
using pmcs.Logs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    [LoggedInAuthAttribute]
    [PmcsUserRolesAuthAttribute]
    [ErrorHandlerAttribute]
    public class SecuredBaseAPIController : ApiController
    {
        public new PmcsUserPrincipal User => ControllerContext.RequestContext.Principal as PmcsUserPrincipal;
    }
}
