using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class Task : ModelBase
    {
        public override int ModelPrimaryId => this.TaskId;

        public int TaskId { get; set; }

        [Required]
        [StringLength(100)]
        public string TaskName { get; set; }

        public int ProjectId { get; set; }

        public int? ParentTaskId { get; set; }

        [StringLength(50)]
        public string TaskCode { get; set; }

        [StringLength(100)]
        public string ShortName { get; set; }

        [StringLength(300)]
        public string Description { get; set; }

        public int? ResponsibleRoleId { get; set; }

        public DateTime? VersionDate { get; set; }

        [StringLength(300)]
        public string Output { get; set; }

        [StringLength(500)]
        public string KPIs { get; set; }

        [StringLength(1000)]
        public string Objectives { get; set; }

        [StringLength(400)]
        public string StartCriteria { get; set; }

        [StringLength(400)]
        public string EndCriteria { get; set; }

        [StringLength(400)]
        public string Reporting { get; set; }

        public int? TaskOwnerId { get; set; }

        public bool? IsMileStone { get; set; }

        public DateTime PlanStartDate { get; set; }

        public DateTime PlanEndDate { get; set; }

        public DateTime ForcastStartDate { get; set; }

        public DateTime ForcastEndDate { get; set; }

        public DateTime? ActualStartDate { get; set; }

        public DateTime? ActualEndDate { get; set; }

        public int TaskStatus { get; set; }

        [StringLength(100)]
        public string TaskRisk { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }


    }
}
