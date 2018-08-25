using pmcs.Model;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Auth.UsersAuth
{
    public static class UserRoleViewAccessAuthenticator
    {
        public static bool CanAccessResource(IModulesService modulesService,
            IRolesService rolesService,
            IAuthService authService,
            IEnumerable<UserMappingsSheet> userSheetsMapping,
            string controllerName,
            string actionName)
        {
            var mappingList = userSheetsMapping.ToList();
            if (!mappingList.Any()) return false;
            var sheets = mappingList.Select((s) =>
            {
                var viewName = string.Empty;
                var view = rolesService.GetSystemViews().SingleOrDefault(v => v.ViewId == s.ViewId);
                if (view != null)
                    viewName = view.ViewName;

                var moduleName = string.Empty;
                var module = modulesService.GetModuleById(s.ModuleId);
                if (module != null)
                    moduleName = module.ModuleName;

                return
                new RolesModulesMapping()
                {
                    ViewName = viewName,
                    ModuleName = moduleName,
                    ViewId = s.ViewId,
                    ModuleId = s.ModuleId,
                    CanRead = s.Read,
                    CanWrite = s.Write,
                    CanDelete = s.Delete,
                    MappingId = s.MappingId,
                    CanNavigate = s.Read
                };
            });

            var canAccessModule = sheets.Any(s => s.ModuleName.ToLower().Contains(controllerName.ToLower()) && s.CanRead == true);
            var canAccessView = sheets.Any(s => actionName.ToLower().Contains(s.ViewName.ToLower()) && s.CanRead == true);

            return canAccessModule && canAccessView;
        }
    }
}
