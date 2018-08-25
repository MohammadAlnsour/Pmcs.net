using pmcs.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Notifications
{
    public interface INotifiable
    {
        string Subject { get; set; }
        string Details { get; set; }
        string UserName { get; set; }
        DateTime NotificationDate { get; set; }
        string URL { get; set; }
        string Sender { get; set; }

        string SenderEmail { get; set; }
        string RecieversEmails { get; set; }

        NotificationsTypes NotificationType { get; set; }
        bool IsRead { get; set; }



    }
}
