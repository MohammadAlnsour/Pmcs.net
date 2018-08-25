using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class ProjectTasksRepository : RepositoryBase<DB.Task>
    {
        public ProjectTasksRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<DB.Task> GetProjectLateTasks(int projectId)
        {
            return DbContext.GetProjectLateTasks(projectId).ToList();
        }
        public IEnumerable<DB.Task> GetProjectOngoingTasks(int projectId)
        {
            return DbContext.GetProjectOngoingTasks(projectId).ToList();
        }
        public IEnumerable<DB.Task> GetProjectFinishedTasks(int projectId)
        {
            return DbContext.GetProjectFinishedTasks(projectId).ToList();
        }

    }
}
