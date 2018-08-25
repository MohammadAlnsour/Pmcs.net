using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Config
{
    class UsersNotifications
    {
        public int NotificationId { get; set; }

        public int ReceiverUserId { get; set; }

        public int? SenderUserId { get; set; }

        [Required]
        [StringLength(100)]
        public string NotificationSubject { get; set; }

        [Required]
        [StringLength(250)]
        public string NotificationBody { get; set; }

        [StringLength(800)]
        public string URL { get; set; }

        public bool IsRead { get; set; }

        public DateTime NotificationDate { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

    }
}
