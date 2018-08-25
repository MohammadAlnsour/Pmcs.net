namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.LeasePaymentTransactionApprovalWorkflow")]
    public partial class LeasePaymentTransactionApprovalWorkflow
    {
        public int Id { get; set; }

        public int LeaseId { get; set; }

        public int? TransactionId { get; set; }

        public int StageId { get; set; }

        public DateTime ReceivedDate { get; set; }

        public DateTime? ProcessedDate { get; set; }

        public int? Status { get; set; }

        public int? RejectionReasonId { get; set; }

        [StringLength(100)]
        public string OwnerName { get; set; }

        [StringLength(50)]
        public string Duration { get; set; }

        [StringLength(50)]
        public string ReferenceNumber { get; set; }

        [StringLength(300)]
        public string Remarks { get; set; }

        [StringLength(50)]
        public string SequentialId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public bool IsFinished { get; set; }

        public virtual LeaseContract LeaseContract { get; set; }

        public virtual WorkflowRejectionReason WorkflowRejectionReason { get; set; }
    }
}
