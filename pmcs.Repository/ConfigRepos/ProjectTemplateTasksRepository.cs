using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.ConfigRepos
{
    public class ProjectTemplateTasksRepository : RepositoryBase<ProjectTemplateTask>
    {
        public ProjectTemplateTasksRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

    }
}
