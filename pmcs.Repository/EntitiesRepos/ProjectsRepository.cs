using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.EntitiesRepos
{
    public class ProjectsRepository : RepositoryBase<Project>
    {
        public ProjectsRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
    }
}
