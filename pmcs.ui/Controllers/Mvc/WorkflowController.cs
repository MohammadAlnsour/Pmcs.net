using pmcs.Auth.UsersAuth;
using pmcs.Logs;
using pmcs.Model;
using pmcs.Model.ViewModels;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.ui.Controllers.Mvc
{
    public class WorkflowController : SecuredBaseController
    {
        private readonly IWorkflowService workflowService;
        private readonly IChangeWorkflowService changeWorkflowService;
        private readonly IInvoiceWorkflowService invoiceWorkflowService;

        public WorkflowController(IWorkflowService workflowService,
            IChangeWorkflowService changeWorkflowService,
            IInvoiceWorkflowService invoiceWorkflowService)
        {
            this.workflowService = workflowService;
            this.changeWorkflowService = changeWorkflowService;
            this.invoiceWorkflowService = invoiceWorkflowService;
        }

        // GET: Workflow
        public ActionResult Designer()
        {
            ViewData["WorkflowDesign"] = "active";

            var viewModel = new WorkflowDesignerViewModel()
            {
                LeaseWorkflowStages = workflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber),
                InvoiceWorkflowStages = invoiceWorkflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber),
                ChangeWorkflowStages = changeWorkflowService.GetWorkflowStages().OrderByDescending(lv => lv.StageOrderNumber)
            };

            return View(viewModel);
        }

    }
}