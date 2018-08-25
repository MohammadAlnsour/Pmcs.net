using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;
using pmcs.Model.Config;
using pmcs.Models;
using pmcs.Notifications.Config;
using pmcs.Notifications.Email;
using pmcs.Repository.EntitiesRepos;
using pmcs.Notifications.System;

namespace pmcs.Notifications
{
    public static class Notification
    {
        // public static event Func<List<UserAccountModel>, NotificationObjectType, IEmailStatus> OnEmailNotification;

        /// <summary>
        /// Sends notifications by emial to a collection of UserAccount objects, the emails tempaltes will be created based on the object type.
        /// </summary>
        /// <param name="notificationReceivers"></param>
        /// <param name="notificationObjectType"></param>
        /// <param name="actionType"></param>
        /// <returns></returns>
        public static MailMessageStatus Email<T>(List<UserAccountModel> notificationReceivers,
                                 NotificationObjectType notificationObjectType,
                                 T additionalData,
                                 ActionType actionType = ActionType.NotSpecified)
        {

            MailMessageStatus status = null;
            foreach (var user in notificationReceivers)
            {
                var emailComposer = EmailsComposor.ComposeEmail(notificationObjectType, actionType, user, additionalData);
                var mailConfig = new MailMessageConfig()
                {
                    EmailBody = emailComposer.Value,
                    EmailSubject = emailComposer.Key,
                    To = new string[] { user.Email }
                };

                var smtp = new SmtpSender(mailConfig);
                status = smtp.SendMail();
            }
            return status;
        }

        /// <summary>
        /// Notifies the users by sending alarms in the system highlighted by red and blue badges at the the top.
        /// </summary>
        /// <param name="notificationReceivers"></param>
        /// <param name="notificationObjectType"></param>
        /// <param name="senderUserId"></param>
        /// <param name="notificationURL"></param>
        /// <param name="actionType"></param>
        public static void System<T>(List<UserAccountModel> notificationReceivers,
            NotificationObjectType notificationObjectType,
            int senderUserId,
            string notificationURL,
            T additionalData,
            ActionType actionType = ActionType.NotSpecified)
        {
            var notificationsRepository = new UsersNotificationsRepository(new DB.PmcsDbContext());
            foreach (var user in notificationReceivers)
            {
                var email = SystemNotificationsComposer.WriteNotification(notificationObjectType, actionType, user, additionalData);
                notificationsRepository.Insert(new DB.UsersNotification()
                {
                    CreatedDate = DateTime.Now,
                    IsActive = true,
                    IsRead = false,
                    NotificationBody = email.Value,
                    NotificationDate = DateTime.Now,
                    NotificationSubject = email.Key,
                    ReceiverUserId = user.UserId,
                    SenderUserId = senderUserId,
                    URL = notificationURL
                });
            }
        }

    }
}
