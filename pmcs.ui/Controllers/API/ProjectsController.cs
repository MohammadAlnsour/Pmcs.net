using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Model.Contracts;
using pmcs.Core;
using pmcs.Model.DTOs;

namespace pmcs.ui.Controllers.API
{
    public class ProjectsController : SecuredBaseAPIController
    {
        private readonly IProjectsService projectsService;
        public ProjectsController(IProjectsService projectsService)
        {
            this.projectsService = projectsService;
        }

        [HttpGet]
        public IHttpActionResult GetProjectsList()
        {
            try
            {
                return Ok(projectsService.GetProjects());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/Projects/PostProject")]
        public IHttpActionResult PostProject(Project project)
        {
            if (project == null) return BadRequest("project object must be sent in the request body");
            try
            {
                project.CreatedDate = DateTime.Now;
                project.IsActive = true;
                var newProjectId = projectsService.CreateProject(project);

                projectsService.CreateTask(new ProjectTask()
                {
                    TaskName = "Sample Project Task",
                    Description = "Sample Project Task",
                    CreatedDate = DateTime.Now,
                    CompletionPercentage = 0.99,
                    ForcastStartDate = DateTime.Now,
                    ForcastEndDate = DateTime.Now.AddDays(8),
                    IsActive = true,
                    IsMileStone = false,
                    Objectives = "Sample Project Task",
                    Output = "Sample Project Task",
                    ParentTaskId = null,
                    ProjectId = newProjectId,
                    PlanStartDate = DateTime.Now,
                    PlanEndDate = DateTime.Now.AddDays(8),
                    TaskCode = "Sample Project Task",
                    TaskDuration = 8,
                    TaskStatus = 1
                });

                var projects = projectsService.GetProjects();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Projects/ProjectsList.cshtml", projects);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Projects/GetProject/{projectId}")]
        public IHttpActionResult GetProject(int projectId)
        {
            if (projectId <= 0) return BadRequest("project id is not available.");
            try
            {
                return Ok(projectsService.GetProject(projectId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Projects/EditProject")]
        public IHttpActionResult EditProject(Project project)
        {
            if (project == null) return BadRequest("project object must be sent in the request body");
            try
            {
                var dbProject = projectsService.GetProject(project.ProjectId);
                dbProject.ProjectCode = project.ProjectCode;
                dbProject.ProjectName = project.ProjectName;
                dbProject.SiteId = project.SiteId;
                dbProject.ProjectShortName = project.ProjectShortName;

                projectsService.UpdateProject(dbProject);

                var projects = projectsService.GetProjects();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Projects/ProjectsList.cshtml", projects);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/Projects/PostTask")]
        public IHttpActionResult PostTask(dhtmlxganttTask task)
        {
            if (task == null) return BadRequest("task object must be sent in the request body");
            try
            {
                var dbTask = new ProjectTask()
                {
                    CompletionPercentage = 0,
                    CreatedDate = DateTime.Now,
                    Description = task.text,
                    ForcastStartDate = task.start_date,
                    ForcastEndDate = task.start_date.AddDays(task.duration),
                    IsMileStone = task.type == "gantt.config.types.milestone" ? true : false,
                    Objectives = task.text,
                    Output = task.text,
                    KPIs = task.text,
                    ParentTaskId = task.parent == 0 ? null : task.parent as int?,
                    PlanStartDate = task.start_date,
                    PlanEndDate = task.start_date.AddDays(task.duration),
                    ProjectId = task.projectId,
                    IsActive = true,
                    TaskComplete = false,
                    TaskDuration = task.duration,
                    TaskName = task.text,
                    TaskStatus = 1,
                    VersionDate = DateTime.Now
                };
                var taskId = projectsService.CreateTask(dbTask);
                return Ok(taskId);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Projects/EditTask")]
        public IHttpActionResult EditTask(dhtmlxganttTask task)
        {
            if (task == null) return BadRequest("task object must be sent in the request body");
            try
            {
                var dbTask = projectsService.GetTask(task.id);
                dbTask.Description = task.text;
                dbTask.ForcastStartDate = task.start_date;
                dbTask.ForcastEndDate = task.start_date.AddDays(task.duration);
                dbTask.IsMileStone = task.type == "gantt.config.types.milestone" ? true : false;
                dbTask.Objectives = task.text;
                dbTask.Output = task.text;
                dbTask.PlanStartDate = task.start_date;
                dbTask.PlanEndDate = task.start_date.AddDays(task.duration);
                dbTask.IsActive = true;
                dbTask.KPIs = task.text;
                dbTask.TaskDuration = task.duration;
                dbTask.TaskName = task.text;
                //dbTask.TaskStatus = 1;
                //var dbTask = new ProjectTask()
                //{
                //    CompletionPercentage = 0,
                //    CreatedDate = DateTime.Now,
                //    Description = task.text,
                //    ForcastStartDate = task.start_date,
                //    ForcastEndDate = task.start_date.AddDays(task.duration),
                //    IsMileStone = task.type == "gantt.config.types.milestone" ? true : false,
                //    Objectives = task.text,
                //    Output = task.text,
                //    KPIs = task.text,
                //    ParentTaskId = task.parent == 0 ? null : task.parent as int?,
                //    PlanStartDate = task.start_date,
                //    PlanEndDate = task.start_date.AddDays(task.duration),
                //    ProjectId = task.projectId,
                //    IsActive = true,
                //    TaskComplete = false,
                //    TaskDuration = task.duration,
                //    TaskName = task.text,
                //    TaskStatus = 1,
                //    VersionDate = DateTime.Now
                //};
                projectsService.EditTask(dbTask);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
