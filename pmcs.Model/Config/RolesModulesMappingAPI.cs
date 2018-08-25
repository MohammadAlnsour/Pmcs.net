using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model
{
    public class RolesModulesMappingAPI
    {
        public int RoleId { get; set; }
        public int ModuleId { get; set; }
        public string ModuleName { get; set; }
        public List<RolesModulesMapping> Mappings { get; set; }


    }
}
