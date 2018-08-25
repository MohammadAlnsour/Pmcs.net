namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.PATs")]
    public partial class PAT
    {
        public int PATId { get; set; }

        public int JobId { get; set; }

        public int PATStatusId { get; set; }

        public DateTime? OILClearedDate { get; set; }

        public DateTime PATCompletionDate { get; set; }

        public DateTime PATIssueDate { get; set; }

        public DateTime? FATCompletiondate { get; set; }

        [StringLength(200)]
        public string Remarks { get; set; }

        public DateTime? FACIssueDate { get; set; }

        public int PATSupervisorId { get; set; }

        public int? PATManagerId { get; set; }

        public int? PATInspector1 { get; set; }

        public int? PATInspector2 { get; set; }

        public bool IsOIL { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Job Job { get; set; }

        public virtual PATStatusType PATStatusType { get; set; }

        public virtual UsersAccount UsersAccount { get; set; }
    }
}
