using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.ConfigRepos
{
    public class EmailTemplatesRepository : RepositoryBase<EmailsTemplate>
    {
        public EmailTemplatesRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
    }
}
