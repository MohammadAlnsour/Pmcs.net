using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using pmcs.Model.Contracts;
using pmcs.Model.ViewModels;
using pmcs.Services.ContractsServices;
using pmcs.Services.Interfaces;

namespace pmcs.ui.Controllers.Mvc
{
    public class ProjectsController : SecuredBaseController
    {
        private readonly IProjectManagementService projectManagementService;
        private readonly IProjectsService projectsService;
        private readonly IPurchaseOrdersService purchaseOrdersService;
        private readonly IProjectTemplatesService projectTemplatesService;
        private readonly ISitesService sitesService;
        private readonly IPOsService pOsService;
        private readonly IInvoicesService invoicesService;
        private readonly IJobsService jobsService;

        public ProjectsController(IProjectManagementService projectManagementService,
            IProjectsService projectsService,
            IPurchaseOrdersService purchaseOrdersService,
            IProjectTemplatesService projectTemplatesService,
            ISitesService sitesService,
            IPOsService pOsService,
            IInvoicesService invoicesService,
            IJobsService jobsService)
        {
            this.projectManagementService = projectManagementService;
            this.projectsService = projectsService;
            this.purchaseOrdersService = purchaseOrdersService;
            this.projectTemplatesService = projectTemplatesService;
            this.sitesService = sitesService;
            this.pOsService = pOsService;
            this.invoicesService = invoicesService;
            this.jobsService = jobsService;
        }

        // GET: Projects
        public ActionResult ProjectScheduler()
        {
            ViewData["projectsManagement"] = "active in";
            ViewData["projectScheduler"] = "active";
            return View(projectsService.GetProjects());
        }
        public ActionResult ManageProjects()
        {
            ViewData["projectsManagement"] = "active in";
            ViewData["projects"] = "active";
            return View(projectsService.GetProjects());
        }
        public ActionResult ProjectDetails(int id)
        {
            var viewModel = new ProjectDetailsViewModel()
            {
                ProjectDetails = projectsService.GetProject(id),
                ProjectTasks = projectsService.GetProjectTasks(id),
                ProjectPOs = purchaseOrdersService.GetPOsByProject(id),
                ProjectSite = projectsService.GetProjectSite(id)
            };
            ViewData["projectsManagement"] = "active in";
            ViewData["projects"] = "active";
            return View(viewModel);
        }
        public ActionResult ProjectsCalendar()
        {
            ViewData["projectsManagement"] = "active in";
            ViewData["projectCalendar"] = "active";
            // var res = projectsService.GetProjects();
            return View();
        }
        public ActionResult ProjectsGanttChart()
        {
            ViewData["projectsManagement"] = "active in";
            ViewData["gantt"] = "active";
            return View();
        }
        public ActionResult ProjectsStatus()
        {
            ViewData["projectsManagement"] = "active in";
            ViewData["projectStatus"] = "active";
            var projects = projectsService.GetProjects();
            return View(projects);
        }
        public ActionResult ProjectsTemplates()
        {
            ViewData["projectsManagement"] = "active in";
            ViewData["projectTemplates"] = "active";

            //var data = new Dictionary<ProjectTemplates, List<ProjectTemplateTasks>>();
            //var templates = projectTemplatesService.GetTemplates();
            //foreach (var template in templates)
            //{
            //    data.Add(template, projectTemplatesService.GetTasksByTemplateId(template.TemplateId).ToList());
            //}
            //var viewModel = new ProjectTemplatesViewModel()
            //{
            //    TemplateTasksDictionary = data
            //};
            return View();
        }
        public ActionResult TaskDetails(int id)
        {
            var task = projectsService.GetTask(id);
            var project = projectsService.GetProject(task.ProjectId);
            var invoicesRelated = invoicesService.SearchInvoices(i => i.MilestoneId == task.TaskId).Select(inv => new RelatedEntity() { EntityNumber = inv.InvoiceNumber, EntityType = "Invoice", IsFinished = false, ID = inv.InvoiceId, URL = Url.Action("InvoiceDetails", "Financial", new { id = inv.InvoiceId }) });
            var jobsRelated = jobsService.SearchJobs(j => j.ProjectTaskId == task.TaskId).Select(job => new RelatedEntity() { EntityNumber = job.JobNumber, EntityType = "Job", IsFinished = false, ID = job.JobId, URL = Url.Action("JobsDetails", "Contracts", new { id = job.JobId }) });
            var posRelated = pOsService.GetProjectPOs(task.ProjectId).Where(po => po.ProjectTaskId == task.TaskId).Select(po => new RelatedEntity() { EntityNumber = po.PONumber, EntityType = "Purchase Order", IsFinished = false, ID = po.PoId, URL = Url.Action("POsDetails", "Contracts", new { id = po.PoId }) });
            var relatedEntities = new List<RelatedEntity>();
            relatedEntities.AddRange(invoicesRelated);
            relatedEntities.AddRange(jobsRelated);
            relatedEntities.AddRange(posRelated);

            var viewModel = new TaskViewModel()
            {
                Project = project,
                Site = sitesService.GetSite(project.SiteId),
                Task = task,
                RelatedEntities = relatedEntities
            };
            ViewData["projectsManagement"] = "active in";
            ViewData["projectStatus"] = "active";
            return View(viewModel);
        }

        public ActionResult ProjectsKanban()
        {
            ViewData["projectsManagement"] = "active in";
            ViewData["projectKanban"] = "active";
            var projects = projectsService.GetProjects();
            return View(projects);
        }

    }
}