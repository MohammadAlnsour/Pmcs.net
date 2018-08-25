using pmcs.Model.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IEmailService
    {
        int CreateEmailServerSettings(EmailServerSetting emailSettings);
        void UpdateEmailServerSettings(EmailServerSetting emailSettings);
        IEnumerable<EmailServerSetting> GetEmailServerSettings();

        int CreateEmailTemplate(EmailsTemplate emailTemplate);
        void UpdateEmailTemplate(EmailsTemplate emailsTemplate);
        IEnumerable<EmailsTemplate> GetAllEmailTemplates();
        EmailsTemplate GetEmailTemplate(int templateId);
        EmailsTemplate GetEmailTemplateByNotificationType(int notificationType);

    }
}
