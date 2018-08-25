using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;

namespace pmcs.Services.Interfaces
{
    public interface IProjectsService
    {
        int CreateProject(Project project);
        Project GetProject(int projectId);
        void UpdateProject(Project project);
        IEnumerable<Project> GetProjects();

        int CreateTask(ProjectTask projectTask);
        ProjectTask GetTask(int taskId);
        IEnumerable<ProjectTask> GetTasks();
        IEnumerable<ProjectTask> GetProjectTasks(int projectId);
        void EditTask(ProjectTask task);

        Site GetProjectSite(int projectId);
        IEnumerable<ProjectTask> GetTasksByParentTaskId(int parentTaskId);

        void FinishTaskPercentage(int taskId);
        IEnumerable<ProjectTask> GetProjectLateTasks(int projectId);
        IEnumerable<ProjectTask> GetProjectOngoingTasks(int projectId);
        IEnumerable<ProjectTask> GetProjectFinishedTasks(int projectId);

    }
}
