using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using pmcs.Model.Contracts;

namespace pmcs.Services.Interfaces
{
    public interface ITasksService
    {
        int CreateTask(Task task);
        void EditTask(Task task);
        IEnumerable<Task> GetTasksByProjectId(int projectId);
        Task GetTask(int taskId);
        IEnumerable<Task> GetTasks();

    }
}
