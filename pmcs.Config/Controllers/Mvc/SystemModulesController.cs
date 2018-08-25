using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.Config.Controllers.Mvc
{
    public class SystemModulesController : SecuredBaseController
    {
        private readonly IModulesService _modulesService;

        public SystemModulesController(IModulesService modulesService)
        {
            _modulesService = modulesService;
        }
        // GET: SystemModules
        public ActionResult Index()
        {
            ViewData["modulesPage"] = "active";
            ViewData["PageTopTitle"] = "System Modules";
            var modules = _modulesService.GetAllModules();
            return View(modules);
        }

    }
}