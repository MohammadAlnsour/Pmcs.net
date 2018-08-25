namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.ElementsDiscounts")]
    public partial class ElementsDiscount
    {
        [Key]
        public int DiscountId { get; set; }

        public int? ElementId { get; set; }

        public int POId { get; set; }

        public double? Discount { get; set; }

        public double? SPDiscount { get; set; }

        public bool? Verify { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Element Element { get; set; }

        public virtual POs POs { get; set; }
    }
}
