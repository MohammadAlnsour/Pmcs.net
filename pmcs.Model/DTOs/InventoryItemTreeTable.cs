using pmcs.Repository.LookupRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.DTOs
{
    public class InventoryItemTreeTable
    {
        public string DataTTId { get; set; }
        public string DataTTParentId { get; set; }


        public int ItemId { get; set; }

        public int SiteInventoryId { get; set; }

        public int? ParentItemId { get; set; }

        public int? InventoryCategoryId { get; set; }
        public string CategoryName
        {
            get
            {
                if (this.InventoryCategoryId == null) return string.Empty;
                var res = new InventoryCategoryRepository(new DB.PmcsDbContext()).GetById(c => c.CategoryId == ((int)this.InventoryCategoryId));
                return res.CategoryDescription;
            }
        }

        [Required]
        [StringLength(100)]
        public string ItemDescription { get; set; }

        public double? InventoryQuantity { get; set; }

        public int? ManufacturerId { get; set; }
        public string ManufacturerName
        {
            get
            {
                if (this.ManufacturerId == null) return string.Empty;
                var res = new ManufacturersRepository(new DB.PmcsDbContext()).GetById(c => c.ManufacturerId == ((int)this.ManufacturerId));
                return res.ManufacturerDescription;
            }
        }

        [StringLength(100)]
        public string PartNumber { get; set; }

        [StringLength(100)]
        public string SerialNumber { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

    }
}
