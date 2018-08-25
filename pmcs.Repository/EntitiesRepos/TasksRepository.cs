using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using pmcs.DB;

namespace pmcs.Repository.EntitiesRepos
{
    public class TasksRepository : RepositoryBase<Task>
    {
        public TasksRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }


    }
}
