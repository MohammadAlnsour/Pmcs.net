using pmcs.DB;
using pmcs.Model.Config;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;

namespace pmcs.Services
{
    public class NotificationsTypesService : INotificationsTypesService
    {
        private readonly NotificationsTypesRepository repository;

        public NotificationsTypesService(NotificationsTypesRepository repository)
        {
            this.repository = repository;
        }
        public NotifiactionsType CreateNotificationType(NotificationTypesModel notificationType)
        {
            try
            {
                var dbNotifiactionsType = new DB.NotifiactionsType()
                {
                    CreatedDate = notificationType.CreatedDate,
                    IsActive = notificationType.IsActive,
                    NotificationText = notificationType.NotificationText,
                    NotificationTypeDescription = notificationType.NotificationTypeDescription,
                    NotificationTypeName = notificationType.NotificationTypeName
                };
                return repository.Insert(dbNotifiactionsType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteNotificationType(NotifiactionsType notificationType)
        {
            try
            {
                repository.Delete(notificationType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<NotificationTypesModel> GetAllNotificationTypes(int maxRows = 1000)
        {
            try
            {
                return repository.GetAll().Select(n => new NotificationTypesModel()
                {
                    CreatedBy = n.CreatedBy,
                    CreatedDate = n.CreatedDate,
                    IsActive = n.IsActive,
                    NotificationText = n.NotificationText,
                    NotificationTypeDescription = n.NotificationTypeDescription,
                    NotificationTypeName = n.NotificationTypeName,
                    TypeId = n.TypeId
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public NotificationTypesModel GetNotificationTypeById(int id)
        {
            NotificationTypesModel notification;
            var dbNotification = repository.GetById(n => n.TypeId == id);
            notification = new NotificationTypesModel()
            {
                TypeId = dbNotification.TypeId,
                NotificationTypeName = dbNotification.NotificationTypeName,
                NotificationTypeDescription = dbNotification.NotificationTypeDescription,
                CreatedBy = dbNotification.CreatedBy,
                CreatedDate = dbNotification.CreatedDate,
                IsActive = dbNotification.IsActive,
                NotificationText = dbNotification.NotificationText
            };
            return notification;
        }

        public IEnumerable<NotificationTypesModel> GetNotificationTypesPaged(int pageNumber, int pageSize)
        {
            int numberOfPages = 1;
            int totalNumberOfRecords = 0;
            return repository.GetPaged(pageSize, pageNumber, "", ref numberOfPages, ref totalNumberOfRecords).Select(n => new NotificationTypesModel()
            {
                CreatedBy = n.CreatedBy,
                CreatedDate = n.CreatedDate,
                IsActive = n.IsActive,
                NotificationText = n.NotificationText,
                NotificationTypeDescription = n.NotificationTypeDescription,
                NotificationTypeName = n.NotificationTypeName,
                TypeId = n.TypeId
            });
        }

        public IEnumerable<NotificationTypesModel> QueryNotificationTypes(Expression<Func<NotifiactionsType, bool>> where)
        {
            return repository.SearchData(where).Select(n => new NotificationTypesModel()
            {
                CreatedBy = n.CreatedBy,
                CreatedDate = n.CreatedDate,
                IsActive = n.IsActive,
                NotificationText = n.NotificationText,
                NotificationTypeDescription = n.NotificationTypeDescription,
                NotificationTypeName = n.NotificationTypeName,
                TypeId = n.TypeId
            });
        }

        public IEnumerable<NotificationTypesModel> QueryNotificationTypesPaged(Expression<Func<NotifiactionsType, bool>> where, int pageNumber, int pageSize)
        {
            return repository.SearchDataPaged(where, pageSize, pageNumber).Select(n => new NotificationTypesModel()
            {
                CreatedBy = n.CreatedBy,
                CreatedDate = n.CreatedDate,
                IsActive = n.IsActive,
                NotificationText = n.NotificationText,
                NotificationTypeDescription = n.NotificationTypeDescription,
                NotificationTypeName = n.NotificationTypeName,
                TypeId = n.TypeId
            });
        }

        public void UpdateNotificationType(NotifiactionsType notificationType)
        {
            var original = repository.GetById(n => n.TypeId == notificationType.TypeId);
            repository.Update(original, notificationType);
        }
        public void UpdateNotificationTypeText(int typeId, string newNotificationText)
        {
            repository.UpdateNotificationText(typeId, newNotificationText);
        }

    }
}
