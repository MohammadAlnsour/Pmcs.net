using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;
using pmcs.Model;
using pmcs.Models;
using pmcs.Repository.EntitiesRepos;
using pmcs.Core;

namespace pmcs.Business
{
    public static class CommonRoutines
    {
        public static IEnumerable<UserAccountModel> GetRoleUsers(int roleId, UsersAccountsRepository usersAccountsRepository)
        {
            return usersAccountsRepository
                 .SearchData(u => u.UserRolesIds.Contains(roleId.ToString()))
                 .Distinct(new UserAccountComparer())
                 .Select(u => u.AutoMapObject<DB.UsersAccount, UserAccountModel>());
        }
    }

    public class UserAccountComparer : IEqualityComparer<DB.UsersAccount>
    {
        public bool Equals(UsersAccount x, UsersAccount y)
        {
            return x.UserId == y.UserId;
        }

        public int GetHashCode(UsersAccount obj)
        {
            return obj.UserId.GetHashCode();
        }
    }

}
