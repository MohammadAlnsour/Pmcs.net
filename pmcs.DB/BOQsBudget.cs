namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.BOQsBudgets")]
    public partial class BOQsBudget
    {
        [Key]
        public int BOQId { get; set; }

        public int? POId { get; set; }

        public int ElementId { get; set; }

        [StringLength(50)]
        public string Description { get; set; }

        public int? ProjectId { get; set; }

        public int? ContractorId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Contractor Contractor { get; set; }

        public virtual Element Element { get; set; }

        public virtual POs POs { get; set; }

        public virtual Project Project { get; set; }
    }
}
