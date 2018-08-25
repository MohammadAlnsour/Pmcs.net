using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Services.ContractsServices
{
    public class LeaseContractsService : ILeaseContractsService
    {
        private readonly LeaseContractsRepository leaseContractsRepository;
        private readonly LeaseContractPaymentsRepository leaseContractPaymentsRepository;
        private readonly WorkflowStagesRepository workflowStagesRepository;
        private readonly LeasePaymentTransactionApprovalWorkflowRepository leasePaymentTransactionApprovalWorkflowRepository;
        private readonly UsersAccountsRepository usersAccountsRepository;

        public LeaseContractsService(LeaseContractsRepository leaseContractsRepository,
            LeaseContractPaymentsRepository leaseContractPaymentsRepository,
            WorkflowStagesRepository workflowStagesRepository,
            LeasePaymentTransactionApprovalWorkflowRepository leasePaymentTransactionApprovalWorkflowRepository,
            UsersAccountsRepository usersAccountsRepository)
        {
            this.leaseContractsRepository = leaseContractsRepository;
            this.leaseContractPaymentsRepository = leaseContractPaymentsRepository;
            this.workflowStagesRepository = workflowStagesRepository;
            this.leasePaymentTransactionApprovalWorkflowRepository = leasePaymentTransactionApprovalWorkflowRepository;
            this.usersAccountsRepository = usersAccountsRepository;
        }
        public int CreateLeaseContract(LeaseContract leaseContract)
        {
            var res = leaseContractsRepository.Insert(leaseContract.AutoMapObject<LeaseContract, DB.LeaseContract>());
            return res.ContractId;
        }

        public int CreateLeasePayment(LeasePaymentTransaction leasePayment)
        {
            var res = leaseContractPaymentsRepository.Insert(leasePayment.AutoMapObject<LeasePaymentTransaction, DB.LeasePaymentTransaction>());

            var firstWorkflowStage = workflowStagesRepository.GetAll().OrderBy(w => w.StageOrderNumber).FirstOrDefault();
            if (firstWorkflowStage != null)
            {
                var workflowProcessor = new pmcs.Business.WorkflowProcessors.LeasePaymentWorkflowProcessor(leasePaymentTransactionApprovalWorkflowRepository, usersAccountsRepository);
                workflowProcessor.BeginWorkflowProcess(
                                            new Model.Contracts.LeasePaymentTransactionApprovalWorkflow()
                                            {
                                                ReceivedDate = DateTime.Now,
                                                ReferenceNumber = "",
                                                OwnerName = "",
                                                LeaseId = res.LeaseId,
                                                SequentialId = "1",
                                                Status = (int) WorkflowLevelStatus.New,
                                                IsActive = true,
                                                CreatedDate = DateTime.Now,
                                                CreatedBy = 0,
                                                Duration = "0",
                                                StageId = firstWorkflowStage.StageId,
                                                TransactionId = res.TransactionId
                                            },
                                            firstWorkflowStage.AutoMapObject<DB.WorkflowStage, Model.WorkflowStage>()
                                        );
            }

            return res.TransactionId;
        }

        public void CreateLeasePaymentTransactionApprovalWorkflow(LeasePaymentTransactionApprovalWorkflow leaseWorkflow)
        {
            throw new NotImplementedException();
        }
        public void EditLeasePaymentTransactionApprovalWorkflow(LeasePaymentTransactionApprovalWorkflow leaseWorkflow)
        {
            var original = leasePaymentTransactionApprovalWorkflowRepository.GetById(w => w.Id == leaseWorkflow.Id);
            leasePaymentTransactionApprovalWorkflowRepository
                .Update(original,
                leaseWorkflow.AutoMapObject<LeasePaymentTransactionApprovalWorkflow, DB.LeasePaymentTransactionApprovalWorkflow>());
        }

        public void DeleteLeaseContract(int leaseId)
        {
            throw new NotImplementedException();
        }

        public void DeleteLeasePayment(int leastPaymentId)
        {
            throw new NotImplementedException();
        }

        public void EditLeaseContract(LeaseContract leaseContract)
        {
            var original = leaseContractsRepository.GetById(c => c.ContractId == leaseContract.ContractId);
            leaseContractsRepository.Update(original, leaseContract.AutoMapObject<LeaseContract, DB.LeaseContract>());
        }

        public void EditLeasePayment(LeasePaymentTransaction leasePayment)
        {
            var original = leaseContractPaymentsRepository.GetById(p => p.TransactionId == leasePayment.TransactionId);
            leaseContractPaymentsRepository.Update(original, leasePayment.AutoMapObject<LeasePaymentTransaction, DB.LeasePaymentTransaction>());
        }

        public LeaseContract GetLeaseContract(int leaseId)
        {
            var res = leaseContractsRepository.GetById(l => l.ContractId == leaseId);
            return res.AutoMapObject<DB.LeaseContract, LeaseContract>();
        }

        public IEnumerable<LeaseContract> GetLeaseContracts()
        {
            return leaseContractsRepository
                .GetAll()
                .Select(l => l.AutoMapObject<DB.LeaseContract, LeaseContract>())
                .OrderByDescending(c => c.ContractId);
        }

        public LeasePaymentTransaction GetLeasePayment(int leasePaymentId)
        {
            var res = leaseContractPaymentsRepository.GetById(l => l.TransactionId == leasePaymentId);
            return res.AutoMapObject<DB.LeasePaymentTransaction, LeasePaymentTransaction>();
        }

        public IEnumerable<LeasePaymentTransaction> GetLeasePayments()
        {
            return leaseContractPaymentsRepository
                .GetAll()
                .Select(l => l.AutoMapObject<DB.LeasePaymentTransaction, LeasePaymentTransaction>())
                .OrderByDescending(c => c.TransactionId);
        }

        public IEnumerable<LeasePaymentTransaction> GetLeasePaymentsByLeaseContractId(int leaseContractId)
        {
            return leaseContractPaymentsRepository
                  .SearchData(p => p.LeaseId == leaseContractId)
                  .Select(l => l.AutoMapObject<DB.LeasePaymentTransaction, LeasePaymentTransaction>())
                  .OrderByDescending(c => c.TransactionId);
        }

        public IEnumerable<LeasePaymentTransactionApprovalWorkflow> GetLeasePaymentWorkflow(int paymentId)
        {
            return leasePaymentTransactionApprovalWorkflowRepository
                  .SearchData(p => p.TransactionId == paymentId)
                  .OrderBy(p => p.Id)
                  .Select(l => l.AutoMapObject<DB.LeasePaymentTransactionApprovalWorkflow, LeasePaymentTransactionApprovalWorkflow>())
                  .OrderByDescending(c => c.Id);
        }
        public IEnumerable<LeasePaymentTransactionApprovalWorkflow> GetUserLeasePaymentWorkflow(int userId)
        {
            return leasePaymentTransactionApprovalWorkflowRepository
                .GetLeasePaymentWorkflow(userId)
                .Select(w => w.AutoMapObject<DB.LeasePaymentTransactionApprovalWorkflow, LeasePaymentTransactionApprovalWorkflow>())
                .OrderByDescending(c => c.Id);
        }

        public LeasePaymentTransactionApprovalWorkflow GetUserLeasePaymentWorkflowById(int workflowId)
        {
            return leasePaymentTransactionApprovalWorkflowRepository
                .GetById(w => w.Id == workflowId)
                .AutoMapObject<DB.LeasePaymentTransactionApprovalWorkflow, LeasePaymentTransactionApprovalWorkflow>();
        }

    }
}
