using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.Config.Controllers.Mvc
{
    public class HomeController : SecuredBaseController
    {
        IModulesService _service;
        public HomeController(IModulesService service)
        {
            _service = service;
        }
        // GET: Home
        public ActionResult Index()
        {
            ViewData["dashboardPage"] = "active";
            ViewData["PageTopTitle"] = "Dashboard";
            var modules = _service.GetAllModules();
            return View(modules);
        }

    }
}