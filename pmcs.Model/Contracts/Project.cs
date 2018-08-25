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
    public class Project : ModelBase
    {
        public int ProjectId { get; set; }

        [Required]
        [StringLength(50)]
        public string ProjectCode { get; set; }

        [Required]
        [StringLength(200)]
        public string ProjectName { get; set; }

        [StringLength(50)]
        public string ProjectJobCode { get; set; }

        public int? JobStructure { get; set; }

        [StringLength(50)]
        public string PhaseDesignator { get; set; }

        [StringLength(50)]
        public string ProjectShortName { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int SiteId { get; set; }
        public string SiteName
        {
            get
            {
                var site = new SitesRepository(new DB.PmcsDbContext()).GetById(s => s.SiteId == this.SiteId);
                return site.SiteName;
            }
        }

        public override int ModelPrimaryId => this.ProjectId;

    }
}
