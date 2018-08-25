using pmcs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model
{
    public class UserMappingsSheet : ModelBase
    {
        public int MappingId { get; set; }
        public int ModuleId { get; set; }
        public int ViewId { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }
        public bool Delete { get; set; }
        public override int ModelPrimaryId => this.MappingId;

    }
}
