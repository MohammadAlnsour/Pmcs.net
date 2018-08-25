using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class UsersRolesRepository : RepositoryBase<UsersRole>
    {
        public UsersRolesRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

        public void DeleteUserRolesByUserId(int userId)
        {
            var userRoles = DbContext.UsersRoles.Where(u => u.UserId == userId);
            foreach (var userRole in userRoles)
            {
                DbSet.Remove(userRole);
            }
            DbContext.SaveChanges();
        }

    }
}
