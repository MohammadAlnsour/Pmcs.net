using pmcs.Model.Contracts;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;
using pmcs.Core;

namespace pmcs.Services.ContractsServices
{
    public class ProjectTemplatesService : IProjectTemplatesService
    {
        private readonly ProjectTemplatesRepository templatesRepository;
        private readonly ProjectTemplateTasksRepository tasksRepository;

        public ProjectTemplatesService(ProjectTemplatesRepository templatesRepository,
            ProjectTemplateTasksRepository tasksRepository)
        {
            this.templatesRepository = templatesRepository;
            this.tasksRepository = tasksRepository;
        }
        public int CreateProjectTemplate(ProjectTemplates template)
        {
            var res = templatesRepository.Insert(template.AutoMapObject<Model.Contracts.ProjectTemplates, DB.ProjectTemplate>());
            return res.TemplateId;
        }

        public int CreateTemplateTask(ProjectTemplateTasks task)
        {
            var res = tasksRepository.Insert(task.AutoMapObject<ProjectTemplateTasks, DB.ProjectTemplateTask>());
            return res.Id;
        }

        public void DeleteProjectTemplate(int templateId)
        {
            throw new NotImplementedException();
        }

        public void DeleteTemplateTask(int taskId)
        {
            var childTasks = tasksRepository.SearchData(t => t.ParentTaskId == taskId).ToList();
            if(childTasks.Any())
            {
                foreach (var childTask in childTasks)
                {
                    DeleteTemplateTask(childTask.Id);
                }
            }
            var task = tasksRepository.GetById(t => t.Id == taskId);
            tasksRepository.Delete(task);
        }

        public void EditProjectTemplate(ProjectTemplates template)
        {
            var original = templatesRepository.GetById(t => t.TemplateId == template.TemplateId);
            templatesRepository.Update(original, template.AutoMapObject<ProjectTemplates, DB.ProjectTemplate>());
        }

        public ProjectTemplates GetProjectTemplate(int templateId)
        {
            return templatesRepository
                 .GetById(t => t.TemplateId == templateId)
                 .AutoMapObject<DB.ProjectTemplate, ProjectTemplates>();
        }

        public IEnumerable<ProjectTemplateTasks> GetTasks()
        {
            return tasksRepository
                 .GetAll()
                 .Select(t => t.AutoMapObject<DB.ProjectTemplateTask, ProjectTemplateTasks>())
                 .OrderByDescending(c => c.Id);
        }

        public IEnumerable<ProjectTemplateTasks> GetTasksByParentTaskId(int parentTaskId)
        {
            return tasksRepository
                  .SearchData(t => t.ParentTaskId == parentTaskId)
                  .Select(t => t.AutoMapObject<DB.ProjectTemplateTask, ProjectTemplateTasks>())
                  .OrderByDescending(c => c.Id);
        }

        public IEnumerable<ProjectTemplateTasks> GetTasksByTemplateId(int templateId)
        {
            return tasksRepository
                  .SearchData(t => t.TemplateId == templateId)
                  .Select(t => t.AutoMapObject<DB.ProjectTemplateTask, ProjectTemplateTasks>())
                  .OrderByDescending(c => c.Id);
        }

        public IEnumerable<ProjectTemplates> GetTemplates()
        {
            return templatesRepository
                .GetAll()
                .Select(t => t.AutoMapObject<DB.ProjectTemplate, ProjectTemplates>())
                .OrderByDescending(c => c.TemplateId);
        }

        public ProjectTemplateTasks GetTemplateTask(int taskId)
        {
            return tasksRepository
                .GetById(t => t.Id == taskId)
                .AutoMapObject<DB.ProjectTemplateTask, ProjectTemplateTasks>();
        }

        public void UpdateTemplateTask(ProjectTemplateTasks task)
        {
            var original = tasksRepository.GetById(t => t.Id == task.Id);
            tasksRepository.Update(original, task.AutoMapObject<ProjectTemplateTasks, DB.ProjectTemplateTask>());
        }

    }
}
