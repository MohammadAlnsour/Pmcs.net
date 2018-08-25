using pmcs.Business.WorkflowProcessors;
using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Services.ContractsServices;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    public class LeaseContractsController : SecuredBaseAPIController
    {
        private readonly ILeaseContractsService leaseContractsService;
        private readonly IWorkflowService workflowService;

        public LeaseContractsController(ILeaseContractsService leaseContractsService,
            IWorkflowService workflowService)
        {
            this.leaseContractsService = leaseContractsService;
            this.workflowService = workflowService;
        }

        [HttpPost]
        [Route("api/LeaseContracts/PostLeaseContract")]
        public IHttpActionResult PostLeaseContract(LeaseContract contract)
        {
            if (contract == null) return BadRequest("Contract object has not found in the request body");
            try
            {
                contract.CreatedDate = DateTime.Now;
                leaseContractsService.CreateLeaseContract(contract);

                var contracts = leaseContractsService.GetLeaseContracts();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Leases/LeaseContractsList.cshtml", contracts);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/LeaseContracts/PutLeaseContract")]
        public IHttpActionResult PutLeaseContract(LeaseContract contract)
        {
            if (contract == null) return BadRequest("Contract object has not found in the request body");
            try
            {
                leaseContractsService.EditLeaseContract(contract);

                var contracts = leaseContractsService.GetLeaseContracts();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Leases/LeaseContractsList.cshtml", contracts);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/LeaseContracts/PostLeasePayment")]
        public IHttpActionResult PostLeasePayment(LeasePaymentTransaction payment)
        {
            if (payment == null) return BadRequest("Contract object has not found in the request body");
            try
            {
                payment.CreatedDate = DateTime.Now;
                leaseContractsService.CreateLeasePayment(payment);

                //var payments = leaseContractsService.GetLeasePayments();
                //var html = Helpers.RenderPartial("~/Views/Shared/Partial/Leases/LeasePaymentList.cshtml", payments);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/LeaseContracts/GetLeaseContracts")]
        public IHttpActionResult GetLeaseContracts()
        {
            try
            {
                return Ok(leaseContractsService.GetLeaseContracts());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/LeaseContracts/GetLeaseContract/{contractId}")]
        public IHttpActionResult GetLeaseContract(int contractId)
        {
            try
            {
                return Ok(leaseContractsService.GetLeaseContract(contractId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/LeaseContracts/GetLeaseContractPayments/{contractId}")]
        public IHttpActionResult GetLeaseContractPayments(int contractId)
        {
            if (contractId <= 0) return BadRequest("contract id connot be found in the request body");
            try
            {
                var payments = leaseContractsService.GetLeasePaymentsByLeaseContractId(contractId);
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/LeaseContracts/GetPaymentWorkflow/{paymentId}")]
        public IHttpActionResult GetPaymentWorkflow(int paymentId)
        {
            if (paymentId <= 0) return BadRequest("contract id connot be found in the request body");
            try
            {
                var workflows = leaseContractsService.GetUserLeasePaymentWorkflow(User.UserId);
                var paymentWorkflow = workflows.Where(w => w.TransactionId == paymentId);
                return Ok(paymentWorkflow);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/LeaseContracts/GetLeasePaymentWorkflow/{paymentId}")]
        public IHttpActionResult GetLeasePaymentWorkflow(int paymentId)
        {
            try
            {
                return Ok(leaseContractsService.GetLeasePaymentWorkflow(paymentId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/LeaseContracts/GetLeaseWorkflowDetail/{workflowId}")]
        public IHttpActionResult GetLeaseWorkflowDetail(int workflowId)
        {
            try
            {
                return Ok(leaseContractsService.GetUserLeasePaymentWorkflowById(workflowId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/LeaseContracts/DoPaymentWorkflowAction")]
        public IHttpActionResult DoPaymentWorkflowAction(LeasePaymentTransactionApprovalWorkflow workflow)
        {
            if (workflow == null) return BadRequest("workflow object must be passed in the request body");
            try
            {
                var wfProcessor = new LeasePaymentWorkflowProcessor();
                var dbWorkflow = wfProcessor.ChangeWorkflowStageAction(workflow.Id, (int)workflow.Status, workflow.Remarks, User.FullName);

                var currentStageOrderNumber = workflowService.
                    GetWorkflowStage(dbWorkflow.StageId).
                    StageOrderNumber;

                var nextStageSerialNumber = currentStageOrderNumber + 1;
                var nextStage = workflowService.GetWorkflowStages().SingleOrDefault(w => w.StageOrderNumber == nextStageSerialNumber);

                if (nextStage != null)
                {
                    var nextPaymentWorkflow = new LeasePaymentTransactionApprovalWorkflow()
                    {
                        CreatedBy = User.UserId,
                        CreatedDate = DateTime.Now,
                        Duration = "",
                        IsActive = true,
                        LeaseId = dbWorkflow.LeaseId,
                        ReceivedDate = DateTime.Now,
                        StageId = nextStage.StageId,
                        Status = (int)WorkflowLevelStatus.Forwarded,
                        TransactionId = dbWorkflow.TransactionId,
                        ReferenceNumber = "",
                        SequentialId = nextStageSerialNumber.ToString()
                    };
                    wfProcessor.ForwardNextStage(nextPaymentWorkflow, nextStage);
                }

                var workflows = leaseContractsService.GetUserLeasePaymentWorkflow(User.UserId).Where(l => l.TransactionId == dbWorkflow.TransactionId);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Leases/LeasePaymentWorkflowList.cshtml", workflows);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
