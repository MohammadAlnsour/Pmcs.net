using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Model.DTOs;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    public class ProjectManagementController : SecuredBaseAPIController
    {
        private readonly IProjectManagementService projectManagementService;
        private readonly IProjectsService projectsService;
        private readonly IProjectTemplatesService projectTemplatesService;

        public ProjectManagementController(IProjectManagementService projectManagementService,
            IProjectsService projectsService,
            IProjectTemplatesService projectTemplatesService)
        {
            this.projectManagementService = projectManagementService;
            this.projectsService = projectsService;
            this.projectTemplatesService = projectTemplatesService;
        }

        [Route("api/ProjectManagement/GetProjectTasks/{projectId}")]
        [HttpGet]
        public IHttpActionResult GetProjectTasks(int projectId)
        {
            if (projectId <= 0) return BadRequest("project Id must be presented in the request.");
            try
            {
                var originalTasks = projectsService.GetProjectTasks(projectId);
                var projectTasks = originalTasks
                       .Select(t => new
                       {
                           id = t.TaskId,
                           text = t.TaskName,
                           start_date = t.PlanStartDate.ToString("dd-MM-yyyy"),
                           duration = t.TaskDuration.ToString(),
                           parent = t.ParentTaskId,
                           progress = t.CompletionPercentage,
                           open = true, //t.TaskComplete ?? false
                           type = (t.IsMileStone != null && (bool)t.IsMileStone ? "gantt.config.types.milestone" : "gantt.config.types.task")
                       })
                       .ToList();

                var originalTasksArr = originalTasks.ToArray();
                var taskLinks = originalTasks.Select((t, index) => new
                {
                    id = index,
                    source = t.TaskId,
                    target = (index < originalTasksArr.Length - 1
                   ? originalTasksArr[index + 1].TaskId.ToString()
                   : ""), //t.ParentTaskId,
                    type = 0
                })
                .ToList();

                dynamic obj = new
                {
                    data = projectTasks,
                    links = taskLinks
                };

                return Ok(obj);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetAllProjectTasks")]
        [HttpGet]
        public IHttpActionResult GetAllProjectTasks()
        {
            try
            {
                var originalTasks = projectsService.GetTasks();
                var projectTasks = originalTasks
                       .Select(t => new FullCalendarTaskEvent()
                       {
                           projectId = t.ProjectId,
                           id = t.TaskId,
                           title = t.TaskName,
                           start = t.PlanStartDate.ToString("yyyy-MM-dd"),
                           end = t.PlanEndDate.ToString("yyyy-MM-dd"),
                           url = Url.Route("Default", new { controller = "Projects", action = "ProjectDetails", id = t.ProjectId })
                       })
                       .GroupBy(t => t.projectId)
                       .ToList();

                IEnumerable<FullCalendarEventsGroup> events = projectTasks
                    .Select(t => new FullCalendarEventsGroup()
                    {
                        color = Helpers.GetRandomColor(),
                        events = t.ToList()
                        //textColor = ""
                    });

                return Ok(events);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetProjectTasksFullCalendar/{projectId}")]
        [HttpGet]
        public IHttpActionResult GetProjectTasksFullCalendar(int projectId)
        {
            if (projectId <= 0) return BadRequest("project Id must be presented in the request.");
            try
            {
                var originalTasks = projectsService.GetProjectTasks(projectId);
                var projectTasks = originalTasks
                       .Select(t => new
                       {
                           projectId = t.ProjectId,
                           id = t.TaskId,
                           title = t.TaskName,
                           start = t.PlanStartDate.ToString("yyyy-MM-dd"),
                           end = t.PlanEndDate.ToString("yyyy-MM-dd"),
                           url = Url.Route("Default", new { controller = "Projects", action = "ProjectDetails", id = t.ProjectId })
                       })
                       .ToList();

                return Ok(projectTasks);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetProjectRootNodesTreeTable/{projectId}")]
        [HttpGet]
        public IHttpActionResult GetProjectRootNodesTreeTable(int projectId)
        {
            if (projectId <= 0) return BadRequest("project Id must be presented in the request.");
            try
            {
                List<ProjectTasksTreeTable> tasks = new List<ProjectTasksTreeTable>();
                var rootTasks = projectsService
                    .GetProjectTasks(projectId)
                    .Where(p => p.ParentTaskId == null)
                    .Select((t, i) =>
                    {
                        var tt = t.AutoMapObject<ProjectTask, ProjectTasksTreeTable>();
                        tt.DataTTId = (i + 1).ToString();
                        tt.DataTTParentId = string.Empty;
                        return tt;
                    })
                    .ToList();

                foreach (var task in rootTasks)
                {
                    tasks.Add(task);
                    tasks.AddRange(GetSubTreeTasksRecursevly(task.TaskId, task.DataTTId));
                }
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public List<ProjectTasksTreeTable> GetSubTreeTasksRecursevly(int parentTaskId, string parentTTId)
        {
            var childTaskNodes = new List<ProjectTasksTreeTable>();

            var childNodes = projectsService
                .GetTasksByParentTaskId(parentTaskId)
                .Select((t, i) =>
                {
                    var tt = t.AutoMapObject<ProjectTask, ProjectTasksTreeTable>();
                    tt.DataTTId = parentTTId + "-" + (i + 1).ToString();
                    tt.DataTTParentId = parentTTId;
                    return tt;
                })
                .ToList();

            foreach (var child in childNodes)
            {
                childTaskNodes.Add(child);
                childTaskNodes.AddRange(GetSubTreeTasksRecursevly(child.TaskId, child.DataTTId));
            }
            return childTaskNodes;
        }

        [Route("api/ProjectManagement/GetTaskChildTasksTreeTable/{parentTaskId}")]
        [HttpGet]
        public IHttpActionResult GetParentTaskSubTasks(int parentTaskId)
        {
            if (parentTaskId <= 0) return BadRequest("parent Task Id must be presented in the request.");
            try
            {
                var childTasks = projectsService.GetTasksByParentTaskId(parentTaskId);
                return Ok(childTasks);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetTaskDetails/{taskId}")]
        [HttpGet]
        public IHttpActionResult GetTaskDetails(int taskId)
        {
            if (taskId <= 0) return BadRequest("Task Id must be presented in the request.");
            try
            {
                var task = projectsService.GetTask(taskId);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetTemplates")]
        [HttpGet]
        public IHttpActionResult GetTemplates()
        {
            try
            {
                var templates = projectTemplatesService.GetTemplates();
                return Ok(templates);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetProjectsTemplatesTreeTable")]
        [HttpGet]
        public IHttpActionResult GetProjectsTemplatesTreeTable()
        {
            try
            {
                List<TemplateTaskTreeTable> templates = new List<TemplateTaskTreeTable>();
                var rootTemplates = projectTemplatesService
                    .GetTemplates()
                    .Select((t, i) =>
                    {
                        var tt = t.AutoMapObject<ProjectTemplates, TemplateTaskTreeTable>();
                        tt.DataTTId = (i + 1).ToString();
                        tt.DataTTParentId = string.Empty;
                        tt.TemplateId = t.TemplateId;
                        tt.TemplateName = t.TemplateName;
                        tt.TaskName = t.TemplateName;
                        tt.Id = t.TemplateId;
                        return tt;
                    })
                    .ToList();

                foreach (var template in rootTemplates)
                {
                    templates.Add(template);
                    templates.AddRange(GetTemplateRootTasks(template.TemplateId, template.DataTTId));
                    // templates.AddRange(GetTemplateSubTreeTasksRecursevly(template.TemplateId, template.DataTTId));
                }
                return Ok(templates);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public List<TemplateTaskTreeTable> GetTemplateRootTasks(int templateId, string parentTTId)
        {
            var templateTasks = projectTemplatesService
                .GetTasksByTemplateId(templateId)
                .Where(t => t.ParentTaskId == null)
                .Select((t, i) =>
                {
                    var tt = t.AutoMapObject<ProjectTemplateTasks, TemplateTaskTreeTable>();
                    tt.DataTTId = parentTTId + "-" + (i + 1).ToString();
                    tt.DataTTParentId = parentTTId;
                    return tt;
                })
                    .ToList();

            var allTemplateTasks = new List<TemplateTaskTreeTable>();
            foreach (var parentTask in templateTasks)
            {
                allTemplateTasks.Add(parentTask);
                allTemplateTasks.AddRange(GetTemplateSubTreeTasksRecursevly(parentTask.Id, parentTask.DataTTId));
            }

            return allTemplateTasks;
        }
        public List<TemplateTaskTreeTable> GetTemplateSubTreeTasksRecursevly(int parentTemplateTaskId, string parentTTId)
        {
            var childTaskNodes = new List<TemplateTaskTreeTable>();

            var childNodes = projectTemplatesService
                .GetTasksByParentTaskId(parentTemplateTaskId)
                .Select((t, i) =>
                {
                    var tt = t.AutoMapObject<ProjectTemplateTasks, TemplateTaskTreeTable>();
                    tt.DataTTId = parentTTId + "-" + (i + 1).ToString();
                    tt.DataTTParentId = parentTTId;
                    return tt;
                })
                .ToList();

            foreach (var child in childNodes)
            {
                childTaskNodes.Add(child);
                childTaskNodes.AddRange(GetTemplateSubTreeTasksRecursevly(child.Id, child.DataTTId));
            }
            return childTaskNodes;
        }

        [Route("api/ProjectManagement/GetTemplateTasks/{templateId}")]
        [HttpGet]
        public IHttpActionResult GetTemplateTasks(int templateId)
        {
            if (templateId <= 0) return BadRequest("template Id connot be null.");

            var templateTasks = projectTemplatesService
                .GetTasksByTemplateId(templateId)
                .Where(t => t.ParentTaskId == null)
                .Select((t, i) =>
                {
                    var tt = t.AutoMapObject<ProjectTemplateTasks, TemplateTaskTreeTable>();
                    tt.DataTTId = (i + 1).ToString();
                    tt.DataTTParentId = "";
                    return tt;
                })
                    .ToList();

            var allTemplateTasks = new List<TemplateTaskTreeTable>();
            foreach (var parentTask in templateTasks)
            {
                allTemplateTasks.Add(parentTask);
                allTemplateTasks.AddRange(GetTemplateSubTreeTasksRecursevly(parentTask.Id, parentTask.DataTTId));
            }

            return Ok(allTemplateTasks);
        }

        [Route("api/ProjectManagement/PostTemplate")]
        [HttpPost]
        public IHttpActionResult PostTemplate(ProjectTemplates template)
        {
            if (template == null) return BadRequest("template object must be passed in the request body");
            try
            {
                template.CreatedDate = DateTime.Now;
                var templateId = projectTemplatesService.CreateProjectTemplate(template);
                var taskId = projectTemplatesService.CreateTemplateTask(new ProjectTemplateTasks()
                {
                    CreatedDate = DateTime.Now,
                    Description = "Task",
                    IsActive = true,
                    IsMileStone = false,
                    ParentTaskId = null,
                    TaskCode = "Task",
                    TaskName = "Task",
                    TaskDuration = 1,
                    ShortName = "Task",
                    TaskTemplateType = 1,
                    TemplateId = templateId
                });
                return Ok(taskId);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/PutTask")]
        [HttpPut]
        public IHttpActionResult PutTask(ProjectTemplateTasks task)
        {
            if (task == null) return BadRequest("task object must be passed in the request body");
            try
            {
                task.CreatedDate = projectTemplatesService.GetTemplateTask(task.Id).CreatedDate;
                projectTemplatesService.UpdateTemplateTask(task);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/PostTask")]
        [HttpPost]
        public IHttpActionResult PostTask(ProjectTemplateTasks task)
        {
            if (task == null) return BadRequest("task object must be passed in the request body");
            try
            {
                task.CreatedDate = DateTime.Now;
                var taskId = projectTemplatesService.CreateTemplateTask(task);
                return Ok(taskId);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetTasksByTemplateId/{templateId}")]
        [HttpGet]
        public IHttpActionResult GetTasksByTemplateId(int templateId)
        {
            if (templateId <= 0) return BadRequest("template id cannot be found in the request body.");
            try
            {
                return Ok(projectTemplatesService.GetTasksByTemplateId(templateId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetTasksByTemplateIdAndTaskId/{templateId}/{taskId}")]
        [HttpGet]
        public IHttpActionResult GetTasksByTemplateIdAndTaskId(int templateId, int taskId)
        {
            if (templateId <= 0 || taskId <= 0) return BadRequest("template id cannot be found in the request body.");
            try
            {
                return Ok(projectTemplatesService.GetTasksByTemplateId(templateId)
                    .Where(t => t.ParentTaskId != taskId && t.Id != taskId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/GetTemplateTask/{taskId}")]
        [HttpGet]
        public IHttpActionResult GetTemplateTask(int taskId)
        {
            if (taskId <= 0) return BadRequest("Task Id must be presented in the request.");
            try
            {
                var task = projectTemplatesService.GetTemplateTask(taskId);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/ProjectManagement/DeleteTemplateTask/{taskId}")]
        [HttpDelete]
        public IHttpActionResult DeleteTemplateTask(int taskId)
        {
            if (taskId <= 0) return BadRequest("Task Id must be presented in the request.");
            try
            {
                projectTemplatesService.DeleteTemplateTask(taskId);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [Route("api/ProjectManagement/GetProjectKanbanLateTasks/{projectId}")]
        [HttpGet]
        public IHttpActionResult GetProjectKanbanLateTasks(int projectId)
        {
            if (projectId <= 0) return BadRequest("project Id connot be null.");
            var tasks = projectsService.GetProjectLateTasks(projectId);
            return Ok(tasks);
        }

        [Route("api/ProjectManagement/GetProjectKanbanOngoingTasks/{projectId}")]
        [HttpGet]
        public IHttpActionResult GetProjectKanbanOngoingTasks(int projectId)
        {
            if (projectId <= 0) return BadRequest("project Id connot be null.");
            var tasks = projectsService.GetProjectOngoingTasks(projectId);
            return Ok(tasks);
        }

        [Route("api/ProjectManagement/GetProjectKanbanFinishedTasks/{projectId}")]
        [HttpGet]
        public IHttpActionResult GetProjectKanbanFinishedTasks(int projectId)
        {
            if (projectId <= 0) return BadRequest("project Id connot be null.");
            var tasks = projectsService.GetProjectFinishedTasks(projectId);
            return Ok(tasks);
        }

    }
}
