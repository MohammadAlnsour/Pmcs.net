using pmcs.Model;
using pmcs.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.Config.Controllers.API
{
    public class RolesController : SecuredBaseAPIController
    {
        private RolesService _rolesService;
        private ModulesService moduleService;
        public RolesController(RolesService rolesService, ModulesService modulesService)
        {
            _rolesService = rolesService;
            moduleService = modulesService;
        }

        [Route("api/Roles/GetRoles/{pageNumber}")]
        public IHttpActionResult GetRoles(int pageNumber)
        {
            if (pageNumber <= 0) return BadRequest("Page number must passed to this api");
            try
            {
                return Ok(_rolesService.GetSystemRoles());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Roles/EditRole")]
        public IHttpActionResult EditRole(SystemRole role)
        {
            if (role == null) return BadRequest("The role object must be passed in the request body");
            try
            {
                _rolesService.EditRole(role);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/Roles/PostRole")]
        public IHttpActionResult PostRole(SystemRole role)
        {
            if (role == null) return BadRequest("The role object must be passed in the request body");
            try
            {
                role.CreatedDate = DateTime.Now;
                var roleId = _rolesService.CreateRole(role);
                _rolesService.InsertInitailRolePermissionsSheet(roleId);

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }
}
