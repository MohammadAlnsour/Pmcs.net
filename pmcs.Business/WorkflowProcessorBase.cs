using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;
using pmcs.Model.Contracts;
using pmcs.Model;
using pmcs.Models;

namespace pmcs.Business
{
    public abstract class WorkflowProcessorBase<TWokflowApproval> where TWokflowApproval : ModelBase
    {
        public abstract Model.WorkflowStage GetCurrentStage(int paymentOrInvoiceId);
        public abstract void ForwardNextStage(TWokflowApproval newWorkflow, Model.WorkflowStage nextStage);
        public abstract DB.LeasePaymentTransactionApprovalWorkflow ChangeWorkflowStageAction(int workflowId, int action, string remarks, string userName);
        public abstract TWokflowApproval BeginWorkflowProcess(TWokflowApproval wokflowApproval, Model.WorkflowStage firstStage);

    }
}
