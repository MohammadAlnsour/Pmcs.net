namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.CULGroupCULs")]
    public partial class CULGroupCUL
    {
        public int Id { get; set; }

        public int CULGroupId { get; set; }

        public int CULItemId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual CULGroup CULGroup { get; set; }

        public virtual CUL CUL { get; set; }
    }
}
