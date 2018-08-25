using pmcs.Repository.EntitiesRepos;
using pmcs.Repository.LookupRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class PAT
    {
        public int PATId { get; set; }

        public int JobId { get; set; }
        public string JobNumber
        {
            get
            {
                var job = new JobsRepository(new DB.PmcsDbContext()).GetById(j => j.JobId == this.JobId);
                if (job != null)
                    return job.JobNumber;
                return string.Empty;
            }
        }

        public int PATStatusId { get; set; }
        public string PATStatusName
        {
            get
            {
                var status = new PATStatusTypesRepository(new DB.PmcsDbContext()).GetById(j => j.Id == this.PATStatusId);
                if (status != null)
                    return status.Name;
                return string.Empty;
            }
        }

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

        public string InspectorName
        {
            get
            {
                var user = new UsersAccountsRepository(new DB.PmcsDbContext()).GetById(u => u.UserId == this.PATSupervisorId);
                return user.FullName;
            }
        }

        public bool IsOIL { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

    }
}
