using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class TaskViewModel
    {
        public Project Project { get; set; }
        public Site Site { get; set; }
        public ProjectTask Task { get; set; }
        public IEnumerable<RelatedEntity> RelatedEntities { get; set; }
    }

    public class RelatedEntity
    {
        public string EntityNumber { get; set; }
        public string EntityType { get; set; }
        public bool IsFinished { get; set; }
        public int ID { get; set; }
        public string URL { get; set; }


    }

}
