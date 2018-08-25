namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.DismantleRequests")]
    public partial class DismantleRequest
    {
        [Key]
        public int RequestId { get; set; }

        public int SiteId { get; set; }

        [StringLength(200)]
        public string CWModel { get; set; }

        public DateTime DismantleDate { get; set; }

        public DateTime? OnAirDate { get; set; }

        [StringLength(500)]
        public string ReasonOfDismantle { get; set; }

        [StringLength(500)]
        public string Remarks { get; set; }

        [StringLength(50)]
        public string UniqueDismantleKey { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Site Site { get; set; }
    }
}
