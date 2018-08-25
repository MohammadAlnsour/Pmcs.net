using pmcs.Core;
using pmcs.Model;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    public class WorkflowDesignController : SecuredBaseAPIController
    {
        private readonly IWorkflowService workflowService;
        private readonly IRolesService rolesService;
        private readonly IInvoiceWorkflowService invoiceWorkflowService;
        private readonly IChangeWorkflowService changeWorkflowService;

        public WorkflowDesignController(IWorkflowService workflowService,
            IRolesService rolesService,
            IInvoiceWorkflowService invoiceWorkflowService,
            IChangeWorkflowService changeWorkflowService)
        {
            this.workflowService = workflowService;
            this.rolesService = rolesService;
            this.invoiceWorkflowService = invoiceWorkflowService;
            this.changeWorkflowService = changeWorkflowService;
        }

        [HttpGet]
        [Route("api/WorkflowDesign/GetAllowedActionsList")]
        public IHttpActionResult GetAllowedActionsList()
        {
            try
            {
                return Ok(workflowService.GetWorkflowActionTypes());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/WorkflowDesign/GetWorkflowStage/{stageId}")]
        public IHttpActionResult GetWorkflowStage(int stageId)
        {
            if (stageId <= 0) return BadRequest("stage Id must be passed to the API");
            try
            {
                return Ok(workflowService.GetWorkflowStage(stageId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/WorkflowDesign/GetSystemRoles")]
        public IHttpActionResult GetSystemRoles()
        {
            try
            {
                return Ok(rolesService.GetSystemRoles());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/WorkflowDesign/GetInvoiceWorkflowStage/{stageId}")]
        public IHttpActionResult GetInvoiceWorkflowStage(int stageId)
        {
            if (stageId <= 0) return BadRequest("stage Id must be passed to the API");
            try
            {
                return Ok(invoiceWorkflowService.GetWorkflowStage(stageId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/WorkflowDesign/PostWorkflowStage/")]
        public IHttpActionResult PostWorkflowStage(WorkflowStage workflowStage)
        {
            if (workflowStage == null)
                return BadRequest("workflow stage connot be found in the request body");

            try
            {
                var allStages = workflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageId).ToList();

                int lastStage = 1;
                if (workflowStage.StageOrderNumber > 1)
                {
                    lastStage = workflowStage.StageOrderNumber;
                    var topStages = allStages.Where(s => s.StageOrderNumber >= workflowStage.StageOrderNumber);
                    foreach (var topStage in topStages)
                    {
                        var stage = workflowService.GetWorkflowStageByStageOrderNumber(topStage.StageOrderNumber);
                        stage.StageOrderNumber = stage.StageOrderNumber + 1;
                        workflowService.UpdateWorkflowStage(stage);
                    }
                }
                else
                {
                    if (allStages.Any())
                    {
                        lastStage = allStages.FirstOrDefault().StageOrderNumber + 1;
                    }
                }

                workflowStage.CreatedDate = DateTime.Now;
                workflowStage.ReferenceNumberRequired = true;
                workflowStage.TrackingEntity = "1";
                workflowStage.TrackingOwner = "1";
                workflowStage.StageOrderNumber = lastStage;
                workflowService.CreateWorkflowStage(workflowStage);

                allStages = workflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber).ToList();

                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Workflow/WorkflowStages.cshtml", allStages);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/WorkflowDesign/PutWorkflowStage/")]
        public IHttpActionResult PutWorkflowStage(WorkflowStage workflowStage)
        {
            if (workflowStage == null)
                return BadRequest("workflow stage connot be found in the request body");

            try
            {
                var currentStage = workflowService.GetWorkflowStage(workflowStage.StageId);
                currentStage.StageName = workflowStage.StageName;
                currentStage.RoleId = workflowStage.RoleId;

                workflowService.UpdateWorkflowStage(currentStage);
                var allStages = workflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber).ToList();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Workflow/WorkflowStages.cshtml", allStages);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



        [HttpGet]
        [Route("api/WorkflowDesign/GetChangeRequestWorkflowStage/{stageId}")]
        public IHttpActionResult GetChangeRequestWorkflowStage(int stageId)
        {
            if (stageId <= 0) return BadRequest("stage Id must be passed to the API");
            try
            {
                return Ok(changeWorkflowService.GetWorkflowStage(stageId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("api/WorkflowDesign/PostInvoiceWorkflowStage/")]
        public IHttpActionResult PostInvoiceWorkflowStage(InvoiceWorkflowStage workflowStage)
        {
            if (workflowStage == null)
                return BadRequest("workflow stage cannot be found in the request body.");

            try
            {
                var allStages = invoiceWorkflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageId).ToList();

                int lastStage = 1;
                if (workflowStage.StageOrderNumber > 1)
                {
                    lastStage = workflowStage.StageOrderNumber;
                    var topStages = allStages.Where(s => s.StageOrderNumber >= workflowStage.StageOrderNumber);
                    foreach (var topStage in topStages)
                    {
                        var stage = invoiceWorkflowService.GetWorkflowStageByStageOrderNumber(topStage.StageOrderNumber);
                        stage.StageOrderNumber = stage.StageOrderNumber + 1;
                        invoiceWorkflowService.UpdateWorkflowStage(stage);
                    }
                }
                else
                {
                    if (allStages.Any())
                    {
                        lastStage = allStages.FirstOrDefault().StageOrderNumber + 1;
                    }
                }

                workflowStage.CreatedDate = DateTime.Now;
                workflowStage.ReferenceNumberRequired = true;
                workflowStage.TrackingEntity = "1";
                workflowStage.TrackingOwner = "1";
                workflowStage.StageOrderNumber = lastStage;
                invoiceWorkflowService.CreateWorkflowStage(workflowStage);

                allStages = invoiceWorkflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber).ToList();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Workflow/InvoiceWorkflowStages.cshtml", allStages);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/WorkflowDesign/PutInvoiceWorkflowStage/")]
        public IHttpActionResult PutInvoiceWorkflowStage(InvoiceWorkflowStage workflowStage)
        {
            if (workflowStage == null)
                return BadRequest("workflow stage connot be found in the request body");

            try
            {
                var currentStage = invoiceWorkflowService.GetWorkflowStage(workflowStage.StageId);
                currentStage.StageName = workflowStage.StageName;
                currentStage.RoleId = workflowStage.RoleId;

                invoiceWorkflowService.UpdateWorkflowStage(currentStage);
                var allStages = invoiceWorkflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber).ToList();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Workflow/InvoiceWorkflowStages.cshtml", allStages);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/WorkflowDesign/PostChangeWorkflowStage/")]
        public IHttpActionResult PostChangeWorkflowStage(ChangeWorkflowStage workflowStage)
        {
            if (workflowStage == null)
                return BadRequest("workflow stage cannot be found in the request body.");

            try
            {
                var allStages = changeWorkflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageId).ToList();

                int lastStage = 1;
                if (workflowStage.StageOrderNumber > 1)
                {
                    lastStage = workflowStage.StageOrderNumber;
                    var topStages = allStages.Where(s => s.StageOrderNumber >= workflowStage.StageOrderNumber);
                    foreach (var topStage in topStages)
                    {
                        var stage = changeWorkflowService.GetWorkflowStageByStageOrderNumber(topStage.StageOrderNumber);
                        stage.StageOrderNumber = stage.StageOrderNumber + 1;
                        changeWorkflowService.UpdateWorkflowStage(stage);
                    }
                }
                else
                {
                    if (allStages.Any())
                    {
                        lastStage = allStages.FirstOrDefault().StageOrderNumber + 1;
                    }
                }

                workflowStage.CreatedDate = DateTime.Now;
                workflowStage.ReferenceNumberRequired = true;
                workflowStage.TrackingEntity = "1";
                workflowStage.TrackingOwner = "1";
                workflowStage.StageOrderNumber = lastStage;
                changeWorkflowService.CreateWorkflowStage(workflowStage);

                allStages = changeWorkflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber).ToList();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Workflow/ChangeWorkflowStages.cshtml", allStages);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/WorkflowDesign/PutChangeWorkflowStage/")]
        public IHttpActionResult PutChangeWorkflowStage(ChangeWorkflowStage workflowStage)
        {
            if (workflowStage == null)
                return BadRequest("workflow stage connot be found in the request body");

            try
            {
                var currentStage = changeWorkflowService.GetWorkflowStage(workflowStage.StageId);
                currentStage.StageName = workflowStage.StageName;
                currentStage.RoleId = workflowStage.RoleId;

                changeWorkflowService.UpdateWorkflowStage(currentStage);
                var allStages = changeWorkflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber).ToList();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Workflow/ChangeWorkflowStages.cshtml", allStages);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }
}
