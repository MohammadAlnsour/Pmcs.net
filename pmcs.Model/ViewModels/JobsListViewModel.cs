using pmcs.Repository.EntitiesRepos;
using pmcs.Repository.LookupRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class JobsListViewModel
    {
        public int JobId { get; set; }

        [StringLength(50)]
        public string JobNumber { get; set; }

        public int POId { get; set; }
        public string PONumber
        {
            get
            {
                if (this.POId > 0)
                    return new PORepository(new DB.PmcsDbContext()).GetById(p => p.PoId == this.POId).PONumber;
                return string.Empty;
            }
        }

        public int ElementId { get; set; }
        public string ElementName
        {
            get
            {
                if (this.ElementId > 0)
                    return new ElementsRepositroy(new DB.PmcsDbContext()).GetById(e => e.ElementId == this.ElementId).ElementName;
                return string.Empty;
            }
        }

        public int ProjectId
        {
            get
            {
                if (this.POId > 0)
                {
                    return new PORepository(new DB.PmcsDbContext())
                         .GetById(p => p.PoId == this.POId)
                         .ProjectId;

                }
                return 0;
            }
        }
        public string ProjectName
        {
            get
            {
                if (this.ProjectId > 0)
                {
                    return new ProjectsRepository(new DB.PmcsDbContext())
                         .GetById(p => p.ProjectId == this.ProjectId)
                         .ProjectName;
                }
                return string.Empty;
            }
        }

        public string SiteName
        {
            get
            {
                if (this.SiteIdNumber > 0)
                {
                    return new SitesRepository(new DB.PmcsDbContext())
                         .GetById(s => s.SiteId == this.SiteIdNumber)
                         .SiteName;
                }
                return string.Empty;
            }
        }
        public int SiteIdNumber
        {
            get
            {
                if (this.ProjectId > 0)
                {
                    return new ProjectsRepository(new DB.PmcsDbContext())
                         .GetById(p => p.ProjectId == this.ProjectId)
                         .SiteId;
                }
                return 0;
            }
        }

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
        public string JobTypeName
        {
            get
            {
                if (this.JobType > 0)
                    return new JobTypesRepository(new DB.PmcsDbContext()).GetById(e => e.Id == this.JobType).Name;
                return string.Empty;
            }
        }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int? ProjectTaskId { get; set; }

        public string TaskName
        {
            get
            {
                if (this.ProjectTaskId != null)
                {
                    var task = new TasksRepository(new DB.PmcsDbContext()).GetById(t => t.TaskId == this.ProjectTaskId);
                    return task.TaskName;
                }
                return string.Empty;
            }
        }

    }
}
