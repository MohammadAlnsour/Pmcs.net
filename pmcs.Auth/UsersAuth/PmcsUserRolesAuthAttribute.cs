using pmcs.Core;
using pmcs.Services;
using pmcs.Services.Interfaces;
using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using pmcs.DB;

namespace pmcs.Auth.UsersAuth
{
    public class PmcsUserRolesAuthAttribute : AuthorizeAttribute
    {
        private readonly IAuthService authService;
        private readonly IRolesService rolesService;
        private readonly IModulesService modulesService;
        //private readonly PmcsDbContext _context = new PmcsDbContext();

        public PmcsUserRolesAuthAttribute(IAuthService authService,
            IRolesService rolesService,
            IModulesService modulesService)
        {
            this.authService = authService;
            this.rolesService = rolesService;
            this.modulesService = modulesService;
        }

        public PmcsUserRolesAuthAttribute() : this(
            new AuthService(new UsersAccountsRepository(new PmcsDbContext()), new RolesModulesMappingsRepository(new PmcsDbContext()), new RolesRepository(new PmcsDbContext()), new UsersAccountsRepository(new PmcsDbContext()), new UsersRolesRepository(new PmcsDbContext())),
            new RolesService(new RolesRepository(new PmcsDbContext()), new RolesModulesMappingsRepository(new PmcsDbContext()), new ModulesRepository(new PmcsDbContext()), new SystemViewsRepository(new PmcsDbContext())),
            new ModulesService(new ModulesRepository(new PmcsDbContext())))
        {

        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);

            if (filterContext == null)
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { controller = "StatusCodes", action = "NotAuthorized401" }));

            if (filterContext.HttpContext.User == null)
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { controller = "StatusCodes", action = "NotAuthorized401" }));

            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { controller = "StatusCodes", action = "NotAuthorized401" }));

            var actionName = filterContext.ActionDescriptor.ActionName;
            var controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;

            PmcsUserPrincipal principal = filterContext.HttpContext.User as PmcsUserPrincipal;
            var sheet = authService.GetUserMappingsSheet(principal.UserId);

            bool canAccess;
            if (principal.IsAdministrator)
                canAccess = true;
            else
                canAccess = UserRoleViewAccessAuthenticator.CanAccessResource(modulesService, rolesService, authService, sheet, controllerName, actionName);

            if (actionName.ToLower() == "dashboard" && controllerName.ToLower() == "dashboards")
                canAccess = true;

            if (!canAccess)
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { controller = "StatusCodes", action = "NotAuthorized401" }));
        }

    }
}
