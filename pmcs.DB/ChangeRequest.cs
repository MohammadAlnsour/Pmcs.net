namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ChangeManagement.ChangeRequests")]
    public partial class ChangeRequest
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ChangeRequest()
        {
            ChangeApprovalWorkflows = new HashSet<ChangeApprovalWorkflow>();
        }

        [Key]
        public int RequestId { get; set; }

        [Required]
        [StringLength(100)]
        public string RequestNumber { get; set; }

        public int ProjectId { get; set; }

        public int ChangeType { get; set; }

        public int RequestorId { get; set; }

        public int DistrictId { get; set; }

        public int ContractorId { get; set; }

        public int CurrentBudgetCodeId { get; set; }

        public int ProposedBudgetCodeId { get; set; }

        public int StageId { get; set; }

        public int Status { get; set; }

        [StringLength(300)]
        public string RequestorComment { get; set; }

        [StringLength(300)]
        public string CommitteeComment { get; set; }

        [StringLength(100)]
        public string PendingWith { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Budget Budget { get; set; }

        public virtual Budget Budget1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChangeApprovalWorkflow> ChangeApprovalWorkflows { get; set; }

        public virtual ChangeType ChangeType1 { get; set; }

        public virtual Contractor Contractor { get; set; }

        public virtual District District { get; set; }

        public virtual Project Project { get; set; }

        public virtual UsersAccount UsersAccount { get; set; }
    }
}
