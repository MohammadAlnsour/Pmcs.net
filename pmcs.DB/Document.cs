namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DocumentManagement.Documents")]
    public partial class Document
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Document()
        {
            DocumentReplies = new HashSet<DocumentReply>();
        }

        public int DocumentId { get; set; }

        [Required]
        [StringLength(100)]
        public string DocSubject { get; set; }

        [StringLength(300)]
        public string DocDescription { get; set; }

        public int SenderId { get; set; }

        public int ReceiverId { get; set; }

        public int? CopyToId1 { get; set; }

        public int? CopyToId2 { get; set; }

        public int? CopyToId3 { get; set; }

        public DateTime SendDate { get; set; }

        public int DocumentType { get; set; }

        [StringLength(1500)]
        public string DocumentPath { get; set; }

        public int DocumentStatus { get; set; }

        public bool IsRead { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DocumentReply> DocumentReplies { get; set; }

        public virtual UsersAccount UsersAccount { get; set; }

        public virtual UsersAccount UsersAccount1 { get; set; }

        public virtual UsersAccount UsersAccount2 { get; set; }

        public virtual UsersAccount UsersAccount3 { get; set; }

        public virtual UsersAccount UsersAccount4 { get; set; }
    }
}
