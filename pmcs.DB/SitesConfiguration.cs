namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.SitesConfiguration")]
    public partial class SitesConfiguration
    {
        [Key]
        public int ConfigurationId { get; set; }

        public int SiteId { get; set; }

        public int VendorId { get; set; }

        [StringLength(100)]
        public string RSL { get; set; }

        [StringLength(100)]
        public string ILA { get; set; }

        public int? ShelterTypeId { get; set; }

        [StringLength(100)]
        public string BRConfig { get; set; }

        public int? BRsInService { get; set; }

        public int? QuadBRs { get; set; }

        public double? iSCStatus { get; set; }

        public int? StructureTypeId { get; set; }

        public double? NumberOfRFRacks { get; set; }

        [StringLength(150)]
        public string CellId { get; set; }

        [StringLength(150)]
        public string DLA { get; set; }

        public double? NumberOfSectors { get; set; }

        public double? BRsEquipped { get; set; }

        public double? LegacyBRs { get; set; }

        public double? iSCStatusActive { get; set; }

        [StringLength(150)]
        public string BOTAssignment { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Site Site { get; set; }

        public virtual ShelterType ShelterType { get; set; }

        public virtual StructuresType StructuresType { get; set; }

        public virtual Vendor Vendor { get; set; }
    }
}
