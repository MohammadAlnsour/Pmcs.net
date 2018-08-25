using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;
using pmcs.DB;
using pmcs.Models;
using pmcs.Model;

namespace pmcs.Services.Interfaces
{
    public interface IAuthService
    {
        UserAccountModel AuthenticateUser(string username, string password);
        void EnableUser(int userId);
        void DisableUser(int userId);
        UsersAccount CreateUserAccount(UsersAccount user);
        void EditUserAccount(UserAccountModel user);
        Models.UserAccountModel GetUsersAccount(int userId);
        IEnumerable<UserAccountModel> GetAllUsersAccounts();

        Role CreateRole(Role role);
        void EditRole(Role role);
        void AssignRoleModulesMapping(int roleId, IEnumerable<DB.SystemModule> modules);
        void DeleteRoleModulesMappings(int roleId);
        bool IsInRole(int userId, int roleId);
        IEnumerable<int> GetUserRoles(int userId);

        IEnumerable<UserMappingsSheet> GetUserMappingsSheet(int userId);
        IEnumerable<UserAccountModel> GetInspectorUsers();

        void AddUserRoles(int userId, string rolesIds);
        void DeleteUserRoles(int userId);

    }
}
