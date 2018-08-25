using pmcs.Model.Lookup;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.LookupRepos;
using pmcs.Core;

namespace pmcs.Services.LookupServices
{
    public class SitesLookupService : ISitesLookupService
    {
        private readonly DistrictsRepository districtsRepository;
        private readonly GovernoratesRepository governoratesRepository;
        private readonly SiteOwnersRepository siteOwnersRepository;
        private readonly SiteTypesRepository siteTypesRepository;
        private readonly SiteOwnerPaymentAccountsRepository siteOwnerPaymentAccountsRepository;

        public SitesLookupService(DistrictsRepository districtsRepository,
            GovernoratesRepository governoratesRepository,
            SiteOwnersRepository siteOwnersRepository,
            SiteTypesRepository siteTypesRepository,
            SiteOwnerPaymentAccountsRepository siteOwnerPaymentAccountsRepository)
        {
            this.districtsRepository = districtsRepository;
            this.governoratesRepository = governoratesRepository;
            this.siteOwnersRepository = siteOwnersRepository;
            this.siteTypesRepository = siteTypesRepository;
            this.siteOwnerPaymentAccountsRepository = siteOwnerPaymentAccountsRepository;
        }

        public IEnumerable<District> GetDistricts()
        {
            return districtsRepository
                .GetAll()
                .Select(d => d.AutoMapObject<DB.District, District>());
        }

        public IEnumerable<Governorate> GetGovernorates()
        {
            return governoratesRepository
                .GetAll()
                .Select(g => g.AutoMapObject<DB.Governorate, Governorate>());
        }

        public IEnumerable<SitesOwner> GetSiteOwners()
        {
            return siteOwnersRepository
                .GetAll()
                .Select(o => o.AutoMapObject<DB.SitesOwner, SitesOwner>());
        }

        public IEnumerable<SitesType> GetSiteTypes()
        {
            return siteTypesRepository
                .GetAll()
                .Select(t => t.AutoMapObject<DB.SitesType, SitesType>());
        }

        public IEnumerable<SitesOwnersPaymentsAccount> GetSiteOwnerPaymentAccounts()
        {
            return siteOwnerPaymentAccountsRepository
                .GetAll()
                .Select(t => t.AutoMapObject<DB.SitesOwnersPaymentsAccount, SitesOwnersPaymentsAccount>());
        }


    }
}
