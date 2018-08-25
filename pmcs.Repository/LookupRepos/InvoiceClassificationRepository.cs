using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.LookupRepos
{
    public class InvoiceClassificationRepository : RepositoryBase<InvoicesClassificationType>
    {
        public InvoiceClassificationRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
    }
}
