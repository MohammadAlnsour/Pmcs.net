using pmcs.Core;
using pmcs.Models;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.Config.Controllers.API
{
    public class UsersAccountsController : SecuredBaseAPIController
    {
        private readonly IAuthService authService;
        private readonly IRolesService rolesService;

        public UsersAccountsController(IAuthService authService, IRolesService rolesService)
        {
            this.authService = authService;
            this.rolesService = rolesService;
        }

        [HttpGet]
        [Route("api/UsersAccounts/GetUserAccount/{userId}")]
        public IHttpActionResult GetUserAccount(int userId)
        {
            if (userId <= 0) return BadRequest("user Id must be passed to the API");
            try
            {
                return Ok(authService.GetUsersAccount(userId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/UsersAccounts/GetUserAccountRoles/{userId}")]
        public IHttpActionResult GetUserAccountRoles(int userId)
        {
            if (userId <= 0) return BadRequest("User Id must be passed to this API.");

            try
            {
                var allRoles = rolesService.GetSystemRoles();
                // var userRoles = authService.GetUsersAccount(userId).UserRolesIds;

                return Ok(allRoles.Select(r => new
                {
                    r.RoleId,
                    r.RoleName,
                    r.ModelPrimaryId,
                    IsMemeberOfRole = authService.IsInRole(userId, r.RoleId)
                }));

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/UsersAccounts/PostUserAccount")]
        public IHttpActionResult PostUserAccount(UserAccountModel user)
        {
            if (user == null) return BadRequest("user account cannot be found in the request body.");
            try
            {
                var enryptedPassword = user.Password.Hashstring();

                var modelUser = new UserAccountModel()
                {
                    Email = user.Email,
                    FullName = user.FullName,
                    IsActive = true,
                    IsAdministrator = user.IsAdministrator,
                    Mobile = user.Mobile,
                    Password = enryptedPassword,
                    //UserId = user.UserId,
                    UserName = user.UserName,
                    UserRolesIds = user.UserRolesIds,
                    CreatedDate = DateTime.Now,
                    RoleId = 1
                };
                var newUserAccount = authService.CreateUserAccount(modelUser.AutoMapObject<UserAccountModel, DB.UsersAccount>());
                if (newUserAccount != null && newUserAccount.UserId > 0)
                {
                    authService.AddUserRoles(newUserAccount.UserId, newUserAccount.UserRolesIds);
                }

                var usersAccounts = authService.GetAllUsersAccounts();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/UsersAccountsTable.cshtml", usersAccounts);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
