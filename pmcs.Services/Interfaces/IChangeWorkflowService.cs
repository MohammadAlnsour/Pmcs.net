using pmcs.Model;
using pmcs.Model.Lookup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IChangeWorkflowService
    {
        ChangeWorkflowStage CreateWorkflowStage(ChangeWorkflowStage stage);
        void UpdateWorkflowStage(ChangeWorkflowStage stage);
        IEnumerable<ChangeWorkflowStage> GetWorkflowStages();
        ChangeWorkflowStage GetWorkflowStage(int stageId);
        void DeleteWorkflowStage(int stageId);
        IEnumerable<WorkflowAction> GetWorkflowActionTypes();
        ChangeWorkflowStage GetWorkflowStageByStageOrderNumber(int orderNumber);
    }
}
