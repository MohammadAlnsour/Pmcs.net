namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.JobsOIL")]
    public partial class JobsOIL
    {
        [Key]
        public int OILId { get; set; }

        public int JobId { get; set; }

        public int OILStatus { get; set; }

        public DateTime? OILClearedDate { get; set; }

        [StringLength(300)]
        public string OILDescription { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Job Job { get; set; }
    }
}
