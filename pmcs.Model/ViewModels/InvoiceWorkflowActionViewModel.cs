using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class InvoiceWorkflowActionViewModel
    {
        public InvoicesApprovalWorkflow InvoiceWorkflow { get; set; }
        public Invoice Invoice { get; set; }
    }
}
