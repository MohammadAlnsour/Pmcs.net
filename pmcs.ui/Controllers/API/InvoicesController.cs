using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Business.Projects;
using pmcs.Business.WorkflowProcessors;
using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Services.ContractsServices;
using pmcs.Services.Interfaces;

namespace pmcs.ui.Controllers.API
{
    public class InvoicesController : SecuredBaseAPIController
    {
        private readonly IInvoicesService invoicesService;
        private readonly IInvoiceWorkflowService workflowService;

        public InvoicesController(IInvoicesService invoicesService, IInvoiceWorkflowService workflowService)
        {
            this.invoicesService = invoicesService;
            this.workflowService = workflowService;
        }

        [HttpPost]
        [Route("api/Invoices/PostInvoice")]
        public IHttpActionResult PostInvoice(Invoice invoice)
        {
            if (invoice == null) return BadRequest("invoice object cannot be found in the request body.");
            try
            {
                invoice.CreatedDate = DateTime.Now;
                invoicesService.CreateInvoice(invoice);
                invoicesService.UpdateInvoiceTaskActualStartDate(invoice.MilestoneId);

                var invoices = invoicesService.GetInvoices();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Invoices/InvoicesList.cshtml", invoices);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Invoices/EditInvoice")]
        public IHttpActionResult EditInvoice(Invoice Invoice)
        {
            if (Invoice == null) return BadRequest("Invoice object cannot be found in the request body.");
            try
            {
                var dbInvoice = invoicesService.GetInvoice(Invoice.InvoiceId);
                Invoice.CreatedDate = dbInvoice.CreatedDate;
                invoicesService.UpdateInvoice(Invoice);

                var Invoices = invoicesService.GetInvoices();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Invoices/InvoicesList.cshtml", Invoices);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Invoices/GetInvoice/{InvoiceId}")]
        public IHttpActionResult GetInvoice(int InvoiceId)
        {
            if (InvoiceId <= 0) return BadRequest("Invoice id connot be found in the request body.");
            try
            {
                return Ok(invoicesService.GetInvoice(InvoiceId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/Invoices/GetInvoices")]
        public IHttpActionResult GetInvoices()
        {
            try
            {
                return Ok(invoicesService.GetInvoices());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPut]
        [Route("api/Invoices/DoInvoiceWorkflowAction")]
        public IHttpActionResult DoInvoiceWorkflowAction(InvoicesApprovalWorkflow workflow)
        {
            if (workflow == null) return BadRequest("workflow object must be passed in the request body");
            try
            {
                var wfProcessor = new InvoiceWorkflowProcessor();
                var dbWorkflow = wfProcessor.ChangeWorkflowStageAction(workflow.Id, (int)workflow.Status, workflow.Remarks, User.FullName);

                var currentStageOrderNumber = workflowService.
                    GetWorkflowStage(dbWorkflow.StageId).
                    StageOrderNumber;

                var nextStageSerialNumber = currentStageOrderNumber + 1;
                var nextStage = workflowService.GetWorkflowStages().SingleOrDefault(w => w.StageOrderNumber == nextStageSerialNumber);

                if (nextStage != null)
                {
                    var nextPaymentWorkflow = new InvoicesApprovalWorkflow()
                    {
                        CreatedBy = User.UserId,
                        CreatedDate = DateTime.Now,
                        IsActive = true,
                        InvoiceId = dbWorkflow.InvoiceId,
                        ProcessedDate = null,
                        StageId = nextStage.StageId,
                        Status = (int)WorkflowLevelStatus.Forwarded,
                        Remarks = null,
                        IsFinished = false,
                        ReferenceNumber = "",
                        SequentialId = nextStageSerialNumber
                    };
                    wfProcessor.ForwardNextStage(nextPaymentWorkflow, nextStage);
                }
                else
                {
                    var taskId = invoicesService.GetInvoice(workflow.InvoiceId).MilestoneId;
                    TasksHandler.Finish(taskId);
                }

                var workflows = invoicesService.GetUserInvoiceWorkflow(User.UserId).Where(l => l.InvoiceId == dbWorkflow.InvoiceId);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Invoices/InvoiceWorkflowList.cshtml", workflows);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Invoices/GetInvoiceWorkflowDetail/{workflowId}")]
        public IHttpActionResult GetInvoiceWorkflowDetail(int workflowId)
        {
            try
            {
                return Ok(invoicesService.GetUserInvoiceWorkflowById(workflowId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Invoices/GetInvoiceWorkflow/{invoiceId}")]
        public IHttpActionResult GetInvoiceWorkflow(int invoiceId)
        {
            try
            {
                var workflows = invoicesService
                    .GetUserInvoiceWorkflow(User.UserId)
                    .Where(l => l.InvoiceId == invoiceId)
                    .OrderByDescending(i => i.SequentialId);

                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Invoices/InvoiceWorkflowList.cshtml", workflows);
                return Ok(html);
                //return Ok(workflows);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/Invoices/GetInvoiceWorkflowList/{invoiceId}")]
        public IHttpActionResult GetInvoiceWorkflowList(int invoiceId)
        {
            try
            {
                var workflows = invoicesService
                    .GetUserInvoiceWorkflow(User.UserId)
                    .Where(l => l.InvoiceId == invoiceId);
                //.OrderByDescending(i => i.SequentialId);

                return Ok(workflows);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
