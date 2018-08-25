using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class AsBuiltRepository : RepositoryBase<AsBuilt>
    {
        public AsBuiltRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
    }
}
