using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;

namespace pmcs.Services.Interfaces
{
    public interface IInvoicesService
    {
        int CreateInvoice(Invoice invoice);
        void UpdateInvoice(Invoice invoice);
        Invoice GetInvoice(int invoiceId);
        IEnumerable<Invoice> GetInvoices();
        IEnumerable<Invoice> SearchInvoices(Expression<Func<DB.Invoice, bool>> wherePredicate);
        IEnumerable<Invoice> GetInvoicesByPO(int POId);
        void UpdateInvoiceTaskActualStartDate(int milestoneId);
        IEnumerable<InvoicesApprovalWorkflow> GetUserInvoiceWorkflow(int userId);
        IEnumerable<InvoicesApprovalWorkflow> GetNotFinishedUserInvoiceWorkflow(int userId);
        InvoicesApprovalWorkflow GetUserInvoiceWorkflowById(int workflowId);
        IEnumerable<InvoicesApprovalWorkflow> GetInvoiceWorkflows(int invoiceId);

    }
}
