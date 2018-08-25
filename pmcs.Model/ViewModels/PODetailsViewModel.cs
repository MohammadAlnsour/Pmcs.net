using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class PODetailsViewModel
    {
        public POs PO { get; set; }
        public List<Element> Elements { get; set; }
        public List<JobsListViewModel> Jobs { get; set; }
        public List<BOQ> BOQs { get; set; }


    }
}
