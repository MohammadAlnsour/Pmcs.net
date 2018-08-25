using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Core
{
    public enum NotificationsTypes
    {
        System = 1,
        Email = 2
    }

    public enum WorkflowLevelStatus
    {
        New = 1,
        Forwarded = 2,
        Approved = 3,
        Rejected = 4,
        Cancelled = 5,
        Held = 6,
        InHand = 7,
        AcceptedAtInvoiceSubmission = 8

    }

    public enum TaskTemplateTypes
    {
        StartToStart = 1,
        StartToEnd = 2,
        EndToStart = 3,
        EndToEnd = 4
    }

    public enum ProjectTaskStatus
    {
        New = 1,
        InProgress = 2,
        Finished = 3
    }

    public enum TicketSeverity
    {
        Enhancement = 1,
        Normal = 2,
        High = 3,
        Critical = 4,
        Blocker = 5
    }
    public enum TicketPriority
    {
        Enhancement = 1,
        Normal = 2,
        High = 3,
        Critical = 4,
        Blocker = 5
    }
    public enum TicketStatus
    {
        Open = 1,
        Fixed = 2,
        Closed = 3
    }

    public enum WorkflowType
    {
        Lease = 1,
        Invoice = 2,
        DocumentManagement = 3
    }

    public enum PredecessorRelationshipType
    {
        FinishToStart = 1,
        StartToFinish = 2,
        StartToStart = 3,
        FinishToFinish = 4
    }

    public enum DocumentStatus
    {
        New = 1,
        Read = 2,
        Replied = 3
    }

    public enum DocumentType
    {
        Pdf = 1,
        Word = 2,
        Excel = 3,
        Image = 4,
        NotSupported = 5
    }


    public enum PaymentFrequency
    {
        Weekly = 1,
        Monthly = 2,
        BiYearly = 3,
        QuarterYearly = 4,
        Yearly = 5
    }

    public enum SitePriority
    {
        Average = 1,
        Low = 2,
        High = 3,
    }


}
