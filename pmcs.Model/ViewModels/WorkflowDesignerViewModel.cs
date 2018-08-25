using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class WorkflowDesignerViewModel
    {
        public IEnumerable<WorkflowStage> LeaseWorkflowStages { get; set; }
        public IEnumerable<InvoiceWorkflowStage> InvoiceWorkflowStages { get; set; }
        public IEnumerable<ChangeWorkflowStage> ChangeWorkflowStages { get; set; }


    }
}
