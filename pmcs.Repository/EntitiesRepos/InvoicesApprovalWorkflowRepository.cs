using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class InvoicesApprovalWorkflowRepository : RepositoryBase<InvoicesApprovalWorkflow>
    {
        public InvoicesApprovalWorkflowRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
        public IEnumerable<InvoicesApprovalWorkflow> GetUserInvoicesWorkflow(int userId)
        {
            return DbContext.GetUserInvoicesWorkflow(userId).ToList();
        }
        public IEnumerable<InvoicesApprovalWorkflow> GetUnFinishedUserInvoicesWorkflow(int userId)
        {
            return DbContext.GetUnFinishedUserInvoicesWorkflow(userId).ToList();
        }

    }
}
