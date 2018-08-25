namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SecurityRoles.RolesModulesMapping")]
    public partial class RolesModulesMapping
    {
        [Key]
        public int MappingId { get; set; }

        public int ModuleId { get; set; }

        public int RoleId { get; set; }

        public bool CanRead { get; set; }

        public bool CanWrite { get; set; }

        public bool CanDelete { get; set; }

        public bool FullControll { get; set; }

        public bool CanNavigate { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int? ViewId { get; set; }

        public virtual Role Role { get; set; }

        public virtual SystemModule SystemModule { get; set; }
    }
}
