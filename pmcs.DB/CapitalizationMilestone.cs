namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Lookup.CapitalizationMilestones")]
    public partial class CapitalizationMilestone
    {
        [Key]
        public int MileStoneId { get; set; }

        [Required]
        [StringLength(50)]
        public string MilestoneName { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }
    }
}
