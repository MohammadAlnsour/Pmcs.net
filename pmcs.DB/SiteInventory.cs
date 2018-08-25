namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("AssetsManagement.SiteInventories")]
    public partial class SiteInventory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SiteInventory()
        {
            SiteInventoryItems = new HashSet<SiteInventoryItem>();
        }

        [Key]
        public int InventoryId { get; set; }

        public int SiteId { get; set; }

        public DateTime? InventoryDate { get; set; }

        [StringLength(100)]
        public string InventoryDoneBy { get; set; }

        [StringLength(300)]
        public string Remarks { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SiteInventoryItem> SiteInventoryItems { get; set; }
    }
}
