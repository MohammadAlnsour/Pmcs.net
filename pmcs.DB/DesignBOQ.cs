namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.DesignBOQs")]
    public partial class DesignBOQ
    {
        [Key]
        public int DesignId { get; set; }

        public int JobId { get; set; }

        public int CULId { get; set; }

        public double Quantity { get; set; }

        public double FOC { get; set; }

        public double Payable { get; set; }

        public DateTime PATIssueDate { get; set; }

        public bool IsFOC { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual CUL CUL { get; set; }

        public virtual Job Job { get; set; }
    }
}
