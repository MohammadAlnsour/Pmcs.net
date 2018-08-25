using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;
using pmcs.Model.Shared;
using pmcs.Core;
using pmcs.DB;

namespace pmcs.Services.SharedServices
{
    public class NotificationsService : INotificationsService
    {
        private readonly NotificationsRepository notificationsRepository;

        public NotificationsService(NotificationsRepository notificationsRepository)
        {
            this.notificationsRepository = notificationsRepository;
        }

        public int CreateNotification(Notification notification)
        {
            if (notification == null) throw new ArgumentNullException("notification");
            var res = notificationsRepository.Insert(notification.AutoMapObject<Notification, UsersNotification>());
            return res.NotificationId;
        }

        public IEnumerable<Notification> GetUserUnreadNotificationMessages(int userId)
        {
            return notificationsRepository
                .GetUserUnreadNotifications(userId)
                .Select(n => n.AutoMapObject<UsersNotification, Notification>());
        }
    }
}
