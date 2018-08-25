using pmcs.Services;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using pmcs.Model.Contracts;
using pmcs.Model.ViewModels;

namespace pmcs.ui.Controllers.Mvc
{
    public class DashboardsController : SecuredBaseController
    {
        private readonly IInvoicesService invoicesService;
        private readonly ILeaseContractsService leaseContractsService;
        private readonly IAuthService authService;
        private readonly IRolesService rolesService;

        // GET: Home
        public DashboardsController(IInvoicesService invoicesService,
            ILeaseContractsService leaseContractsService,
            IAuthService authService,
            IRolesService rolesService)
        {
            this.invoicesService = invoicesService;
            this.leaseContractsService = leaseContractsService;
            this.authService = authService;
            this.rolesService = rolesService;
        }

        public ActionResult Dashboard()
        {
            ViewData["dashboardPage"] = "active";

            var viewModel = new DashboardViewModel();

            var userInvoicesWorkflows = invoicesService.GetUserInvoiceWorkflow(User.UserId).ToList();
            var userLeasesWorkflows = leaseContractsService.GetUserLeasePaymentWorkflow(User.UserId);

            var finishedActionInvoices = userInvoicesWorkflows.Where(i => i.IsFinished).Take(5).Select(i => new KanbanBoardWorkflowTask()
            {
                LastNotes = i.Remarks,
                ObjectNumber = i.InvoiceNumber,
                ProcessedDate = i.ProcessedDate,
                URL = Url.Action("InvoiceDetails", "Financial", new { id = i.InvoiceId }),
                WorkflowId = i.Id,
                WorkflowItemType = Core.WorkflowType.Invoice
            }).ToList();
            var ongoingInvoices = userInvoicesWorkflows.Where(i => !i.IsFinished).Take(5).Select(i => new KanbanBoardWorkflowTask()
            {
                LastNotes = i.Remarks,
                ObjectNumber = i.InvoiceNumber,
                ReceivedDate = i.CreatedDate,
                URL = Url.Action("InvoiceDetails", "Financial", new { id = i.InvoiceId }),
                WorkflowId = i.Id,
                WorkflowItemType = Core.WorkflowType.Invoice
            }).ToList();
            var needActionInvoices = invoicesService.GetNotFinishedUserInvoiceWorkflow(User.UserId).Select(i => new KanbanBoardWorkflowTask()
            {
                LastNotes = i.Remarks,
                ObjectNumber = i.InvoiceNumber,
                ReceivedDate = i.CreatedDate,
                URL = Url.Action("InvoiceWorkflowAction", "Financial", new { id = i.Id }),
                WorkflowId = i.Id,
                WorkflowItemType = Core.WorkflowType.Invoice
            }).ToList();

            var finishedActionLeases = userLeasesWorkflows.Where(i => i.IsFinished).Take(5).Select(i => new KanbanBoardWorkflowTask()
            {
                LastNotes = i.Remarks,
                ObjectNumber = i.LeaseContractNumber,
                ProcessedDate = i.ProcessedDate,
                URL = Url.Action("LeaseWorkflowAction", "Contracts", new { id = i.Id }),
                WorkflowId = i.Id,
                WorkflowItemType = Core.WorkflowType.Lease
            }).ToList();
            var ongoingLeases = userLeasesWorkflows.Where(i => !i.IsFinished).Take(5).Select(i => new KanbanBoardWorkflowTask()
            {
                LastNotes = i.Remarks,
                ObjectNumber = i.LeaseContractNumber,
                ReceivedDate = i.CreatedDate,
                URL = Url.Action("LeaseWorkflowAction", "Contracts", new { id = i.Id }),
                WorkflowId = i.Id,
                WorkflowItemType = Core.WorkflowType.Lease
            }).ToList();
            var needActionLeases = userLeasesWorkflows.Where(i => !i.IsFinished).Take(5).Select(i => new KanbanBoardWorkflowTask()
            {
                LastNotes = i.Remarks,
                ObjectNumber = i.LeaseContractNumber,
                ReceivedDate = i.CreatedDate,
                URL = Url.Action("LeaseWorkflowAction", "Contracts", new { id = i.Id }),
                WorkflowId = i.Id,
                WorkflowItemType = Core.WorkflowType.Lease
            }).ToList();

            var finished = new List<KanbanBoardWorkflowTask>();
            finished.AddRange(finishedActionInvoices);
            finished.AddRange(finishedActionLeases);
            var ongoing = new List<KanbanBoardWorkflowTask>();
            ongoing.AddRange(ongoingInvoices);
            ongoing.AddRange(ongoingLeases);
            var needAction = new List<KanbanBoardWorkflowTask>();
            needAction.AddRange(needActionInvoices);
            needAction.AddRange(needActionLeases);

            viewModel.FinishedTasks = finished.OrderByDescending(k => k.ProcessedDate).ToList();
            viewModel.OngoingTasks = ongoing.OrderByDescending(k => k.ProcessedDate).ToList();
            viewModel.NeedActionTasks = needAction.OrderByDescending(k => k.ReceivedDate).ToList(); ;

            return View(viewModel);
        }
    }
}