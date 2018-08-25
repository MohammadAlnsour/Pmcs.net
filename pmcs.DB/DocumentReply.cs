namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DocumentManagement.DocumentReplies")]
    public partial class DocumentReply
    {
        [Key]
        public int ReplyId { get; set; }

        public int DocumentId { get; set; }

        [Required]
        [StringLength(300)]
        public string ReplyDescription { get; set; }

        public int SenderId { get; set; }

        public DateTime SendDate { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Document Document { get; set; }

        public virtual UsersAccount UsersAccount { get; set; }
    }
}
