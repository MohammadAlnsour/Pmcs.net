using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Services.ContractsServices
{
    public class TasksService : ITasksService
    {
        private readonly TasksRepository tasksRepository;
        public TasksService(TasksRepository tasksRepository)
        {
            this.tasksRepository = tasksRepository;
        }

        public int CreateTask(Model.Contracts.Task task)
        {
            var res = tasksRepository.Insert(task.AutoMapObject<Model.Contracts.Task, DB.Task>());
            return res.TaskId;
        }

        public void EditTask(Model.Contracts.Task task)
        {
            var original = tasksRepository.GetById(t => t.TaskId == task.TaskId);
            tasksRepository.Update(original, task.AutoMapObject<Model.Contracts.Task, DB.Task>());
        }

        public Model.Contracts.Task GetTask(int taskId)
        {
            var res = tasksRepository.GetById(t => t.TaskId == taskId);
            return res.AutoMapObject<DB.Task, Model.Contracts.Task>();
        }

        public IEnumerable<Model.Contracts.Task> GetTasks()
        {
            return tasksRepository
                 .GetAll()
                 .Select(t => t.AutoMapObject<DB.Task, Model.Contracts.Task>())
                 .OrderByDescending(c => c.TaskId);
        }

        public IEnumerable<Model.Contracts.Task> GetTasksByProjectId(int projectId)
        {
            return tasksRepository
                 .SearchData(t => t.ProjectId == projectId)
                 .Select(t => t.AutoMapObject<DB.Task, Model.Contracts.Task>())
                 .OrderByDescending(c => c.TaskId);
        }

    }
}
