namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.Sites")]
    public partial class Site
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Site()
        {
            DismantleRequests = new HashSet<DismantleRequest>();
            Jobs = new HashSet<Job>();
            SitesConfigurations = new HashSet<SitesConfiguration>();
        }

        public int SiteId { get; set; }

        [StringLength(50)]
        public string SiteNumber { get; set; }

        public int SiteType { get; set; }

        [StringLength(50)]
        public string SitePriority { get; set; }

        [StringLength(50)]
        public string Latitude { get; set; }

        [StringLength(50)]
        public string Longtitude { get; set; }

        public int SiteOwnerId { get; set; }

        public int? GevernorateId { get; set; }

        public int? DistrictId { get; set; }

        public long? BlockNumber { get; set; }

        [StringLength(10)]
        public string StreetNumber { get; set; }

        [StringLength(10)]
        public string SubStreetNumber { get; set; }

        [StringLength(10)]
        public string BuildingNumber { get; set; }

        [StringLength(50)]
        public string BuildingName { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [Required]
        [StringLength(150)]
        public string SiteName { get; set; }

        public virtual SitesOwner SitesOwner { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DismantleRequest> DismantleRequests { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Job> Jobs { get; set; }

        public virtual District District { get; set; }

        public virtual Governorate Governorate { get; set; }

        public virtual SitesType SitesType { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SitesConfiguration> SitesConfigurations { get; set; }
    }
}
