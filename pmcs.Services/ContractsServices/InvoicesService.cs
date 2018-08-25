using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using pmcs.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using pmcs.Business.Projects;

namespace pmcs.Services.ContractsServices
{
    public class InvoicesService : IInvoicesService
    {
        private readonly InvoicesRepository invoicesRepository;
        private readonly InvoicesWorkflowStagesRepository workflowStagesRepository;
        private readonly InvoicesApprovalWorkflowRepository invoicesApprovalWorkflowRepository;

        public InvoicesService(InvoicesRepository invoicesRepository,
            InvoicesWorkflowStagesRepository workflowStagesRepository,
            InvoicesApprovalWorkflowRepository invoicesApprovalWorkflowRepository)
        {
            this.invoicesRepository = invoicesRepository;
            this.workflowStagesRepository = workflowStagesRepository;
            this.invoicesApprovalWorkflowRepository = invoicesApprovalWorkflowRepository;
        }

        public int CreateInvoice(Invoice invoice)
        {
            var res = invoicesRepository.Insert(invoice.AutoMapObject<Invoice, DB.Invoice>());

            //Commencing workflow
            var firstWorkflowStage = workflowStagesRepository.GetAll().OrderBy(w => w.StageOrderNumber).FirstOrDefault();
            if (firstWorkflowStage != null)
            {
                var workflowProcessor = new pmcs.Business.WorkflowProcessors.InvoiceWorkflowProcessor();
                workflowProcessor.BeginWorkflowProcess(
                                            new Model.Contracts.InvoicesApprovalWorkflow()
                                            {
                                                InvoiceId = res.InvoiceId,
                                                IsFinished = false,
                                                ReferenceNumber = "",
                                                Status = (int)WorkflowLevelStatus.New,
                                                IsActive = true,
                                                CreatedDate = DateTime.Now,
                                                CreatedBy = 0,
                                                StageId = firstWorkflowStage.StageId,
                                            },
                                            firstWorkflowStage.AutoMapObject<DB.InvoiceWorkflowStage, Model.InvoiceWorkflowStage>()
                                        );
            }

            return res.InvoiceId;
        }

        public void UpdateInvoiceTaskActualStartDate(int milestoneId)
        {
            TasksHandler.UpdateTaskActualStartDate(milestoneId);
        }

        public Invoice GetInvoice(int invoiceId)
        {
            return invoicesRepository
                .GetById(i => i.InvoiceId == invoiceId)
                .AutoMapObject<DB.Invoice, Invoice>();
        }

        public IEnumerable<Invoice> GetInvoices()
        {
            return invoicesRepository
                 .GetAll()
                 .Select(i => i.AutoMapObject<DB.Invoice, Invoice>())
                 .OrderByDescending(c => c.InvoiceId);
        }

        public IEnumerable<Invoice> GetInvoicesByPO(int POId)
        {
            return invoicesRepository
               .SearchData(i => i.POId == POId)
               .Select(i => i.AutoMapObject<DB.Invoice, Invoice>())
               .OrderByDescending(c => c.InvoiceId);
        }

        public IEnumerable<Invoice> SearchInvoices(Expression<Func<DB.Invoice, bool>> wherePredicate)
        {
            //var func = wherePredicate.Compile().;
            return invoicesRepository
              .SearchData(wherePredicate)
              .Select(i => i.AutoMapObject<DB.Invoice, Invoice>())
              .OrderByDescending(c => c.InvoiceId);
        }

        public void UpdateInvoice(Invoice invoice)
        {
            var original = invoicesRepository.GetById(i => i.InvoiceId == invoice.InvoiceId);
            invoicesRepository.Update(original, invoice.AutoMapObject<Invoice, DB.Invoice>());
        }

        public IEnumerable<InvoicesApprovalWorkflow> GetUserInvoiceWorkflow(int userId)
        {
            return invoicesApprovalWorkflowRepository
                .GetUserInvoicesWorkflow(userId)
                .Select(w => w.AutoMapObject<DB.InvoicesApprovalWorkflow, InvoicesApprovalWorkflow>())
                .OrderByDescending(c => c.Id);
        }

        public InvoicesApprovalWorkflow GetUserInvoiceWorkflowById(int workflowId)
        {
            return invoicesApprovalWorkflowRepository
                .GetById(w => w.Id == workflowId)
                .AutoMapObject<DB.InvoicesApprovalWorkflow, InvoicesApprovalWorkflow>();
        }

        public IEnumerable<InvoicesApprovalWorkflow> GetInvoiceWorkflows(int invoiceId)
        {
            return invoicesApprovalWorkflowRepository
                .SearchData(i => i.InvoiceId == invoiceId)
                .Select(w => w.AutoMapObject<DB.InvoicesApprovalWorkflow, InvoicesApprovalWorkflow>())
                .OrderByDescending(c => c.Id);
        }

        public IEnumerable<InvoicesApprovalWorkflow> GetNotFinishedUserInvoiceWorkflow(int userId)
        {
            return invoicesApprovalWorkflowRepository
                    .GetUnFinishedUserInvoicesWorkflow(userId)
                    .Select(w => w.AutoMapObject<DB.InvoicesApprovalWorkflow, InvoicesApprovalWorkflow>())
                    .OrderByDescending(c => c.Id);
        }

    }
}
