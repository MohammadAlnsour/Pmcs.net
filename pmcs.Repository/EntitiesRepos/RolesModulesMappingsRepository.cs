using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.EntitiesRepos
{
    public class RolesModulesMappingsRepository : RepositoryBase<RolesModulesMapping>
    {
        public RolesModulesMappingsRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<RolesModulesMapping> GetMappingListByRoleAndModuleId(int moduleId, int roleId)
        {
            return DbContext.RolesModulesMappings.Where(m => m.RoleId == roleId && m.ModuleId == moduleId).AsEnumerable();
        }

        //public override void Update(RolesModulesMapping entity)
        //{
        //    var originalObject = GetById(e => e.MappingId == entity.MappingId);
        //    DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;
        //    DbSet.Attach(entity);
        //    DbContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        //    DbContext.SaveChanges();
        //}

    }
}
