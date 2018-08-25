namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Lookup.WorkflowRejectionReasons")]
    public partial class WorkflowRejectionReason
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WorkflowRejectionReason()
        {
            InvoicesApprovalWorkflows = new HashSet<InvoicesApprovalWorkflow>();
            LeasePaymentTransactionApprovalWorkflows = new HashSet<LeasePaymentTransactionApprovalWorkflow>();
        }

        [Key]
        public int ReasonId { get; set; }

        [Required]
        [StringLength(150)]
        public string RejectionReason { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InvoicesApprovalWorkflow> InvoicesApprovalWorkflows { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LeasePaymentTransactionApprovalWorkflow> LeasePaymentTransactionApprovalWorkflows { get; set; }
    }
}
