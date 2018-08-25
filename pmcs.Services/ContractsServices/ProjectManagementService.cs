using pmcs.Model.Contracts;
using pmcs.Repository.ConfigRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Services.ContractsServices
{
    public class ProjectManagementService : IProjectManagementService
    {
        private readonly ProjectTemplatesRepository projectTemplatesRepository;
        private readonly ProjectTemplateTasksRepository projectTemplateTasksRepository;

        public ProjectManagementService(ProjectTemplatesRepository projectTemplatesRepository,
            ProjectTemplateTasksRepository projectTemplateTasksRepository)
        {
            this.projectTemplatesRepository = projectTemplatesRepository;
            this.projectTemplateTasksRepository = projectTemplateTasksRepository;
        }

        public int AddProjectTemplateTask(ProjectTemplateTasks task)
        {
            var re = projectTemplateTasksRepository.Insert(task.AutoMapObject<ProjectTemplateTasks, DB.ProjectTemplateTask>());
            return re.Id;
        }

        public int CreateProjectTemplate(ProjectTemplates projectTemplate)
        {
            var re = projectTemplatesRepository.Insert(projectTemplate.AutoMapObject<ProjectTemplates, DB.ProjectTemplate>());
            return re.TemplateId;
        }

        public void EditProjectTemplate(ProjectTemplates projectTemplate)
        {
            var original = projectTemplatesRepository.GetById(t => t.TemplateId == projectTemplate.TemplateId);
            projectTemplatesRepository.Update(original, projectTemplate.AutoMapObject<ProjectTemplates, DB.ProjectTemplate>());
        }

        public void EditProjectTemplateTask(ProjectTemplateTasks task)
        {
            var original = projectTemplateTasksRepository.GetById(t => t.Id == task.Id);
            projectTemplateTasksRepository.Update(original, task.AutoMapObject<ProjectTemplateTasks, DB.ProjectTemplateTask>());
        }

        public IEnumerable<ProjectTemplates> GetProjectsTemplates()
        {
            return projectTemplatesRepository
                .GetAll()
                .Select(t => t.AutoMapObject<DB.ProjectTemplate, ProjectTemplates>())
                .OrderByDescending(c => c.TemplateId);
        }

        public ProjectTemplates GetProjectTemplateById(int templateId)
        {
            var template = projectTemplatesRepository
                .GetById(t => t.TemplateId == templateId)
                .AutoMapObject<DB.ProjectTemplate, ProjectTemplates>();

            return template;
        }

        public IEnumerable<ProjectTemplateTasks> GetProjectTemplateTasks()
        {
            return projectTemplateTasksRepository
                .GetAll()
                .Select(t => t.AutoMapObject<DB.ProjectTemplateTask, ProjectTemplateTasks>())
                .OrderByDescending(c => c.Id);
        }

        public ProjectTemplateTasks GetProjectTemplateTaskById(int templateId)
        {
            var template = projectTemplateTasksRepository
                .GetById(t => t.TemplateId == templateId)
                .AutoMapObject<DB.ProjectTemplateTask, ProjectTemplateTasks>();

            return template;
        }

        public IEnumerable<ProjectTemplateTasks> GetProjectTemplateTasksByTemplateId(int templateId)
        {
            return projectTemplateTasksRepository
                .SearchData(t => t.TemplateId == templateId)
                .Select(t => t.AutoMapObject<DB.ProjectTemplateTask, ProjectTemplateTasks>())
                .OrderByDescending(c => c.Id);
        }

    }
}
