using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IProjectManagementService
    {
        int CreateProjectTemplate(ProjectTemplates projectTemplate);
        void EditProjectTemplate(ProjectTemplates projectTemplate);
        IEnumerable<ProjectTemplates> GetProjectsTemplates();
        ProjectTemplates GetProjectTemplateById(int templateId);

        int AddProjectTemplateTask(ProjectTemplateTasks task);
        void EditProjectTemplateTask(ProjectTemplateTasks task);
        IEnumerable<ProjectTemplateTasks> GetProjectTemplateTasks();
        IEnumerable<ProjectTemplateTasks> GetProjectTemplateTasksByTemplateId(int templateId);
        ProjectTemplateTasks GetProjectTemplateTaskById(int templateId);

    }
}
