using pmcs.Core;
using pmcs.Model;
using pmcs.Model.Lookup;
using pmcs.Repository.EntitiesRepos;
using pmcs.Repository.LookupRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services
{
    public class ChangeWorkflowService : IChangeWorkflowService
    {

        private readonly ChangeWorkflowStagesRepository workflowStagesRepository;
        private readonly WorkflowActionTypesRepository workflowActionTypesRepository;

        public ChangeWorkflowService(ChangeWorkflowStagesRepository workflowStagesRepository,
            WorkflowActionTypesRepository workflowActionTypesRepository)
        {
            this.workflowStagesRepository = workflowStagesRepository;
            this.workflowActionTypesRepository = workflowActionTypesRepository;
        }

        public ChangeWorkflowStage CreateWorkflowStage(ChangeWorkflowStage stage)
        {
            var workflowStage = workflowStagesRepository.Insert(stage.AutoMapObject<ChangeWorkflowStage, DB.ChangeWorkflowStage>());
            return workflowStage.AutoMapObject<DB.ChangeWorkflowStage, ChangeWorkflowStage>();
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

        public ChangeWorkflowStage GetWorkflowStage(int stageId)
        {
            return workflowStagesRepository
                  .GetById(stage => stage.StageId == stageId)
                  .AutoMapObject<DB.ChangeWorkflowStage, ChangeWorkflowStage>();
        }

        public ChangeWorkflowStage GetWorkflowStageByStageOrderNumber(int orderNumber)
        {
            return workflowStagesRepository
                  .GetById(stage => stage.StageOrderNumber == orderNumber)
                  .AutoMapObject<DB.ChangeWorkflowStage, ChangeWorkflowStage>();
        }

        public IEnumerable<ChangeWorkflowStage> GetWorkflowStages()
        {
            return workflowStagesRepository
                 .GetAll()
                 .Select(dbWorkflow =>
                         dbWorkflow.AutoMapObject<DB.ChangeWorkflowStage, ChangeWorkflowStage>())
                 .OrderByDescending(c => c.StageId);
        }

        public void UpdateWorkflowStage(ChangeWorkflowStage stage)
        {
            var original = workflowStagesRepository.GetById(s => s.StageId == stage.StageId);
            workflowStagesRepository.Update(original, stage.AutoMapObject<ChangeWorkflowStage, DB.ChangeWorkflowStage>());
        }


    }

}
