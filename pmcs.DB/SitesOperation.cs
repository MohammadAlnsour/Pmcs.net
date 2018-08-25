namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.SitesOperations")]
    public partial class SitesOperation
    {
        [Key]
        public int OperationId { get; set; }

        public int SiteId { get; set; }

        public int? OperationCenterId { get; set; }

        public bool? SiteRent { get; set; }

        public bool? E1Rent { get; set; }

        public bool? PowerSharingRent { get; set; }

        [StringLength(200)]
        public string OMCDisplay { get; set; }

        [StringLength(100)]
        public string BSCName { get; set; }

        public int? PowerTypeId { get; set; }

        public int? SiteAccessibilityId { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }
    }
}
