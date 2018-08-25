using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Model;

namespace pmcs.Config.Controllers.API
{
    public class RolesConfigurationController : SecuredBaseAPIController
    {
        private readonly IRolesService rolesService;
        private readonly IModulesService moduleService;

        public RolesConfigurationController(IRolesService rolesService, IModulesService moduleService)
        {
            this.rolesService = rolesService;
            this.moduleService = moduleService;
        }

        [HttpGet]
        [Route("api/RolesConfiguration/GetMappingList/{roleId}")]
        public IHttpActionResult GetRoleModulesMappingsList(int roleId)
        {
            try
            {
                var modules = moduleService.GetAllModules();
                List<RolesModulesMappingAPI> mappings = new List<RolesModulesMappingAPI>();

                foreach (var module in modules)
                {
                    var res = rolesService.GetViewsModulesMappingByModuleIdAndRoleId(module.ModuleId, roleId).ToList();
                    if (res.Any())
                    {
                        mappings.Add(new RolesModulesMappingAPI()
                        {
                            RoleId = roleId,
                            ModuleId = module.ModuleId,
                            ModuleName = module.ModuleName,
                            Mappings = res
                        }
                    );
                    }
                }

                return Ok(mappings);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
