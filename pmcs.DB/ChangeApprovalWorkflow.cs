namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ChangeManagement.ChangeApprovalWorkflow")]
    public partial class ChangeApprovalWorkflow
    {
        public int Id { get; set; }

        public int ChangeRequestId { get; set; }

        public int StageId { get; set; }

        public int? Status { get; set; }

        public int? Owner { get; set; }

        public int? RejectionReasonId { get; set; }

        [StringLength(50)]
        public string ReferenceNumber { get; set; }

        public int? SequentialId { get; set; }

        public int? TotalAging { get; set; }

        public int? TotalAgingToCeo { get; set; }

        public int? TotalNumberOfRejections { get; set; }

        [StringLength(300)]
        public string TrackingRemarks { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public bool IsFinished { get; set; }

        [StringLength(100)]
        public string OwnerName { get; set; }

        public DateTime? ProcessedDate { get; set; }

        [StringLength(300)]
        public string Remarks { get; set; }

        public virtual ChangeRequest ChangeRequest { get; set; }

        public virtual ChangeWorkflowStage ChangeWorkflowStage { get; set; }
    }
}
