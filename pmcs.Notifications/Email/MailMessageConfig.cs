using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;
using pmcs.Repository.ConfigRepos;

namespace pmcs.Notifications.Email
{
    public class MailMessageConfig
    {
        private readonly EmailServerSetting settings = new EmailServerSettingsRepository(new DB.PmcsDbContext()).GetAll().FirstOrDefault();

        public string EmailPassword()
        {
            return settings.SenderUserpassword;
        }
        public string EmailUserName()
        {
            return settings.SenderUsername;
        }
        public string FromName()
        {
            return settings.FromName;
        }


        public int PortNumber()
        {
            return settings.Port;
        }
        public string HostName()
        {
            return settings.HostName;
        }
        public bool EnableSSL()
        {
            return settings.EnableSSL;
        }

        public string EmailBody { get; set; }
        public string EmailSubject { get; set; }
        public string[] To { get; set; }

    }
}
