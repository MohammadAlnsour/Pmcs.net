using pmcs.Model;
using pmcs.Model.Lookup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IInvoiceWorkflowService
    {
        InvoiceWorkflowStage CreateWorkflowStage(InvoiceWorkflowStage stage);
        void UpdateWorkflowStage(InvoiceWorkflowStage stage);
        IEnumerable<InvoiceWorkflowStage> GetWorkflowStages();
        InvoiceWorkflowStage GetWorkflowStage(int stageId);
        void DeleteWorkflowStage(int stageId);
        IEnumerable<WorkflowAction> GetWorkflowActionTypes();
        InvoiceWorkflowStage GetWorkflowStageByStageOrderNumber(int orderNumber);

    }
}
