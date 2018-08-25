using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class Job
    {
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

    }
}
