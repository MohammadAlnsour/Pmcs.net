using pmcs.Model;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.Config.Controllers.Mvc
{
    public class SystemRolesController : SecuredBaseController
    {
        private readonly IModulesService moduleService;
        private readonly IRolesService rolesService;

        public SystemRolesController(IModulesService moduleService,
                                     IRolesService rolesService)
        {
            this.moduleService = moduleService;
            this.rolesService = rolesService;
        }

        // GET: SystemRoles
        public ActionResult Index()
        {
            ViewData["RolesPage"] = "active";
            ViewData["PageTopTitle"] = "System Roles";

            var modules = moduleService.GetAllModules();
            var roles = rolesService.GetSystemRoles();

            Dictionary<SystemRole, Dictionary<SystemModule, List<RolesModulesMapping>>> mappings
                = new Dictionary<SystemRole, Dictionary<SystemModule, List<RolesModulesMapping>>>();

            foreach (var role in roles)
            {
                Dictionary<SystemModule, List<RolesModulesMapping>> mod = new Dictionary<SystemModule, List<RolesModulesMapping>>();
                foreach (var module in modules)
                {
                    IEnumerable<RolesModulesMapping> mappingsList =
                        rolesService
                        .GetViewsModulesMappingByModuleIdAndRoleId(module.ModuleId, role.RoleId);

                    if (mappingsList != null)
                    {
                        if (mappingsList.Any())
                            mod.Add(module, mappingsList.ToList());
                    }
                }
                mappings.Add(role, mod);
            }

            return View(mappings);
        }

        [HttpGet]
        public PartialViewResult GetRolesPartial()
        {
            var modules = moduleService.GetAllModules();
            var roles = rolesService.GetSystemRoles();

            Dictionary<SystemRole, Dictionary<SystemModule, List<RolesModulesMapping>>> mappings
                = new Dictionary<SystemRole, Dictionary<SystemModule, List<RolesModulesMapping>>>();

            foreach (var role in roles)
            {
                Dictionary<SystemModule, List<RolesModulesMapping>> mod = new Dictionary<SystemModule, List<RolesModulesMapping>>();
                foreach (var module in modules)
                {
                    List<RolesModulesMapping> mappingsList = rolesService.GetViewsModulesMappingByModuleIdAndRoleId(module.ModuleId, role.RoleId).ToList();
                    if (mappingsList.Any())
                        mod.Add(module, mappingsList);
                }
                mappings.Add(role, mod);
            }

            return PartialView("~/Views/Shared/Partial/RolesSheetTable.cshtml", mappings);
        }

    }
}