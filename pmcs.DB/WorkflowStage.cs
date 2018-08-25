namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Configuration.WorkflowStages")]
    public partial class WorkflowStage
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WorkflowStage()
        {
            InvoicesApprovalWorkflows = new HashSet<InvoicesApprovalWorkflow>();
        }

        [Key]
        public int StageId { get; set; }

        [Required]
        [StringLength(150)]
        public string StageName { get; set; }

        [StringLength(150)]
        public string TrackingEntity { get; set; }

        [StringLength(200)]
        public string TrackingOwner { get; set; }

        public int StageOrderNumber { get; set; }

        public bool? IsLockingStage { get; set; }

        public bool ReferenceNumberRequired { get; set; }

        [StringLength(50)]
        public string AllowedActionsIds { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int? RoleId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InvoicesApprovalWorkflow> InvoicesApprovalWorkflows { get; set; }
    }
}
