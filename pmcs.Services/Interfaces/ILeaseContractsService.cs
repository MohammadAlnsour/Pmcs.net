using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;

namespace pmcs.Services.Interfaces
{
    public interface ILeaseContractsService
    {
        int CreateLeaseContract(LeaseContract leaseContract);
        void EditLeaseContract(LeaseContract leaseContract);
        void DeleteLeaseContract(int leaseId);
        IEnumerable<LeaseContract> GetLeaseContracts();
        LeaseContract GetLeaseContract(int leaseId);

        int CreateLeasePayment(LeasePaymentTransaction leasePayment);
        void EditLeasePayment(LeasePaymentTransaction leasePayment);
        void DeleteLeasePayment(int leastPaymentId);
        IEnumerable<LeasePaymentTransaction> GetLeasePayments();
        IEnumerable<LeasePaymentTransaction> GetLeasePaymentsByLeaseContractId(int leaseContractId);
        LeasePaymentTransaction GetLeasePayment(int leasePaymentId);

        void CreateLeasePaymentTransactionApprovalWorkflow(LeasePaymentTransactionApprovalWorkflow leaseWorkflow);
        void EditLeasePaymentTransactionApprovalWorkflow(LeasePaymentTransactionApprovalWorkflow leaseWorkflow);
        IEnumerable<LeasePaymentTransactionApprovalWorkflow> GetLeasePaymentWorkflow(int paymentId);
        IEnumerable<LeasePaymentTransactionApprovalWorkflow> GetUserLeasePaymentWorkflow(int userId);
        LeasePaymentTransactionApprovalWorkflow GetUserLeasePaymentWorkflowById(int workflowId);

    }
}
