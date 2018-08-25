using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class ModulesRepository : RepositoryBase<SystemModule>
    {
        public ModulesRepository(PmcsDbContext context) : base(context)
        {
        }

        public void Enable(int id)
        {
            var module = GetById(m => m.ModuleId == id);
            module.IsActive = true;
            DbSet.Attach(module);
            DbContext.Entry(module).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
        }

        public void Disable(int id)
        {
            var module = GetById(m => m.ModuleId == id);
            module.IsActive = false;
            DbSet.Attach(module);
            DbContext.Entry(module).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
        }

        //public override void Update(SystemModule entity)
        //{
        //    var originalObject = GetById(e => e.ModuleId == entity.ModuleId);

        //    DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;
        //    DbSet.Attach(entity);
        //    DbContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        //    DbContext.SaveChanges();
        //}
    }
}
