using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.DTOs
{
    public class dhtmlxganttTask
    {
        public int id { get; set; }
        public string text { get; set; }
        public DateTime start_date { get; set; }
        public int duration { get; set; }
        public int parent { get; set; }
        public string type { get; set; }
        public int projectId { get; set; }

    }
}
