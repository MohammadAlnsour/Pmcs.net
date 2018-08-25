using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Lookup
{
    public class WorkflowAction : Models.ModelBase
    {
        public override int ModelPrimaryId => this.ActionId;
        public int ActionId { get; set; }
        public string ActionName { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }

    }
}
