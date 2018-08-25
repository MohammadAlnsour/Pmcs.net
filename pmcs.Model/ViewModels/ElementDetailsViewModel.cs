using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class ElementDetailsViewModel
    {
        public List<JobsListViewModel> ElementJobs { get; set; }
        public Element Element { get; set; }
        public List<BOQ> ElementBOQs { get; set; }
        

    }
}
