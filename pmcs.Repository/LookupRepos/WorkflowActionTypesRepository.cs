using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.LookupRepos
{
    public class WorkflowActionTypesRepository : RepositoryBase<WorkflowAction>
    {
        public WorkflowActionTypesRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

        //public override void Update(WorkflowAction entity)
        //{
        //    var originalObject = GetById(e => e.ActionId == entity.ActionId);
        //    DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;
        //    DbSet.Attach(entity);
        //    DbContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        //    DbContext.SaveChanges();
        //}

    }
}
