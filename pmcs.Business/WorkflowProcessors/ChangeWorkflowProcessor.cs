using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using pmcs.Core;
using pmcs.DB;
using pmcs.Model;
using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;

namespace pmcs.Business.WorkflowProcessors
{
    public class ChangeWorkflowProcessor
    {
        private readonly UsersAccountsRepository usersAccountsRepository;
        private readonly ChangeApprovalWorkflowRepository changeWorkflowRepository;
        public ChangeWorkflowProcessor(ChangeApprovalWorkflowRepository changeApprovalWorkflowRepository, UsersAccountsRepository usersAccountsRepository)
        {
            this.usersAccountsRepository = usersAccountsRepository;
            this.changeWorkflowRepository = changeApprovalWorkflowRepository;
        }
        public ChangeWorkflowProcessor() : this(new ChangeApprovalWorkflowRepository(new PmcsDbContext()),
          new UsersAccountsRepository(new PmcsDbContext()))
        {

        }

        public Model.Contracts.ChangesApprovalWorkflow BeginWorkflowProcess(Model.Contracts.ChangesApprovalWorkflow workflowApproval, Model.ChangeWorkflowStage firstStage)
        {
            workflowApproval.IsFinished = false;
            var approval = changeWorkflowRepository.Insert(workflowApproval.AutoMapObject<Model.Contracts.ChangesApprovalWorkflow, DB.ChangeApprovalWorkflow>());
            var stageRole = firstStage.RoleId;
            if (stageRole != null)
            {
                var roleUsers = CommonRoutines.GetRoleUsers((int)stageRole, usersAccountsRepository);
                // send notifications.
                Notifications.Notification.Email<Model.Contracts.ChangesApprovalWorkflow>(roleUsers.ToList(), Notifications.Config.NotificationObjectType.BeginInvoiceWorkflow, approval.AutoMapObject<DB.ChangeApprovalWorkflow, pmcs.Model.Contracts.ChangesApprovalWorkflow>());
                Notifications.Notification.System<Model.Contracts.ChangesApprovalWorkflow>(roleUsers.ToList(), Notifications.Config.NotificationObjectType.BeginInvoiceWorkflow, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts", approval.AutoMapObject<DB.ChangeApprovalWorkflow, pmcs.Model.Contracts.ChangesApprovalWorkflow>());
            }
            return approval.AutoMapObject<DB.ChangeApprovalWorkflow, Model.Contracts.ChangesApprovalWorkflow>();

        }

        public DB.ChangeApprovalWorkflow ChangeWorkflowStageAction(int workflowId, int action, string remarks, string userName)
        {
            var orginalWorkflow = changeWorkflowRepository.GetById(w => w.Id == workflowId);
            var editWorkflow = changeWorkflowRepository.GetById(w => w.Id == workflowId);
            editWorkflow.OwnerName = userName;
            editWorkflow.ProcessedDate = DateTime.Now;
            editWorkflow.Status = action;
            editWorkflow.Remarks = remarks;
            editWorkflow.IsFinished = true;
            changeWorkflowRepository.Update(orginalWorkflow, editWorkflow);

            var stage = new ChangeWorkflowStagesRepository(new PmcsDbContext()).GetById(s => s.StageId == orginalWorkflow.StageId);
            if (stage != null)
            {
                var roleId = stage.RoleId;
                if (roleId != null)
                {
                    var roleUsers = CommonRoutines.GetRoleUsers((int)roleId, usersAccountsRepository);
                    //Notifications.Notification.Email(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowApproval, editWorkflow);
                    //Notifications.Notification.System(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowApproval, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts", editWorkflow);
                }
            }
            return editWorkflow;
        }

        public void ForwardNextStage(Model.Contracts.ChangesApprovalWorkflow newWorkflow, Model.ChangeWorkflowStage nextStage)
        {
            newWorkflow.IsFinished = false;
            var forwardNext = changeWorkflowRepository.Insert(newWorkflow.AutoMapObject<Model.Contracts.ChangesApprovalWorkflow, DB.ChangeApprovalWorkflow>());
            var stageRole = nextStage.RoleId;
            if (stageRole != null)
            {
                var roleUsers = CommonRoutines.GetRoleUsers((int)stageRole, usersAccountsRepository);
                //send notifications.
                //Notifications.Notification.Email(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowApproval, newWorkflow);
                //Notifications.Notification.System(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowApproval, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts", newWorkflow);
            }
        }

        public Model.WorkflowStage GetCurrentStage(int paymentOrInvoiceId)
        {
            throw new NotImplementedException();
        }

    }
}
