using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.EntitiesRepos
{
    public class SitesOperationRepository : RepositoryBase<SitesOperation>
    {
        public SitesOperationRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

        //public override void Update(SitesOperation entity)
        //{
        //    var originalObject = GetById(e => e.OperationId == entity.OperationId);
        //    DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;
        //    DbSet.Attach(entity);
        //    DbContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        //    DbContext.SaveChanges();
        //}

    }
}
