namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Configuration.EmailServerSettings")]
    public partial class EmailServerSetting
    {
        [Key]
        public int ConfigurationId { get; set; }

        [Required]
        [StringLength(150)]
        public string HostName { get; set; }

        [Required]
        [StringLength(50)]
        public string FromName { get; set; }

        public int Port { get; set; }

        [Required]
        [StringLength(100)]
        public string SenderUsername { get; set; }

        [Required]
        [StringLength(100)]
        public string SenderUserpassword { get; set; }

        public bool EnableSSL { get; set; }

        public int ServerType { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }
    }
}
