using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;

namespace pmcs.Model.Shared
{
    public class Notification
    {
        public int NotificationId { get; set; }

        public int ReceiverUserId { get; set; }
        public string ReceiverUserName
        {
            get
            {
                var user = new UsersAccountsRepository(new DB.PmcsDbContext()).GetById(u => u.UserId == this.ReceiverUserId);
                return user.FullName;
            }
        }

        public int? SenderUserId { get; set; }

        public string SenderUserName
        {
            get
            {
                if (this.SenderUserId != null)
                {
                    var user = new UsersAccountsRepository(new DB.PmcsDbContext()).GetById(u => u.UserId == this.SenderUserId);
                    return user.FullName;
                }
                return string.Empty;
            }
        }

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
        public string NotificationDateString { get { return this.NotificationDate.ToShortDateString(); } }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }



    }
}
