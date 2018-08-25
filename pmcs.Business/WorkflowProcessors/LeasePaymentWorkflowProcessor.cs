using pmcs.DB;
using pmcs.Model;
using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;
using pmcs.Repository.LookupRepos;
using pmcs.Core;
using System.Web;

namespace pmcs.Business.WorkflowProcessors
{
    public class LeasePaymentWorkflowProcessor : WorkflowProcessorBase<Model.Contracts.LeasePaymentTransactionApprovalWorkflow>
    {
        private readonly LeasePaymentTransactionApprovalWorkflowRepository
            leasePaymentTransactionApprovalWorkflowRepository;
        private readonly UsersAccountsRepository usersAccountsRepository;

        public LeasePaymentWorkflowProcessor(LeasePaymentTransactionApprovalWorkflowRepository leasePaymentTransactionApprovalWorkflowRepository,
            UsersAccountsRepository usersAccountsRepository)
        {
            this.leasePaymentTransactionApprovalWorkflowRepository
                = leasePaymentTransactionApprovalWorkflowRepository;
            this.usersAccountsRepository = usersAccountsRepository;
        }

        public LeasePaymentWorkflowProcessor() : this(new LeasePaymentTransactionApprovalWorkflowRepository(new PmcsDbContext()),
            new UsersAccountsRepository(new PmcsDbContext()))
        {

        }
        // Cases : 
        // 1) Add lease payment => 
        // * Get first stage users.
        // * Send notifications.
        // * Add new record in LeasePaymentTransactionApprovalWorkflow table.

        // 2) Some action has been done at some stage in the workflow :
        // * Update the current workflow record with the action taken.
        // * Get Next stage Users.
        // * Send notifications.
        // * Add new record in LeasePaymentTransactionApprovalWorkflow table for the next stage (if any).
        // * if the workflow stages finished close the transaction and notify all users.

        public override Model.Contracts.LeasePaymentTransactionApprovalWorkflow BeginWorkflowProcess(Model.Contracts.LeasePaymentTransactionApprovalWorkflow wokflowApproval, Model.WorkflowStage firstStage)
        {
            wokflowApproval.IsFinished = false;
            var approval = leasePaymentTransactionApprovalWorkflowRepository.Insert(wokflowApproval.AutoMapObject<Model.Contracts.LeasePaymentTransactionApprovalWorkflow, DB.LeasePaymentTransactionApprovalWorkflow>());
            var stageRole = firstStage.RoleId;
            if (stageRole != null)
            {
                var roleUsers = CommonRoutines.GetRoleUsers((int)stageRole, usersAccountsRepository);
                //send notifications.
                Notifications.Notification.Email<Model.Contracts.LeasePaymentTransactionApprovalWorkflow>(roleUsers.ToList(), Notifications.Config.NotificationObjectType.BeginLeaseWorkflow, approval.AutoMapObject<DB.LeasePaymentTransactionApprovalWorkflow, pmcs.Model.Contracts.LeasePaymentTransactionApprovalWorkflow>());
                Notifications.Notification.System<Model.Contracts.LeasePaymentTransactionApprovalWorkflow>(roleUsers.ToList(), Notifications.Config.NotificationObjectType.BeginLeaseWorkflow, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts", approval.AutoMapObject<DB.LeasePaymentTransactionApprovalWorkflow, pmcs.Model.Contracts.LeasePaymentTransactionApprovalWorkflow>());
            }
            return approval.AutoMapObject<DB.LeasePaymentTransactionApprovalWorkflow, Model.Contracts.LeasePaymentTransactionApprovalWorkflow>();
        }
        public override DB.LeasePaymentTransactionApprovalWorkflow ChangeWorkflowStageAction(int workflowId, int action, string remarks, string userName)
        {
            var orginalWorkflow = leasePaymentTransactionApprovalWorkflowRepository.GetById(w => w.Id == workflowId);
            var editWorkflow = leasePaymentTransactionApprovalWorkflowRepository.GetById(w => w.Id == workflowId);
            editWorkflow.OwnerName = userName;
            editWorkflow.ProcessedDate = DateTime.Now;
            editWorkflow.Status = action;
            editWorkflow.Remarks = remarks;
            editWorkflow.IsFinished = true;
            leasePaymentTransactionApprovalWorkflowRepository.Update(orginalWorkflow, editWorkflow);

            var stage = new WorkflowStagesRepository(new PmcsDbContext()).GetById(s => s.StageId == orginalWorkflow.StageId);
            if (stage != null)
            {
                var roleId = stage.RoleId;
                if (roleId != null)
                {
                    var roleUsers = CommonRoutines.GetRoleUsers((int)roleId, usersAccountsRepository);
                    //Notifications.Notification.Email(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowAction, editWorkflow.AutoMapObject<DB.LeasePaymentTransactionApprovalWorkflow, Model.Contracts.LeasePaymentTransactionApprovalWorkflow>());
                    Notifications.Notification.System(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowAction, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts#workflow", editWorkflow.AutoMapObject<DB.LeasePaymentTransactionApprovalWorkflow, Model.Contracts.LeasePaymentTransactionApprovalWorkflow>());
                }
            }
            return editWorkflow;
        }
        public override void ForwardNextStage(Model.Contracts.LeasePaymentTransactionApprovalWorkflow newWorkflow, Model.WorkflowStage nextStage)
        {
            newWorkflow.IsFinished = false;
            var forwardNext = leasePaymentTransactionApprovalWorkflowRepository.Insert(newWorkflow.AutoMapObject<Model.Contracts.LeasePaymentTransactionApprovalWorkflow, DB.LeasePaymentTransactionApprovalWorkflow>());
            var stageRole = nextStage.RoleId;
            if (stageRole != null)
            {
                var roleUsers = CommonRoutines.GetRoleUsers((int)stageRole, usersAccountsRepository);
                //send notifications.
                //Notifications.Notification.Email(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowAction, newWorkflow);
                Notifications.Notification.System(roleUsers.ToList(), Notifications.Config.NotificationObjectType.LeaseContractWorkflowAction, (HttpContext.Current.User as PmcsUserPrincipal).UserId, "/Contracts/LeaseContracts", newWorkflow);
            }
        }
        public override Model.WorkflowStage GetCurrentStage(int paymentOrInvoiceId)
        {
            throw new NotImplementedException();
        }

    }
}
