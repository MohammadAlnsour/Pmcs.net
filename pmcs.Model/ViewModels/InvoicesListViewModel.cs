using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class InvoicesListViewModel
    {
        public List<Invoice> Invoices { get; set; }
        public List<InvoicesApprovalWorkflow> Workflows { get; set; }


    }
}
