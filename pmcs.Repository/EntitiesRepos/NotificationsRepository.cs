using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.EntitiesRepos
{
    public class NotificationsRepository : RepositoryBase<UsersNotification>
    {
        public NotificationsRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<UsersNotification> GetUserUnreadNotifications(int userId)
        {
            var notifications = DbContext.GetUserUnReadNotifications(userId).ToList();
            return notifications;
        }

    }
}
