using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.DTOs
{
    public class ProjectTasksTreeTable
    {
        public string DataTTId { get; set; }
        public string DataTTParentId { get; set; }

        public int TaskId { get; set; }

        [Required]
        [StringLength(100)]
        public string TaskName { get; set; }

        public int ProjectId { get; set; }

        public int? ParentTaskId { get; set; }
        //public string ParentTaskName
        //{
        //    get
        //    {
        //        if (this.ParentTaskId != null)
        //        {
        //            var res = new TasksRepository(new DB.PmcsDbContext()).GetById(t => t.TaskId == this.ParentTaskId);
        //            if (res != null)
        //                return res.TaskName;

        //            return string.Empty;
        //        }
        //        return string.Empty;
        //    }
        //}

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

        public string PlanStartDateString
        {
            get
            {
                if (this.PlanStartDate != null) return this.PlanStartDate.ToShortDateString();
                return string.Empty;
            }
        }

        public DateTime PlanEndDate { get; set; }
        public string PlanEndDateString
        {
            get
            {
                if (this.PlanEndDate != null) return this.PlanEndDate.ToShortDateString();
                return string.Empty;
            }
        }

        public DateTime ForcastStartDate { get; set; }

        public DateTime ForcastEndDate { get; set; }

        public DateTime? ActualStartDate { get; set; }
        public string ActualStartDateString
        {
            get
            {
                if (this.ActualStartDate != null) return ((DateTime) this.ActualStartDate).ToShortDateString();
                return string.Empty;
            }
        }

        public DateTime? ActualEndDate { get; set; }
        public string ActualEndDateString
        {
            get
            {
                if (this.ActualEndDate != null) return ((DateTime)this.ActualEndDate).ToShortDateString();
                return string.Empty;
            }
        }

        public int TaskStatus { get; set; }

        [StringLength(100)]
        public string TaskRisk { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int? TaskDuration { get; set; }
        public double? CompletionPercentage { get; set; }
        public bool? TaskComplete { get; set; }


    }
}
