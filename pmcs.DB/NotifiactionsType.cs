namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Configuration.NotifiactionsTypes")]
    public partial class NotifiactionsType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NotifiactionsType()
        {
            EmailsTemplates = new HashSet<EmailsTemplate>();
        }

        [Key]
        public int TypeId { get; set; }

        [Required]
        [StringLength(150)]
        public string NotificationTypeName { get; set; }

        [StringLength(300)]
        public string NotificationTypeDescription { get; set; }

        [StringLength(4000)]
        public string NotificationText { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmailsTemplate> EmailsTemplates { get; set; }
    }
}
