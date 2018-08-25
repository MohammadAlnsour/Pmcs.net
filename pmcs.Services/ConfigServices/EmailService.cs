using pmcs.Model.Config;
using pmcs.Repository.ConfigRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Services.ConfigServices
{
    public class EmailService : IEmailService
    {
        private readonly EmailServerSettingsRepository emailServerSettingsRepository;
        private readonly EmailTemplatesRepository emailTemplatesRepository;

        public EmailService(EmailServerSettingsRepository emailServerSettingsRepository,
            EmailTemplatesRepository emailTemplatesRepository)
        {
            this.emailServerSettingsRepository = emailServerSettingsRepository;
            this.emailTemplatesRepository = emailTemplatesRepository;
        }
        public int CreateEmailServerSettings(EmailServerSetting emailSettings)
        {
            return emailServerSettingsRepository.Insert(emailSettings.AutoMapObject<EmailServerSetting, DB.EmailServerSetting>()).ConfigurationId;
        }

        public int CreateEmailTemplate(EmailsTemplate emailTemplate)
        {
            return emailTemplatesRepository.Insert(emailTemplate.AutoMapObject<EmailsTemplate, DB.EmailsTemplate>()).TemplateId;
        }

        public IEnumerable<EmailsTemplate> GetAllEmailTemplates()
        {
            return emailTemplatesRepository
                .GetAll()
                .Select(t => t.AutoMapObject<DB.EmailsTemplate, EmailsTemplate>());
        }

        public IEnumerable<EmailServerSetting> GetEmailServerSettings()
        {
            return emailServerSettingsRepository
                .GetAll()
                .Select(s => s.AutoMapObject<DB.EmailServerSetting, EmailServerSetting>());
        }

        public EmailsTemplate GetEmailTemplate(int templateId)
        {
            return emailTemplatesRepository
                 .GetById(t => t.TemplateId == templateId)
                 .AutoMapObject<DB.EmailsTemplate, EmailsTemplate>();
        }

        public EmailsTemplate GetEmailTemplateByNotificationType(int notificationType)
        {
            return emailTemplatesRepository
                .SearchData(t => t.NotificationTypeId == notificationType)
                .Select(t => t.AutoMapObject<DB.EmailsTemplate, EmailsTemplate>())
                .SingleOrDefault();
        }

        public void UpdateEmailServerSettings(EmailServerSetting emailSettings)
        {
            var original = emailServerSettingsRepository.GetById(e => e.ConfigurationId == emailSettings.ConfigurationId);
            emailServerSettingsRepository.Update(original, emailSettings.AutoMapObject<EmailServerSetting, DB.EmailServerSetting>());
        }

        public void UpdateEmailTemplate(EmailsTemplate emailsTemplate)
        {
            var original = emailTemplatesRepository.GetById(t => t.TemplateId == emailsTemplate.TemplateId);
            emailTemplatesRepository.Update(original, emailsTemplate.AutoMapObject<EmailsTemplate, DB.EmailsTemplate>());
        }

    }
}
