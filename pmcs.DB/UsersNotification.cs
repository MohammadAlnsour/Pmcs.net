namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SecurityRoles.UsersNotifications")]
    public partial class UsersNotification
    {
        [Key]
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

        public virtual UsersAccount UsersAccount { get; set; }

        public virtual UsersAccount UsersAccount1 { get; set; }
    }
}
