using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.LookupRepos
{
    public class SiteOwnerPaymentAccountsRepository : RepositoryBase<SitesOwnersPaymentsAccount>
    {
        public SiteOwnerPaymentAccountsRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

    }
}
