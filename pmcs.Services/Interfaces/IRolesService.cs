using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model;

namespace pmcs.Services.Interfaces
{
    public interface IRolesService
    {
        int CreateRole(SystemRole role);
        void EditRole(SystemRole role);
        void EnableRole(int roleId);
        void DisableRole(int roleId);
        IEnumerable<SystemRole> GetSystemRoles();
        SystemRole GetSystemRole(int roleId);
        IEnumerable<RolesModulesMapping> GetRoleModulesMappingsList();
        IEnumerable<RolesModulesMapping> GetViewsModulesMappingByModuleIdAndRoleId(int moduleId, int roleId);
        IEnumerable<SystemView> GetSystemViews();
        void InsertInitailRolePermissionsSheet(int roleId);
        void EditRolesModulesMapping(Model.RolesModulesMapping mapping);

    }
}
