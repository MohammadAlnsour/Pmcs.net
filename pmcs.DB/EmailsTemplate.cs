namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Configuration.EmailsTemplates")]
    public partial class EmailsTemplate
    {
        [Key]
        public int TemplateId { get; set; }

        public int NotificationTypeId { get; set; }

        [Required]
        [StringLength(300)]
        public string TempalteEmailSubject { get; set; }

        [Column(TypeName = "ntext")]
        [Required]
        public string TemplateEmailBody { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual NotifiactionsType NotifiactionsType { get; set; }
    }
}
