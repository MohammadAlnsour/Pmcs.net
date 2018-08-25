namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TicketManagement.TicketsDiscussions")]
    public partial class TicketsDiscussion
    {
        public int Id { get; set; }

        public int TicketId { get; set; }

        [Required]
        [StringLength(500)]
        public string Comment { get; set; }

        [StringLength(3000)]
        public string Attachment { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Ticket Ticket { get; set; }
    }
}
