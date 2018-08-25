using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class LeasePaymentTransactionApprovalWorkflowRepository : RepositoryBase<LeasePaymentTransactionApprovalWorkflow>
    {
        public LeasePaymentTransactionApprovalWorkflowRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<LeasePaymentTransactionApprovalWorkflow> GetLeasePaymentWorkflow(int userId)
        {
            return DbContext.GetUserLeasePaymentWorkflow(userId).ToList();
        }

    }
}
