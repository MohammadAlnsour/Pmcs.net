namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.CULs")]
    public partial class CUL
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CUL()
        {
            AsBuilts = new HashSet<AsBuilt>();
            CULGroupCULs = new HashSet<CULGroupCUL>();
            DesignBOQs = new HashSet<DesignBOQ>();
        }

        public int CULId { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; }

        [StringLength(300)]
        public string Description { get; set; }

        public double UnitPrice { get; set; }

        public double? Discount { get; set; }

        [StringLength(100)]
        public string UnitOfMeasure { get; set; }

        [StringLength(100)]
        public string Remarks { get; set; }

        [StringLength(20)]
        public string UniqueId { get; set; }

        public int? CULGroupId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AsBuilt> AsBuilts { get; set; }

        public virtual CULGroup CULGroup { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CULGroupCUL> CULGroupCULs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DesignBOQ> DesignBOQs { get; set; }
    }
}
