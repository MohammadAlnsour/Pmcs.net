using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using pmcs.Model.ViewModels;
using pmcs.Core;
using pmcs.Model.Contracts;

namespace pmcs.ui.Controllers.Mvc
{
    public class ContractsController : SecuredBaseController
    {
        private readonly ISitesService sitesService;
        private readonly ILeaseContractsService leaseContractsService;
        private readonly ISitesLookupService sitesLookupService;
        private readonly ICULsService cULsService;
        private readonly IPOsService pOsService;
        private readonly IJobsService jobsService;
        private readonly IElementsService elementsService;
        private readonly IBOQService bOQService;

        public ContractsController(ISitesService sitesService,
            ILeaseContractsService leaseContractsService,
            ISitesLookupService sitesLookupService,
            ICULsService cULsService,
            IPOsService pOsService,
            IJobsService jobsService,
            IElementsService elementsService,
            IBOQService bOQService)
        {
            this.sitesService = sitesService;
            this.leaseContractsService = leaseContractsService;
            this.sitesLookupService = sitesLookupService;
            this.cULsService = cULsService;
            this.pOsService = pOsService;
            this.jobsService = jobsService;
            this.elementsService = elementsService;
            this.bOQService = bOQService;
        }

        //Sites Management
        public ActionResult Sites()
        {
            ViewData["contractsManagement"] = "in";
            ViewData["sites"] = "active";
            return View(sitesService.GetSites());
        }
        public ActionResult SitesDetails(int id)
        {
            ViewData["contractsManagement"] = "in";
            ViewData["sites"] = "active";
            return View(sitesService.GetSite(id));
        }
        //Lease Management
        public ActionResult LeaseContracts()
        {
            ViewData["contractsManagement"] = "in";
            ViewData["leases"] = "active";

            var viewModel = new LeasesViewModel()
            {
                LeaseContractPayments = leaseContractsService.GetLeasePayments(),
                LeaseContracts = leaseContractsService.GetLeaseContracts(),
                LeasePaymentsWorkflow = leaseContractsService.GetUserLeasePaymentWorkflow(User.UserId),
                SiteOwners = sitesLookupService.GetSiteOwners(),
                SiteOwnerPaymentAccounts = sitesLookupService.GetSiteOwnerPaymentAccounts()
            };
            return View(viewModel);
        }
        public ActionResult LeaseWorkflowAction(int id)
        {
            ViewData["contractsManagement"] = "in";
            ViewData["leases"] = "active";

            var workflow = leaseContractsService.GetUserLeasePaymentWorkflowById(id);
            var leaseContract = leaseContractsService.GetLeaseContract(workflow.LeaseId);
            var leasePayment = leaseContractsService.GetLeasePayment((int)workflow.TransactionId);

            var leaseWorkflowDetails = new LeaseWorkflowDetails()
            {
                LeaseContract = leaseContract,
                LeasePayment = leasePayment,
                LeaseWorkflowItem = workflow
            };

            return View(leaseWorkflowDetails);
        }

        //CULs
        public ActionResult CULs()
        {
            ViewData["contractsManagement"] = "in";
            ViewData["culItems"] = "active";
            //int numberOfPages = 1;
            //var culs = cULsService.GetCULsPaged(5, 1, ref numberOfPages);
            //var viewModel = new CULsPagingViewModel() { CULs = culs.ToList(), NumberOfPages = numberOfPages };
            return View();
        }
        //CULs Groups
        public ActionResult CULsGroups()
        {
            ViewData["contractsManagement"] = "in";
            ViewData["culGroups"] = "active";

            var groups = cULsService.GetCULGroups();
            return View(groups);
        }
        public ActionResult POs()
        {
            ViewData["contractsManagement"] = "in";
            ViewData["purchaseOrders"] = "active";

            var POs = pOsService.GetPOs();
            return View(POs);
        }
        public ActionResult POsDetails(int id)
        {
            ViewData["contractsManagement"] = "in";
            ViewData["purchaseOrders"] = "active";
            var poDetailsViewModel = new PODetailsViewModel()
            {
                PO = pOsService.GetPO(id),
                Elements = pOsService.GetPOElements(id).ToList(),
                Jobs = jobsService
                .GetPOJobs(id)
                .Select(j => j.AutoMapObject<Job, JobsListViewModel>())
                .ToList(),
                BOQs = bOQService.GetBOQsByPOId(id).ToList()
            };
            return View(poDetailsViewModel);
        }
        public ActionResult Jobs()
        {
            ViewData["contractsManagement"] = "in";
            ViewData["jobs"] = "active";

            var jobs = jobsService.GetJobs().Select(j => j.AutoMapObject<Job, JobsListViewModel>());
            return View(jobs);
        }
        public ActionResult JobsDetails(int id)
        {
            ViewData["contractsManagement"] = "in";
            ViewData["jobs"] = "active";

            var jobDetailsViewModel = new JobDetailsViewModel();
            jobDetailsViewModel = jobsService.GetJob(id).AutoMapObject<Job, JobDetailsViewModel>();
            jobDetailsViewModel.AsBuilts = jobsService.GetJobAsBuilt(id).ToList();
            jobDetailsViewModel.PATs = jobsService.GetJobPATs(id).ToList();
            jobDetailsViewModel.OILs = jobsService.GetJobOILs(id).ToList();

            return View(jobDetailsViewModel);
        }
        public ActionResult Elements()
        {
            ViewData["contractsManagement"] = "in";
            ViewData["elements"] = "active";

            var elements = elementsService.GetElements();
            return View(elements);
        }
        public ActionResult ElementDetails(int id)
        {
            ViewData["contractsManagement"] = "in";
            ViewData["elements"] = "active";
            var viewModel = new ElementDetailsViewModel()
            {
                Element = elementsService.GetElement(id),
                ElementBOQs = bOQService.GetBOQsByElementId(id).ToList(),
                ElementJobs = elementsService.GetElementJobs(id).Select(j => j.AutoMapObject<Job, JobsListViewModel>()).ToList()
            };
            return View(viewModel);
        }
        public ActionResult BOQs()
        {
            ViewData["contractsManagement"] = "in";
            ViewData["BOQs"] = "active";
            var BOQs = bOQService.GetBOQs();
            return View(BOQs);
        }

    }
}