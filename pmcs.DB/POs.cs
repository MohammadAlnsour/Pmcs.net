namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.POs")]
    public partial class POs
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public POs()
        {
            BOQsBudgets = new HashSet<BOQsBudget>();
            ElementsDiscounts = new HashSet<ElementsDiscount>();
            Invoices = new HashSet<Invoice>();
            Jobs = new HashSet<Job>();
            JobsExpenses = new HashSet<JobsExpens>();
        }

        [Key]
        public int PoId { get; set; }

        public int ProjectId { get; set; }

        [Required]
        [StringLength(50)]
        public string PONumber { get; set; }

        public decimal? PoGross { get; set; }

        public decimal? PoNet { get; set; }

        public decimal? FOCGross { get; set; }

        public int? CurrencyId { get; set; }

        public decimal? PoUSDRate { get; set; }

        public int? PaymentTermsDays { get; set; }

        public int ContractorId { get; set; }

        public int? CapitilazationMilestoneId { get; set; }

        public DateTime? PODate { get; set; }

        public int CULGroupId { get; set; }

        public DateTime? ImplementationEndDate { get; set; }

        [StringLength(400)]
        public string Remarks { get; set; }

        public bool? ShowInReports { get; set; }

        public int POClassificationId { get; set; }

        public int POStatus { get; set; }

        public int? POPayableTypeId { get; set; }

        public bool? FOCInGross { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int? ProjectTaskId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BOQsBudget> BOQsBudgets { get; set; }

        public virtual Contractor Contractor { get; set; }

        public virtual CULGroup CULGroup { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ElementsDiscount> ElementsDiscounts { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Invoice> Invoices { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Job> Jobs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobsExpens> JobsExpenses { get; set; }

        public virtual Currency Currency { get; set; }

        public virtual POClassification POClassification { get; set; }

        public virtual POsPayableType POsPayableType { get; set; }

        public virtual Project Project { get; set; }
    }
}
