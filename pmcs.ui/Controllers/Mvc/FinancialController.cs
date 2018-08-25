using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Model.ViewModels;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.ui.Controllers.Mvc
{
    public class FinancialController : SecuredBaseController
    {
        private readonly IInvoicesService invoicesService;
        private readonly IJobsService jobsService;

        public FinancialController(IInvoicesService invoicesService, IJobsService jobsService)
        {
            this.invoicesService = invoicesService;
            this.jobsService = jobsService;
        }

        // GET: Financial
        public ActionResult Invoices()
        {
            var viewModel = new InvoicesListViewModel();
            viewModel.Invoices = invoicesService.GetInvoices().ToList();
            viewModel.Workflows = invoicesService.GetUserInvoiceWorkflow(User.UserId).ToList();

            ViewData["InvoicesManagement"] = "active";
            return View(viewModel);
        }

        public ActionResult InvoiceDetails(int id)
        {
            ViewData["InvoicesManagement"] = "active";
            var service = invoicesService.GetInvoice(id);
            var viewModel = new InvoiceDetailsViewModel()
            {
                Invoice = invoicesService.GetInvoice(id),
                InvoiceJobs = jobsService.GetPOJobs(service.POId).Select(j => j.AutoMapObject<Job, JobDetailsViewModel>()).ToList(),
                InvoiceWorkflows = invoicesService.GetInvoiceWorkflows(id).ToList()
            };
            return View(viewModel);
        }

        public ActionResult InvoiceWorkflowAction(int id)
        {
            ViewData["InvoicesManagement"] = "active";
            var invoiceWorkflow = invoicesService.GetUserInvoiceWorkflowById(id);
            var viewModel = new InvoiceWorkflowActionViewModel()
            {
                Invoice = invoicesService.GetInvoice(invoiceWorkflow.InvoiceId),
                InvoiceWorkflow = invoiceWorkflow
            };
            return View(viewModel);
        }

    }
}