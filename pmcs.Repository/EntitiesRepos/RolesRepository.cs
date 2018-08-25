using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class RolesRepository : RepositoryBase<Role>
    {
        public RolesRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

        public void EnableRole(int roleId)
        {
            var role = GetById(m => m.RoleId == roleId);
            role.IsActive = true;
            DbSet.Attach(role);
            DbContext.Entry(role).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
        }
        public void DisableRole(int roleId)
        {
            var role = GetById(m => m.RoleId == roleId);
            role.IsActive = false;
            DbSet.Attach(role);
            DbContext.Entry(role).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
        }

        //public override void Update(Role entity)
        //{
        //    var originalObject = GetById(e => e.RoleId == entity.RoleId);
        //    DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;
        //    DbSet.Attach(entity);
        //    DbContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        //    DbContext.SaveChanges();
        //}

    }
}
