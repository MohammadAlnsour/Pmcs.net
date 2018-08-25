using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;
using pmcs.Model;
using pmcs.Model.Config;

namespace pmcs.Services.Interfaces
{
    public interface INotificationsTypesService
    {
        NotifiactionsType CreateNotificationType(NotificationTypesModel notificationType);
        void UpdateNotificationType(DB.NotifiactionsType notificationType);
        void DeleteNotificationType(DB.NotifiactionsType notificationType);
        IEnumerable<NotificationTypesModel> GetAllNotificationTypes(int maxRows = 1000);
        NotificationTypesModel GetNotificationTypeById(int id);
        IEnumerable<NotificationTypesModel> GetNotificationTypesPaged(int pageNumber, int pageSize);
        IEnumerable<NotificationTypesModel> QueryNotificationTypes(Expression<Func<DB.NotifiactionsType, bool>> where);
        IEnumerable<NotificationTypesModel> QueryNotificationTypesPaged(Expression<Func<DB.NotifiactionsType, bool>> where, int pageNumber, int pageSize);
        void UpdateNotificationTypeText(int typeId, string newNotificationText);

    }
}
