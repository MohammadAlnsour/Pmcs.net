using pmcs.Models;
using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class POs : ModelBase
    {
        public int PoId { get; set; }

        public int ProjectId { get; set; }
        public string ProjectName
        {
            get
            {
                if (this.ProjectId > 0)
                {
                    return new ProjectsRepository(new DB.PmcsDbContext())
                        .GetById(g => g.ProjectId == this.ProjectId).ProjectName;
                }
                return string.Empty;
            }
        }

        [Required]
        [StringLength(50)]
        public string PONumber { get; set; }

        public decimal? PoGross { get; set; }

        public decimal? PoNet { get; set; }

        public decimal? FOCGross { get; set; }

        public int? CurrencyId { get; set; }

        public decimal? PoUSDRate { get; set; }

        public int? PaymentTermsDays { get; set; }

        public int ContractorId { get; set; }

        public string ContractorName
        {
            get
            {
                if (this.ContractorId > 0)
                {
                    return new ContractorsRepository(new DB.PmcsDbContext())
                        .GetById(g => g.ContractorId == this.ContractorId).ContractorName;
                }
                return string.Empty;
            }
        }

        public int? CapitilazationMilestoneId { get; set; }

        public DateTime? PODate { get; set; }

        public int CULGroupId { get; set; }
        public string CULGroupName
        {
            get
            {
                return new CULGroupRepository(new DB.PmcsDbContext())
                    .GetById(g => g.CULGroupId == this.CULGroupId).Description;
            }
        }

        public DateTime? ImplementationEndDate { get; set; }

        [StringLength(400)]
        public string Remarks { get; set; }

        public bool? ShowInReports { get; set; }

        public int POClassificationId { get; set; }
        public string POClassificationName
        {
            get
            {
                //return new CULGroupRepository(new DB.PmcsDbContext())
                //    .GetById(g => g.CULGroupId == this.CULGroupId).Description;
                return string.Empty;
            }
        }

        public int POStatus { get; set; }

        public string POStatusName
        {
            get
            {
                return this.POStatus == 1 ? "Open" : "Closed";
            }
        }

        public int? POPayableTypeId { get; set; }

        public bool? FOCInGross { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int? ProjectTaskId { get; set; }
        public string ProjectTaskName
        {
            get
            {
                if (this.ProjectTaskId != null)
                {
                    return new ProjectTasksRepository(new DB.PmcsDbContext())
                        .GetById(g => g.TaskId == this.ProjectTaskId).TaskName;
                }
                return string.Empty;
            }
        }

        public override int ModelPrimaryId => this.PoId;
    }
}
