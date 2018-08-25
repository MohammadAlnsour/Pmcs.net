using pmcs.Config.ViewModels;
using pmcs.Core;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace pmcs.Config.Controllers.Mvc
{
    public class AuthController : Controller
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }
        // GET: Auth
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = this.authService.AuthenticateUser(model.UserName, model.Password.Hashstring());
                if (user != null)
                {
                    FormsAuthenticationUtility.SetFormsAuthenticationTicketFromLoginUser(user);
                    return RedirectToAction("Index", "Home");
                }
            }
            ViewData["errorMessage"] = "The user name or the password are incorrect, please check your user name and password and try again.";
            return View();
        }

        public ActionResult Signout()
        {
            if(User != null)
            {
                //var pmcsUser = User as PmcsUserPrincipal;
                //log the last signout date.
            }
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Auth");
        }

    }
}