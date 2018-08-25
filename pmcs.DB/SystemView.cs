namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Configuration.SystemViews")]
    public partial class SystemView
    {
        [Key]
        public int ViewId { get; set; }

        [Required]
        [StringLength(100)]
        public string ViewName { get; set; }

        public int ViewModuleId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual SystemModule SystemModule { get; set; }
    }
}
