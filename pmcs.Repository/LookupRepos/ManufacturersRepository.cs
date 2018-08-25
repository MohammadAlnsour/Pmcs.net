using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.LookupRepos
{
    public class ManufacturersRepository : RepositoryBase<Manufacturer>
    {
        public ManufacturersRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
    }
}
