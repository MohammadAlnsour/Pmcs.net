using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.LookupRepos
{
    public class JobTypesRepository : RepositoryBase<JobsType>
    {
        public JobTypesRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

    }
}
