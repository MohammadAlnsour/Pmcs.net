using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class LeaseWorkflowDetails
    {
        public LeaseContract LeaseContract { get; set; }
        public LeasePaymentTransaction LeasePayment { get; set; }
        public LeasePaymentTransactionApprovalWorkflow LeaseWorkflowItem { get; set; }

    }
}
