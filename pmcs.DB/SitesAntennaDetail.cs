namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.SitesAntennaDetails")]
    public partial class SitesAntennaDetail
    {
        public int? AntennaId { get; set; }

        public double? AtennaHeight { get; set; }

        [StringLength(100)]
        public string AtennaModel { get; set; }

        [StringLength(100)]
        public string AtennaAzimuth { get; set; }

        [StringLength(100)]
        public string TiltPerSectore { get; set; }

        [StringLength(100)]
        public string AntennaManufacturer { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int SiteId { get; set; }

        [Key]
        public int AntennaPid { get; set; }
    }
}
