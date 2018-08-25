namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.Jobs")]
    public partial class Job
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Job()
        {
            AsBuilts = new HashSet<AsBuilt>();
            DesignBOQs = new HashSet<DesignBOQ>();
            JobsOILs = new HashSet<JobsOIL>();
            JobsExpenses = new HashSet<JobsExpens>();
            PATs = new HashSet<PAT>();
        }

        public int JobId { get; set; }

        [StringLength(50)]
        public string JobNumber { get; set; }

        public int POId { get; set; }

        public int ElementId { get; set; }

        public int? SiteId { get; set; }

        [StringLength(50)]
        public string SequentialNumber { get; set; }

        public int? Phase { get; set; }

        public bool FOC { get; set; }

        [StringLength(50)]
        public string ReferenceNumber { get; set; }

        [StringLength(100)]
        public string GroupName { get; set; }

        [StringLength(100)]
        public string SubContractor { get; set; }

        public int JobType { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int? ProjectTaskId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AsBuilt> AsBuilts { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DesignBOQ> DesignBOQs { get; set; }

        public virtual Element Element { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobsOIL> JobsOILs { get; set; }

        public virtual JobsType JobsType { get; set; }

        public virtual POs POs { get; set; }

        public virtual Site Site { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobsExpens> JobsExpenses { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PAT> PATs { get; set; }
    }
}
