using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class InvoiceDetailsViewModel
    {
        public Invoice Invoice { get; set; }
        public List<JobDetailsViewModel> InvoiceJobs { get; set; }
        public List<InvoicesApprovalWorkflow> InvoiceWorkflows { get; set; }


    }
}
