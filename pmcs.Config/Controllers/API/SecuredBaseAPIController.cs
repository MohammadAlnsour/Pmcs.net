using pmcs.Auth;
using pmcs.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace pmcs.Config.Controllers.API
{
    [ConfigAuthUserAttribute]
    public class SecuredBaseAPIController : ApiController
    {
        public new PmcsUserPrincipal User { get => User as PmcsUserPrincipal; }

    }
}