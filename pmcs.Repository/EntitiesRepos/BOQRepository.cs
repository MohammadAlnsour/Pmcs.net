using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class BOQRepository : RepositoryBase<DesignBOQ>
    {
        public BOQRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

    }
}
