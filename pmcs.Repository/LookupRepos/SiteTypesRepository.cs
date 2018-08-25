using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.LookupRepos
{
    public class SiteTypesRepository : RepositoryBase<SitesType>
    {
        public SiteTypesRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

    }
}
