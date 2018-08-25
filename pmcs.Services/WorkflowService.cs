using pmcs.Model;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;
using pmcs.Core;
using pmcs.Model.Lookup;
using pmcs.Repository.LookupRepos;

namespace pmcs.Services
{
    public class WorkflowService : IWorkflowService
    {
        private readonly WorkflowStagesRepository workflowStagesRepository;
        private readonly WorkflowActionTypesRepository workflowActionTypesRepository;

        public WorkflowService(WorkflowStagesRepository workflowStagesRepository,
            WorkflowActionTypesRepository workflowActionTypesRepository)
        {
            this.workflowStagesRepository = workflowStagesRepository;
            this.workflowActionTypesRepository = workflowActionTypesRepository;
        }

        public WorkflowStage CreateWorkflowStage(WorkflowStage stage)
        {
            var workflowStage = workflowStagesRepository.Insert(stage.AutoMapObject<WorkflowStage, DB.WorkflowStage>());
            return workflowStage.AutoMapObject<DB.WorkflowStage, WorkflowStage>();
        }

        public void DeleteWorkflowStage(int stageId)
        {
            workflowStagesRepository.Delete(workflowStagesRepository.GetById(s => s.StageId == stageId));
        }

        public IEnumerable<WorkflowAction> GetWorkflowActionTypes()
        {
            return workflowActionTypesRepository
                .GetAll()
                .Select(type => type.AutoMapObject<DB.WorkflowAction, WorkflowAction>())
                .OrderByDescending(c => c.ActionId);
        }

        public WorkflowStage GetWorkflowStage(int stageId)
        {
            return workflowStagesRepository
                  .GetById(stage => stage.StageId == stageId)
                  .AutoMapObject<DB.WorkflowStage, WorkflowStage>();
        }

        public WorkflowStage GetWorkflowStageByStageOrderNumber(int orderNumber)
        {
            return workflowStagesRepository
                  .GetById(stage => stage.StageOrderNumber == orderNumber)
                  .AutoMapObject<DB.WorkflowStage, WorkflowStage>();
        }

        public IEnumerable<WorkflowStage> GetWorkflowStages()
        {
            return workflowStagesRepository
                 .GetAll()
                 .Select(dbWorkflow =>
                         dbWorkflow.AutoMapObject<DB.WorkflowStage, WorkflowStage>())
                 .OrderByDescending(c => c.StageId);
        }

        public void UpdateWorkflowStage(WorkflowStage stage)
        {
            var original = workflowStagesRepository.GetById(s => s.StageId == stage.StageId);
            workflowStagesRepository.Update(original, stage.AutoMapObject<WorkflowStage, DB.WorkflowStage>());
        }

    }
}
