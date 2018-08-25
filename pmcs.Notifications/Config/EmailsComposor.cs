using pmcs.Models;
using pmcs.Repository.ConfigRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Notifications.Config
{
    internal static class EmailsComposor
    {
        private static readonly EmailTemplatesRepository emailTemplatesRepository = new EmailTemplatesRepository(new DB.PmcsDbContext());

        public static KeyValuePair<string, string> ComposeEmail<T>(NotificationObjectType objectType,
            ActionType actionType, UserAccountModel user, T additionalData)
        {
            var template = emailTemplatesRepository
                .SearchData(t => t.NotificationTypeId == (int)objectType)
                .FirstOrDefault();
            if (template == null)
                return new KeyValuePair<string, string>("Simple Email from Pmcs v1.2 email subject",
                   "<p>Sample Email</p>");

            var replacer = new TemplateReplacer<T>(objectType, user, additionalData);
            var filteredBody = replacer.FilterEmailPlaceHolders(template.TemplateEmailBody);

            return new KeyValuePair<string, string>(template.TempalteEmailSubject,
                   filteredBody);
        }

    }
}
