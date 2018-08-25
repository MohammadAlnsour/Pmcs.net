using pmcs.Models;
using pmcs.Notifications.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Notifications.System
{
    internal static class SystemNotificationsComposer
    {
        public static KeyValuePair<string, string> WriteNotification<T>(NotificationObjectType objectType,
            ActionType actionType, UserAccountModel user, T additionalData)
        {
            var templateBody = string.Empty;
            var templateSubject = string.Empty;

            switch (objectType)
            {
                case NotificationObjectType.PAT:
                    templateBody = NotificationTemplates.PAT.Value;
                    templateSubject = NotificationTemplates.PAT.Key;
                    break;
                case NotificationObjectType.AsBuilt:
                    break;

                case NotificationObjectType.BeginLeaseWorkflow:
                    templateSubject = NotificationTemplates.BeginLeasePaymentProcess.Key;
                    templateBody = NotificationTemplates.BeginLeasePaymentProcess.Value;
                    break;

                case NotificationObjectType.LeaseContractWorkflowAction:
                    templateSubject = NotificationTemplates.LeasePaymentWorkflowAction.Key;
                    templateBody = NotificationTemplates.LeasePaymentWorkflowAction.Value;
                    break;

                case NotificationObjectType.BeginInvoiceWorkflow:
                    templateSubject = NotificationTemplates.BeginInvoiceApprovalProcess.Key;
                    templateBody = NotificationTemplates.BeginInvoiceApprovalProcess.Value;
                    break;

                case NotificationObjectType.InvoiceWorkflowAction:
                    templateSubject = NotificationTemplates.InvoiceWorkflowAction.Key;
                    templateBody = NotificationTemplates.InvoiceWorkflowAction.Value;
                    break;
                //    break;
                //case NotificationObjectType.ProjectTask:
                //    break;
                //case NotificationObjectType.Project:
                //    break;
                //case NotificationObjectType.MileStone:
                //    break;
                //case NotificationObjectType.Ticket:
                //    break;
                //case NotificationObjectType.ChangeRequest:
                //    break;
                default:
                    break;
            }

            if (string.IsNullOrEmpty(templateBody))
                return new KeyValuePair<string, string>("Simple Email from Pmcs v1.2 email subject",
                   "<p>Sample Email</p>");

            var replacer = new TemplateReplacer<T>(objectType, user, additionalData);
            var filteredBody = replacer.FilterEmailPlaceHolders(templateBody);

            return new KeyValuePair<string, string>(templateSubject, filteredBody);
        }
    }
}
