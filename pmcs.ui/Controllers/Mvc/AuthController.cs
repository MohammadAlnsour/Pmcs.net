using pmcs.Core;
using pmcs.Model;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace pmcs.ui.Controllers.Mvc
{
    public class AuthController : Controller
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }
        // GET: Auth
        public ActionResult Authenticate()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Authenticate(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = this.authService.AuthenticateUser(model.UserName, model.Password.Hashstring());
                if (user != null)
                {
                    FormsAuthenticationUtility.SetFormsAuthenticationTicketFromLoginUser(user);
                    return RedirectToAction("Dashboard", "Dashboards");
                }
            }

            ViewData["errorMessage"] = "The user name or the password are incorrect, please check your user name and password and try again.";
            return View();
        }

        public ActionResult Signout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Authenticate");
        }

    }
}