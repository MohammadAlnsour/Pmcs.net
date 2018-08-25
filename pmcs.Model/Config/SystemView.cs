using pmcs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model
{
    public class SystemView : ModelBase
    {
        public override int ModelPrimaryId => this.ViewId;

        public int ViewId { get; set; }

        public string ViewName { get; set; }

        public int ViewModuleId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }


    }
}
