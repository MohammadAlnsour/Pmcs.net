using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model;
using pmcs.Model.Lookup;
using pmcs.Repository.EntitiesRepos;

namespace pmcs.Services.Interfaces
{
    public interface IWorkflowService
    {
        WorkflowStage CreateWorkflowStage(WorkflowStage stage);
        void UpdateWorkflowStage(WorkflowStage stage);
        IEnumerable<WorkflowStage> GetWorkflowStages();
        WorkflowStage GetWorkflowStage(int stageId);
        void DeleteWorkflowStage(int stageId);
        IEnumerable<WorkflowAction> GetWorkflowActionTypes();
        WorkflowStage GetWorkflowStageByStageOrderNumber(int orderNumber);

    }
}
