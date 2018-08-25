using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Notifications.System
{
    internal static class NotificationTemplates
    {
        /// <summary>
        /// This template needs the Job name and PAT Date.
        /// </summary>
        public static KeyValuePair<string, string> PAT
        {
            get
            {
                return new KeyValuePair<string, string>(
                    "A purchase order job has been PATed",
                    "A purchase order job [JobName] as been PATed successfully at : [PATDate]");
            }
        }

        /// <summary>
        /// This template needs the Lease Payment Number and the Issue date
        /// </summary>
        public static KeyValuePair<string, string> BeginLeasePaymentProcess
        {
            get
            {
                return new KeyValuePair<string, string>("A lease contract payment has been issued",
                   "This email is an important reminder in response to action in the system." + Environment.NewLine +
                   "Please note that the lease payment number [LeasePaymentNumber] approval process has been started in the system at the date of [IssueDate]"
                   );
            }
        }
        /// <summary>
        /// This template needs : Lease payment number, Action name, Username and the Action date
        /// </summary>
        public static KeyValuePair<string, string> LeasePaymentWorkflowAction
        {
            get
            {
                return new KeyValuePair<string, string>("A lease contract payment has a workflow action",
                   "This email is an important reminder in response to action in the system." + Environment.NewLine +
                   "Please note that the lease payment number [LeasePaymentNumber] has been [ActionName] by [UserName] in the date of [ActionDate]"
                   );
            }
        }

        /// <summary>
        /// This template needs the Invoice number and the Issue date.
        /// </summary>
        public static KeyValuePair<string, string> BeginInvoiceApprovalProcess
        {
            get
            {
                return new KeyValuePair<string, string>("A work invoice has been issued",
                   "This email is an important reminder in response to action in the system." + Environment.NewLine +
                   "Please note that the invoice number [InvoiceNumber] approval process has been started in the system at the date of [IssueDate]"
                   );
            }
        }

        /// <summary>
        /// This template needs Invoice number, Action name, User name, Action date
        /// </summary>
        public static KeyValuePair<string, string> InvoiceWorkflowAction
        {
            get
            {
                return new KeyValuePair<string, string>("A work invoice has a workflow action",
                   "This email is an important reminder in response to action in the system." + Environment.NewLine +
                   "Please note that the invoice number [InvoiceNumber] has been [ActionName] by the [UserName] in the date of [ActionDate]"
                   );
            }
        }

    }
}
