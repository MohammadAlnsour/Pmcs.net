using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class ChangeApprovalWorkflowRepository : RepositoryBase<ChangeApprovalWorkflow>
    {
        public ChangeApprovalWorkflowRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
        //public IEnumerable<InvoicesApprovalWorkflow> GetUserChangesWorkflow(int userId)
        //{
        //    return DbContext.GetUserInvoicesWorkflow(userId).ToList();
        //}
        //public IEnumerable<InvoicesApprovalWorkflow> GetUnFinishedUserChangesWorkflow(int userId)
        //{
        //    return DbContext.GetUnFinishedUserInvoicesWorkflow(userId).ToList();
        //}

    }
}
