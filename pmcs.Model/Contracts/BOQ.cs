using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class BOQ
    {
        public int DesignId { get; set; }

        public int JobId { get; set; }
        public string JobNumber
        {
            get
            {
                var res = new JobsRepository(new DB.PmcsDbContext()).GetById(j => j.JobId == this.JobId);
                return res.JobNumber;
            }
        }

        public int CULId { get; set; }
        public string CULName
        {
            get
            {
                var res = new CULsRepository(new DB.PmcsDbContext()).GetById(c => c.CULId == this.CULId);
                return res.Description;
            }
        }
        public double Quantity { get; set; }

        public double FOC { get; set; }

        public double Payable { get; set; }

        public DateTime PATIssueDate { get; set; }

        public bool IsFOC { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

    }
}
