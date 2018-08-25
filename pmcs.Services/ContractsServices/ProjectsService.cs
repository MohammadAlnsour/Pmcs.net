using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;
using pmcs.Business.Projects;

namespace pmcs.Services.ContractsServices
{
    public class ProjectsService : IProjectsService
    {
        private readonly ProjectsRepository projectsRepository;
        private readonly ProjectTasksRepository projectTasksRepository;
        private readonly SitesRepository sitesRepository;

        public ProjectsService(ProjectsRepository projectsRepository,
            ProjectTasksRepository projectTasksRepository,
            SitesRepository sitesRepository)
        {
            this.projectsRepository = projectsRepository;
            this.projectTasksRepository = projectTasksRepository;
            this.sitesRepository = sitesRepository;
        }

        public int CreateProject(Project project)
        {
            var res = projectsRepository.Insert(project.AutoMapObject<Project, DB.Project>());
            return res.ProjectId;
        }
        public Project GetProject(int projectId)
        {
            var dbProject = projectsRepository.GetById(p => p.ProjectId == projectId);
            return dbProject.AutoMapObject<DB.Project, Project>();
        }
        public IEnumerable<Project> GetProjects()
        {
            return projectsRepository
                .GetAll()
                .Select(p => p.AutoMapObject<DB.Project, Project>())
                .OrderByDescending(p => p.ProjectId);
        }
        public void UpdateProject(Project project)
        {
            var original = projectsRepository.GetById(p => p.ProjectId == project.ProjectId);
            projectsRepository.Update(original, project.AutoMapObject<Project, DB.Project>());
        }

        public int CreateTask(ProjectTask projectTask)
        {
            var res = projectTasksRepository.Insert(projectTask.AutoMapObject<ProjectTask, DB.Task>());
            return res.TaskId;
        }
        public ProjectTask GetTask(int taskId)
        {
            return projectTasksRepository
                 .GetById(t => t.TaskId == taskId)
                 .AutoMapObject<DB.Task, ProjectTask>();
        }
        public IEnumerable<ProjectTask> GetTasks()
        {
            return projectTasksRepository
                 .GetAll()
                 .Select(t => t.AutoMapObject<DB.Task, ProjectTask>());
        }

        public IEnumerable<ProjectTask> GetTasksByParentTaskId(int parentTaskId)
        {
            return projectTasksRepository
                 .SearchData(p => p.ParentTaskId == parentTaskId)
                 .Select(t => t.AutoMapObject<DB.Task, ProjectTask>());
        }
        public IEnumerable<ProjectTask> GetProjectTasks(int projectId)
        {
            return projectTasksRepository
                 .SearchData(p => p.ProjectId == projectId)
                 .Select(t => t.AutoMapObject<DB.Task, ProjectTask>());
        }
        public void EditTask(ProjectTask task)
        {
            var original = projectTasksRepository.GetById(t => t.TaskId == task.TaskId);
            projectTasksRepository.Update(original, task.AutoMapObject<ProjectTask, DB.Task>());
        }

        public void FinishTaskPercentage(int taskId)
        {
            TasksHandler.Finish(taskId);
        }

        public Site GetProjectSite(int projectId)
        {
            var siteId = projectsRepository.GetById(p => p.ProjectId == projectId).SiteId;
            return sitesRepository.GetById(s => s.SiteId == siteId).AutoMapObject<DB.Site, Site>();
        }

        public IEnumerable<ProjectTask> GetProjectLateTasks(int projectId)
        {
            return projectTasksRepository
                .GetProjectLateTasks(projectId)
                .Select(t => t.AutoMapObject<DB.Task, ProjectTask>());
        }
        public IEnumerable<ProjectTask> GetProjectOngoingTasks(int projectId)
        {
            return projectTasksRepository
                .GetProjectOngoingTasks(projectId)
                .Select(t => t.AutoMapObject<DB.Task, ProjectTask>());
        }
        public IEnumerable<ProjectTask> GetProjectFinishedTasks(int projectId)
        {
            return projectTasksRepository
                .GetProjectFinishedTasks(projectId)
                .Select(t => t.AutoMapObject<DB.Task, ProjectTask>());
        }

    }
}
