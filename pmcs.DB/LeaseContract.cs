namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.LeaseContracts")]
    public partial class LeaseContract
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LeaseContract()
        {
            LeasePaymentTransactionApprovalWorkflows = new HashSet<LeasePaymentTransactionApprovalWorkflow>();
            LeasePaymentTransactions = new HashSet<LeasePaymentTransaction>();
        }

        [Key]
        public int ContractId { get; set; }

        [Required]
        [StringLength(100)]
        public string LeaseContractNumber { get; set; }

        public DateTime LeaseStartDate { get; set; }

        public DateTime LeaseEndDate { get; set; }

        [StringLength(15)]
        public string LeaseDuration { get; set; }

        public int PaymentFrequency { get; set; }

        public int? NumberOfPayments { get; set; }

        public decimal? AmountPerPayment { get; set; }

        [Required]
        [StringLength(100)]
        public string PRNumber { get; set; }

        public int SiteOwnerId { get; set; }

        public bool? IsLocked { get; set; }

        public decimal? TotalLeaseAmount { get; set; }

        public DateTime PRReservationDate { get; set; }

        public DateTime? PREnteredDate { get; set; }

        public DateTime? PRApprovedDate { get; set; }

        [StringLength(50)]
        public string PONumber { get; set; }

        public DateTime? PODate { get; set; }

        public decimal? POValue { get; set; }

        public decimal? Balance { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [StringLength(50)]
        public string SitesIds { get; set; }

        public virtual SitesOwner SitesOwner { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LeasePaymentTransactionApprovalWorkflow> LeasePaymentTransactionApprovalWorkflows { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LeasePaymentTransaction> LeasePaymentTransactions { get; set; }
    }
}
