using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class ProjectDetailsViewModel
    {
        public Project ProjectDetails { get; set; }
        public IEnumerable<Contracts.ProjectTask> ProjectTasks { get; set; }
        public IEnumerable<POs> ProjectPOs { get; set; }
        public Site ProjectSite { get; set; }


    }
}
