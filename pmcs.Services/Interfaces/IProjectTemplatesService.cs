using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;

namespace pmcs.Services.Interfaces
{
    public interface IProjectTemplatesService
    {
        int CreateProjectTemplate(ProjectTemplates template);
        void EditProjectTemplate(ProjectTemplates template);
        void DeleteProjectTemplate(int templateId);
        IEnumerable<ProjectTemplates> GetTemplates();
        ProjectTemplates GetProjectTemplate(int templateId);


        int CreateTemplateTask(ProjectTemplateTasks task);
        void UpdateTemplateTask(ProjectTemplateTasks task);
        void DeleteTemplateTask(int taskId);
        IEnumerable<ProjectTemplateTasks> GetTasksByTemplateId(int templateId);
        IEnumerable<ProjectTemplateTasks> GetTasksByParentTaskId(int parentTaskId);
        IEnumerable<ProjectTemplateTasks> GetTasks();
        ProjectTemplateTasks GetTemplateTask(int taskId);


    }
}
