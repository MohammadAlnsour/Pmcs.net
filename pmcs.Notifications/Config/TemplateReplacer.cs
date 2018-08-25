using pmcs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;
using System.Web;

namespace pmcs.Notifications.Config
{
    public class TemplateReplacer<T>
    {
        private readonly NotificationObjectType notificationObjectType;
        private readonly UserAccountModel user;
        private readonly T additionalData;

        public TemplateReplacer(NotificationObjectType notificationObjectType, UserAccountModel user, T additionalData)
        {
            this.notificationObjectType = notificationObjectType;
            this.user = user;
            this.additionalData = additionalData;
        }

        public string FilterEmailPlaceHolders(string EmailTemplate)
        {
            string transformedText = string.Empty;

            switch (this.notificationObjectType)
            {
                case NotificationObjectType.PAT:
                    if (additionalData != null)
                    {
                        var pat = additionalData as PAT;
                        transformedText = EmailTemplate;
                        transformedText = transformedText.Replace("[FullName]", user.FullName);
                        transformedText = transformedText.Replace("[JobName]", pat.JobNumber);
                        transformedText = transformedText.Replace("[PATDate]", DateTime.Now.ToString());
                    }
                    break;

                case NotificationObjectType.AsBuilt:
                    break;

                case NotificationObjectType.BeginLeaseWorkflow:
                    if (additionalData != null)
                    {
                        var workflow = additionalData as LeasePaymentTransactionApprovalWorkflow;
                        transformedText = EmailTemplate;
                        transformedText = transformedText.Replace("[FullName]", user.FullName);
                        transformedText = transformedText.Replace("[LeasePayment]", workflow.LeaseContractNumber);
                        transformedText = transformedText.Replace("[IssueDate]", DateTime.Now.ToString());
                        transformedText = transformedText.Replace("[LeasePaymentNumber]", workflow.LeaseContractNumber);
                    }
                    break;

                case NotificationObjectType.LeaseContractWorkflowAction:
                    if (additionalData != null)
                    {
                        var workflow = additionalData as LeasePaymentTransactionApprovalWorkflow;
                        transformedText = EmailTemplate;
                        transformedText = transformedText.Replace("[ActionName]", workflow.StatusName);
                        transformedText = transformedText.Replace("[UserName]", user.FullName);
                        transformedText = transformedText.Replace("[ActionDate]", DateTime.Now.ToString());
                        transformedText = transformedText.Replace("[LeasePaymentNumber]", workflow.LeaseContractNumber);
                    }
                    break;

                case NotificationObjectType.ChangeRequestAction:
                    break;
                case NotificationObjectType.DocumentAction:
                    break;
                case NotificationObjectType.MileStoneFinished:
                    break;
                case NotificationObjectType.NewChangeRequest:
                    break;
                case NotificationObjectType.NewDocument:
                    break;
                case NotificationObjectType.NewTicket:
                    break;
                case NotificationObjectType.ProjectFinished:
                    break;
                case NotificationObjectType.ProjectTaskFinished:
                    break;
                case NotificationObjectType.TicketAction:
                    break;
                case NotificationObjectType.BeginInvoiceWorkflow:
                    if (additionalData != null)
                    {
                        var invoice = additionalData as InvoicesApprovalWorkflow;
                        var requestUrl = HttpContext.Current.Request.Url;
                        var url = string.Empty;
                        if (requestUrl.Port > 0)
                            url = requestUrl.Scheme + "://" + requestUrl.Host + ":" + requestUrl.Port.ToString() + "/";
                        else
                            url = requestUrl.Scheme + "://" + requestUrl.Host + "/";

                        transformedText = EmailTemplate;
                        transformedText = transformedText.Replace("[FullName]", user.FullName);
                        transformedText = transformedText.Replace("[InvoiceNumber]", invoice.InvoiceNumber);
                        transformedText = transformedText.Replace("[InvoiceDate]", invoice.CreatedDate.ToShortDateString());
                        transformedText = transformedText.Replace("[InvoiceDetailsURL]", HttpContext.Current.Request.Url.Host + "/Financial/Invoices/" + invoice.InvoiceId.ToString() + "/" + invoice.InvoiceNumber);
                    }
                    break;
                case NotificationObjectType.InvoiceWorkflowAction:
                    if (additionalData != null)
                    {
                        var invoice = additionalData as InvoicesApprovalWorkflow;
                        var requestUrl = HttpContext.Current.Request.Url;
                        var url = string.Empty;
                        if (requestUrl.Port > 0)
                            url = requestUrl.Scheme + "://" + requestUrl.Host + ":" + requestUrl.Port.ToString() + "/";
                        else
                            url = requestUrl.Scheme + "://" + requestUrl.Host + "/";

                        transformedText = EmailTemplate;
                        transformedText = transformedText.Replace("[FullName]", user.FullName);
                        transformedText = transformedText.Replace("[InvoiceNumber]", invoice.InvoiceNumber);
                        transformedText = transformedText.Replace("[InvoiceDate]", invoice.CreatedDate.ToShortDateString());
                        transformedText = transformedText.Replace("[InvoiceDetailsURL]", HttpContext.Current.Request.Url.Host + "/Financial/Invoices/" + invoice.InvoiceId.ToString() + "/" + invoice.InvoiceNumber);
                        transformedText = transformedText.Replace("[ActionName]", invoice.StatusName);
                        transformedText = transformedText.Replace("[UserName]", user.FullName);
                        transformedText = transformedText.Replace("[ActionDate]", DateTime.Now.ToShortDateString());
                    }
                    break;
                default:
                    break;
            }

            return transformedText;
        }

    }
}
