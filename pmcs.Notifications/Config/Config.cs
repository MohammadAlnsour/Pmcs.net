using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Notifications.Config
{

    public enum NotificationObjectType
    {
        PAT = 1,
        AsBuilt = 2,
        LeaseContractWorkflowAction = 3,
        InvoiceWorkflowAction = 4,
        ProjectTaskFinished = 5,
        ProjectFinished = 6,
        MileStoneFinished = 7,
        NewTicket = 8,
        TicketAction = 9,
        NewChangeRequest = 10,
        ChangeRequestAction = 11,
        BeginInvoiceWorkflow = 12,
        BeginLeaseWorkflow = 13,
        NewDocument = 14,
        DocumentAction = 15
    }

    public enum ActionType
    {
        Approve = 1,
        Reject = 2,
        Forward = 3,
        Cancel = 4,
        NotSpecified = 5
    }

}
