namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.AsBuilt")]
    public partial class AsBuilt
    {
        public int Id { get; set; }

        public int JobId { get; set; }

        public int CULId { get; set; }

        public bool? Auto { get; set; }

        public double Quantity { get; set; }

        public bool FOC { get; set; }

        public double Payable { get; set; }

        public double FOCAmount { get; set; }

        [StringLength(100)]
        public string Category { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual CUL CUL { get; set; }

        public virtual Job Job { get; set; }
    }
}
