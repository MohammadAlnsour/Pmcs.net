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
    public class InvoiceWorkflowProcessor
    {
        private readonly UsersAccountsRepository usersAccountsRepository;
        private readonly InvoicesApprovalWorkflowRepository invoicesWorkflowRepository;
        public InvoiceWorkflowProcessor(InvoicesApprovalWorkflowRepository invoicesWorkflowRepository, UsersAccountsRepository usersAccountsRepository)
        {
            this.usersAccountsRepository = usersAccountsRepository;
            this.invoicesWorkflowRepository = invoicesWorkflowRepository;
        }
        public InvoiceWorkflowProcessor() : this(new InvoicesApprovalWorkflowRepository(new PmcsDbContext()),
          new UsersAccountsRepository(new PmcsDbContext()))
        {

        }

        public Model.Contracts.InvoicesApprovalWorkflow BeginWorkflowProcess(Model.Contracts.InvoicesApprovalWorkflow workflowApproval, Model.InvoiceWorkflowStage firstStage)
        {
            workflowApproval.IsFinished = false;
            var approval = invoicesWorkflowRepository.Insert(workflowApproval.AutoMapObject<Model.Contracts.InvoicesApprovalWorkflow, DB.InvoicesApprovalWorkflow>());
            var stageRole = firstStage.RoleId;
            if (stageRole != null)
            {
                var roleUsers = CommonRoutines.GetRoleUsers((int)stageRole, usersAccountsRepository);
                // send notifications.
                Notifications.Notification.Email<Model.Contracts.InvoicesApprovalWorkflow>(roleUsers.ToList(), Notifications.Config.NotificationObjectType.BeginInvoiceWorkflow, approval.AutoMapObject<DB.InvoicesApprovalWorkflow, pmcs.Model.Contracts.InvoicesApprovalWorkflow>());
                Notifications.Notification.System<Model.Contracts.InvoicesApprovalWorkflow>(roleUsers.ToList(), Notifications.Config.NotificationObjectType.BeginInvoiceWorkflow, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts", approval.AutoMapObject<DB.InvoicesApprovalWorkflow, pmcs.Model.Contracts.InvoicesApprovalWorkflow>());
            }
            return approval.AutoMapObject<DB.InvoicesApprovalWorkflow, Model.Contracts.InvoicesApprovalWorkflow>();

        }

        public DB.InvoicesApprovalWorkflow ChangeWorkflowStageAction(int workflowId, int action, string remarks, string userName)
        {
            var orginalWorkflow = invoicesWorkflowRepository.GetById(w => w.Id == workflowId);
            var editWorkflow = invoicesWorkflowRepository.GetById(w => w.Id == workflowId);
            editWorkflow.OwnerName = userName;
            editWorkflow.ProcessedDate = DateTime.Now;
            editWorkflow.Status = action;
            editWorkflow.Remarks = remarks;
            editWorkflow.IsFinished = true;
            invoicesWorkflowRepository.Update(orginalWorkflow, editWorkflow);

            var stage = new InvoicesWorkflowStagesRepository(new PmcsDbContext()).GetById(s => s.StageId == orginalWorkflow.StageId);
            if (stage != null)
            {
                var roleId = stage.RoleId;
                if (roleId != null)
                {
                    var roleUsers = CommonRoutines.GetRoleUsers((int)roleId, usersAccountsRepository);
                    //Notifications.Notification.Email(roleUsers.ToList(), Notifications.Config.NotificationObjectType.InvoiceWorkflowAction, editWorkflow.AutoMapObject<DB.InvoicesApprovalWorkflow, pmcs.Model.Contracts.InvoicesApprovalWorkflow>());
                    Notifications.Notification.System(roleUsers.ToList(), Notifications.Config.NotificationObjectType.InvoiceWorkflowAction, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts", editWorkflow.AutoMapObject<DB.InvoicesApprovalWorkflow, pmcs.Model.Contracts.InvoicesApprovalWorkflow>());
                }
            }
            return editWorkflow;
        }

        public void ForwardNextStage(Model.Contracts.InvoicesApprovalWorkflow newWorkflow, Model.InvoiceWorkflowStage nextStage)
        {
            newWorkflow.IsFinished = false;
            var forwardNext = invoicesWorkflowRepository.Insert(newWorkflow.AutoMapObject<Model.Contracts.InvoicesApprovalWorkflow, DB.InvoicesApprovalWorkflow>());
            var stageRole = nextStage.RoleId;
            if (stageRole != null)
            {
                var roleUsers = CommonRoutines.GetRoleUsers((int)stageRole, usersAccountsRepository);
                //send notifications.
                //Notifications.Notification.Email(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowApproval, newWorkflow);
                Notifications.Notification.System(roleUsers.ToList(), Notifications.Config.NotificationObjectType.InvoiceWorkflowAction, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts", newWorkflow);
            }
        }

        public Model.WorkflowStage GetCurrentStage(int paymentOrInvoiceId)
        {
            throw new NotImplementedException();
        }

    }
}
