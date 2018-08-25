using pmcs.Models;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using pmcs.Core;

namespace pmcs.Config.Controllers.Mvc
{
    public class UsersAccountsController : SecuredBaseController
    {
        private readonly IAuthService authService;
        private readonly IRolesService rolesService;

        public UsersAccountsController(IAuthService authService, IRolesService rolesService)
        {
            this.authService = authService;
            this.rolesService = rolesService;
        }

        // GET: UsersAccounts
        public ActionResult Index()
        {
            ViewData["accountsPage"] = "active";
            ViewData["PageTopTitle"] = "System Roles";

            var usersAccounts = authService.GetAllUsersAccounts();
            return View(usersAccounts);
        }

        [HttpPut]
        public ActionResult EditUserAccount(UserAccountModel user)
        {
            if (user == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "user data must be passed to the API");

            try
            {
                var enryptedPassword = authService.GetUsersAccount(user.UserId).Password;
                if (user.Password != "**********")
                {
                    enryptedPassword = user.Password.Hashstring();
                }

                var modelUser = new UserAccountModel()
                {
                    Email = user.Email,
                    FullName = user.FullName,
                    IsActive = true,
                    IsAdministrator = user.IsAdministrator,
                    Mobile = user.Mobile,
                    Password = enryptedPassword,
                    UserId = user.UserId,
                    UserName = user.UserName,
                    UserRolesIds = user.UserRolesIds
                };
                authService.EditUserAccount(modelUser);
                authService.DeleteUserRoles(user.UserId);
                authService.AddUserRoles(user.UserId, user.UserRolesIds);

                var usersAccounts = authService.GetAllUsersAccounts();
                return PartialView("~/Views/Shared/Partial/UsersAccountsTable.cshtml", usersAccounts);
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public ActionResult EnableUserAccount(int userId)
        {
            if (userId <= 0) return new HttpStatusCodeResult(HttpStatusCode.BadRequest,
                "user id must be passed to the API");

            try
            {
                authService.EnableUser(userId);
                var usersAccounts = authService.GetAllUsersAccounts();
                return PartialView("~/Views/Shared/Partial/UsersAccountsTable.cshtml", usersAccounts);
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public ActionResult DisableUserAccount(int userId)
        {
            if (userId <= 0) return new HttpStatusCodeResult(HttpStatusCode.BadRequest,
                "user id must be passed to the API");

            try
            {
                authService.DisableUser(userId);
                var usersAccounts = authService.GetAllUsersAccounts();
                return PartialView("~/Views/Shared/Partial/UsersAccountsTable.cshtml", usersAccounts);
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}