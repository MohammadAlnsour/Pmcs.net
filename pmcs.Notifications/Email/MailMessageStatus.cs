using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Notifications.Email
{
    public class MailMessageStatus
    {
        public string ResponseString { get; set; }
        public bool IsSuccessful { get; set; }
        public SmtpStatusCode StatusCode { get; set; }
        public string[] FailedReciepients { get; set; }

    }
}
