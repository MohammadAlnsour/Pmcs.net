using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.EntitiesRepos
{
    public class SitesContactRepository : RepositoryBase<SitesContact>
    {
        public SitesContactRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
        //public override void Update(SitesContact entity)
        //{
        //    var originalObject = GetById(e => e.ContactId == entity.ContactId);
        //    DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;
        //    DbSet.Attach(entity);
        //    DbContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        //    DbContext.SaveChanges();
        //}

    }
}
