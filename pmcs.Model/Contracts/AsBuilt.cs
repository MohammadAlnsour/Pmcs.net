using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class AsBuilt
    {
        public int Id { get; set; }

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

        public int CULId { get; set; }

        public string CULName
        {
            get
            {
                var CUL = new CULsRepository(new DB.PmcsDbContext()).GetById(c => c.CULId == this.CULId);
                if (CUL != null)
                    return CUL.Description;
                return string.Empty;
            }
        }

        public bool? Auto { get; set; }

        public double Quantity { get; set; }

        public bool FOC { get; set; }

        public double? Payable { get; set; }

        public double? FOCAmount { get; set; }

        [StringLength(100)]
        public string Category { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

    }
}
