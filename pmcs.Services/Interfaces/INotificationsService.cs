using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Shared;
using pmcs.Models;

namespace pmcs.Services.Interfaces
{
    public interface INotificationsService
    {
        IEnumerable<Notification> GetUserUnreadNotificationMessages(int userId);
        int CreateNotification(Notification notification);
    }
}
