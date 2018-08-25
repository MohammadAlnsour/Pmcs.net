using pmcs.Model.Lookup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface ISitesLookupService
    {
        IEnumerable<SitesType> GetSiteTypes();
        IEnumerable<SitesOwner> GetSiteOwners();
        IEnumerable<Governorate> GetGovernorates();
        IEnumerable<District> GetDistricts();
        IEnumerable<SitesOwnersPaymentsAccount> GetSiteOwnerPaymentAccounts();

    }
}
