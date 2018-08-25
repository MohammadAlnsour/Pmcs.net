namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TicketManagement.Tickets")]
    public partial class Ticket
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Ticket()
        {
            TicketsDiscussions = new HashSet<TicketsDiscussion>();
            TicketsHistories = new HashSet<TicketsHistory>();
        }

        public int TicketId { get; set; }

        public int ModuleId { get; set; }

        [Required]
        [StringLength(150)]
        public string TicketSubject { get; set; }

        [StringLength(300)]
        public string Description { get; set; }

        public int SeverityId { get; set; }

        [Required]
        [StringLength(50)]
        public string TicketNumber { get; set; }

        [StringLength(100)]
        public string Stage { get; set; }

        public int PriorityId { get; set; }

        public int Status { get; set; }

        public int AssignedTo { get; set; }

        public int OwnerId { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? SLADueDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual SystemModule SystemModule { get; set; }

        public virtual UsersAccount UsersAccount { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TicketsDiscussion> TicketsDiscussions { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TicketsHistory> TicketsHistories { get; set; }
    }
}
