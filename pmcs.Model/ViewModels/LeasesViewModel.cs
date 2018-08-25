using pmcs.Model.Contracts;
using pmcs.Model.Lookup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class LeasesViewModel
    {
        public IEnumerable<LeaseContract> LeaseContracts { get; set; }
        public IEnumerable<LeasePaymentTransaction> LeaseContractPayments { get; set; }
        public IEnumerable<LeasePaymentTransactionApprovalWorkflow> LeasePaymentsWorkflow { get; set; }
        public IEnumerable<Lookup.SitesOwner> SiteOwners { get; set; }
        public IEnumerable<SitesOwnersPaymentsAccount> SiteOwnerPaymentAccounts { get; set; }


    }
}
