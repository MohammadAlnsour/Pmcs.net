using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.LookupRepos
{
    public class PATStatusTypesRepository : RepositoryBase<PATStatusType>
    {
        public PATStatusTypesRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

    }
}
