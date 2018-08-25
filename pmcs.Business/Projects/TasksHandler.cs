using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Business.Projects
{
    public static class TasksHandler
    {
        public static void Finish(int taskId)
        {
            if (taskId > 0)
            {
                ProjectsRepository projectsRepository = new ProjectsRepository(new DB.PmcsDbContext());
                ProjectTasksRepository projectTasksRepository = new ProjectTasksRepository(new DB.PmcsDbContext());

                var original = projectTasksRepository.GetById(t => t.TaskId == taskId);
                var newTask = projectTasksRepository.GetById(t => t.TaskId == taskId);
                newTask.CompletionPercentage = 1.00;
                newTask.TaskStatus = 2;
                newTask.TaskComplete = true;
                newTask.ActualEndDate = DateTime.Now;

                projectTasksRepository.Update(original, newTask);

                if (original.ParentTaskId != null)
                {
                    var childrenTasks = projectTasksRepository
                                        .SearchData(t => t.ParentTaskId == original.ParentTaskId)
                                        .ToList();

                    if (childrenTasks.Any() && childrenTasks.All(t => t.TaskComplete == true))
                    {
                        var originalParent = projectTasksRepository.GetById(t => t.TaskId == original.ParentTaskId);
                        var newParentTask = projectTasksRepository.GetById(t => t.TaskId == original.ParentTaskId);
                        newParentTask.CompletionPercentage = 1.00;
                        newParentTask.TaskStatus = 2;
                        newParentTask.TaskComplete = true;
                        projectTasksRepository.Update(originalParent, newParentTask);
                    }
                }
            }
        }
        public static void UpdateTaskActualStartDate(int taskId)
        {
            ProjectTasksRepository projectTasksRepository = new ProjectTasksRepository(new DB.PmcsDbContext());
            var original = projectTasksRepository.GetById(j => j.TaskId == taskId);
            var updated = projectTasksRepository.GetById(j => j.TaskId == taskId);
            updated.ActualStartDate = DateTime.Now;
            projectTasksRepository.Update(original, updated);
        }

    }
}
