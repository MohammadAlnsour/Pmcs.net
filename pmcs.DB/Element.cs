namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.Elements")]
    public partial class Element
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Element()
        {
            BOQsBudgets = new HashSet<BOQsBudget>();
            ElementsDiscounts = new HashSet<ElementsDiscount>();
            Jobs = new HashSet<Job>();
        }

        public int ElementId { get; set; }

        [StringLength(300)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string ElementName { get; set; }

        [StringLength(50)]
        public string ElementName2 { get; set; }

        [StringLength(50)]
        public string Level2 { get; set; }

        [StringLength(100)]
        public string UniqueId { get; set; }

        [StringLength(50)]
        public string Level1 { get; set; }

        public long? SortKey { get; set; }

        public long? MaxCULKey { get; set; }

        public int? ContractorId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BOQsBudget> BOQsBudgets { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ElementsDiscount> ElementsDiscounts { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Job> Jobs { get; set; }
    }
}
