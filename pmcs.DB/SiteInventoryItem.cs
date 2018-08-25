namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("AssetsManagement.SiteInventoryItems")]
    public partial class SiteInventoryItem
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SiteInventoryItem()
        {
            SiteInventoryItems1 = new HashSet<SiteInventoryItem>();
        }

        [Key]
        public int ItemId { get; set; }

        public int SiteInventoryId { get; set; }

        public int? ParentItemId { get; set; }

        public int? InventoryCategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string ItemDescription { get; set; }

        public double? InventoryQuantity { get; set; }

        public int? ManufacturerId { get; set; }

        [StringLength(100)]
        public string PartNumber { get; set; }

        [StringLength(100)]
        public string SerialNumber { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual InventoriesCategory InventoriesCategory { get; set; }

        public virtual Manufacturer Manufacturer { get; set; }

        public virtual SiteInventory SiteInventory { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SiteInventoryItem> SiteInventoryItems1 { get; set; }

        public virtual SiteInventoryItem SiteInventoryItem1 { get; set; }
    }
}
