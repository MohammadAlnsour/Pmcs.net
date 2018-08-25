namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Logs.ErrorLogs")]
    public partial class ErrorLog
    {
        [Key]
        public int ErrorId { get; set; }

        [Required]
        [StringLength(100)]
        public string Host { get; set; }

        [Required]
        [StringLength(50)]
        public string Type { get; set; }

        [Required]
        [StringLength(50)]
        public string Source { get; set; }

        [Required]
        [StringLength(500)]
        public string Message { get; set; }

        [Required]
        [StringLength(100)]
        public string User { get; set; }

        [StringLength(20)]
        public string StatusCode { get; set; }

        public DateTime ErrorDate { get; set; }

        [Required]
        [StringLength(1500)]
        public string StackTrace { get; set; }
    }
}
