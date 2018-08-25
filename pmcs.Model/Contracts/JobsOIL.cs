using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class JobsOIL
    {
        public int OILId { get; set; }
        public int JobId { get; set; }
        public int OILStatus { get; set; }
        public DateTime? OILClearedDate { get; set; }
        public string OILDescription { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
    }
}
