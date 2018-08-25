using pmcs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model
{
    public class RolesModulesMapping : ModelBase
    {
        public string RoleName { get; set; }
        public string ModuleName { get; set; }

        public int MappingId { get; set; }

        public int ViewId { get; set; }

        public string ViewName { get; set; }

        public int ModuleId { get; set; }

        public int RoleId { get; set; }

        public bool CanRead { get; set; }

        public bool CanWrite { get; set; }

        public bool CanDelete { get; set; }

        public bool FullControll { get; set; }

        public bool CanNavigate { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public override int ModelPrimaryId => this.MappingId;

    }

}
