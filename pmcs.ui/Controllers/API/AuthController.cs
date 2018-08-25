using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    public class AuthController : SecuredBaseAPIController
    {
        private readonly IAuthService authService;
        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpGet]
        [Route("api/Auth/GetInspectors")]
        public IHttpActionResult GetInspectors()
        {
            try
            {
                return Ok(authService.GetInspectorUsers());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Auth/GetUsersExceptCurrent")]
        public IHttpActionResult GetUsersExceptCurrent()
        {
            try
            {
                var users = authService.GetAllUsersAccounts()
                    .Where(u => u.UserId != User.UserId && u.IsActive);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
