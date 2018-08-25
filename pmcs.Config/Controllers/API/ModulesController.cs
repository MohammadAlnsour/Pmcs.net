using pmcs.Model;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Core;

namespace pmcs.Config.Controllers.API
{
    public class ModulesController : SecuredBaseAPIController
    {
        private readonly IModulesService modulesService;
        private readonly IRolesService rolesService;

        public ModulesController(IModulesService modulesService, IRolesService rolesService)
        {
            this.modulesService = modulesService;
            this.rolesService = rolesService;
        }

        [HttpGet]
        [Route("api/Modules/GetModules/{pageNumber}")]
        public IHttpActionResult GetModules(int pageNumber)
        {
            try
            {
                var modules = modulesService.GetAllModules()
                    .Select(m => new SystemModule()
                    {
                        IsActive = m.IsActive,
                        ModuleId = m.ModuleId,
                        CreatedDate = m.CreatedDate,
                        ModuleName = m.ModuleName
                    });
                return Ok(modules);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Modules/Activate/{moduleId}")]
        public IHttpActionResult ActivateModule(int moduleId)
        {
            if (moduleId <= 0) return BadRequest("module id must be sent.");

            try
            {
                modulesService.EnableModule(moduleId);

                var modules = modulesService.GetAllModules()
                    .Select(m => new SystemModule()
                    {
                        IsActive = m.IsActive,
                        ModuleId = m.ModuleId,
                        CreatedDate = m.CreatedDate,
                        ModuleName = m.ModuleName
                    });
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Tables/SystemModules.cshtml", modules);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Modules/Deactivate/{moduleId}")]
        public IHttpActionResult DeactivateModule(int moduleId)
        {
            if (moduleId <= 0) return BadRequest("module id must be sent.");

            try
            {
                modulesService.DisableModule(moduleId);

                var modules = modulesService.GetAllModules()
                    .Select(m => new SystemModule()
                    {
                        IsActive = m.IsActive,
                        ModuleId = m.ModuleId,
                        CreatedDate = m.CreatedDate,
                        ModuleName = m.ModuleName
                    });
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Tables/SystemModules.cshtml", modules);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPut]
        [Route("api/Modules/UpdateModuleRoleMappingTable/")]
        public IHttpActionResult UpdateModuleRoleMappingTable(IEnumerable<RolesModulesMapping> rolesModulesMapping)
        {
            if (rolesModulesMapping == null || !rolesModulesMapping.Any()) return BadRequest("roles Modules Mapping must be sent.");
            try
            {
                foreach (var mapping in rolesModulesMapping)
                {
                    rolesService.EditRolesModulesMapping(mapping);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
