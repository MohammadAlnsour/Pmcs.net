namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.SitesFileAttachments")]
    public partial class SitesFileAttachment
    {
        public int SiteId { get; set; }

        [StringLength(100)]
        public string FileName { get; set; }

        [StringLength(1500)]
        public string FilePath { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [Key]
        public int FileId { get; set; }
    }
}
