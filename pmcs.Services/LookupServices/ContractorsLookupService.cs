using pmcs.Core;
using pmcs.Model.Lookup;
using pmcs.Repository.EntitiesRepos;
using pmcs.Repository.LookupRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.LookupServices
{
    public class ContractorsLookupService : IContractorsLookupService
    {
        private readonly ContractorsRepository contractorsRepository;
        private readonly PATStatusTypesRepository pATStatusTypesRepository;

        public ContractorsLookupService(ContractorsRepository contractorsRepository,
            PATStatusTypesRepository pATStatusTypesRepository)
        {
            this.contractorsRepository = contractorsRepository;
            this.pATStatusTypesRepository = pATStatusTypesRepository;
        }

        public int CreateContractor(Contractor contractor)
        {
            var res = contractorsRepository.Insert(contractor.AutoMapObject<Contractor, DB.Contractor>());
            return res.ContractorId;
        }

        public void DisableContractor(int contractorId)
        {
            contractorsRepository.Disable();
        }

        public void EditContractor(Contractor contractor)
        {
            var original = contractorsRepository.GetById(c => c.ContractorId == contractor.ContractorId);
            contractorsRepository.Update(original, contractor.AutoMapObject<Contractor, DB.Contractor>());
        }

        public void EnableContractor(int contractorId)
        {
            contractorsRepository.Enable();
        }

        public Contractor GetContractor(int contractorId)
        {
            return contractorsRepository
                 .GetById(c => c.ContractorId == contractorId)
                 .AutoMapObject<DB.Contractor, Contractor>();
        }

        public IEnumerable<Contractor> GetContractors()
        {
            return contractorsRepository
                .GetAll()
                .Select(c => c.AutoMapObject<DB.Contractor, Contractor>());
        }

        public IEnumerable<Contractor> SearchContractors(string searchText)
        {
            return contractorsRepository
                .SearchData(c => c.ContractorName.ToLower().Contains(searchText))
                .Select(c => c.AutoMapObject<DB.Contractor, Contractor>());
        }

    }
}
