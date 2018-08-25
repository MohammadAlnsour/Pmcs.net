using pmcs.Core;
using pmcs.Model.Lookup;
using pmcs.Repository.LookupRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.LookupServices
{
    public class ContractsLookupsService : IContractsLookupsService
    {
        private readonly CurrencyRepository currencyRepository;
        private readonly JobTypesRepository jobTypesRepository;
        private readonly PATStatusTypesRepository pATStatusTypesRepository;
        private readonly InvoiceClassificationRepository invoiceClassificationRepository;

        public ContractsLookupsService(CurrencyRepository currencyRepository,
            JobTypesRepository jobTypesRepository,
            PATStatusTypesRepository pATStatusTypesRepository,
            InvoiceClassificationRepository invoiceClassificationRepository)
        {
            this.currencyRepository = currencyRepository;
            this.jobTypesRepository = jobTypesRepository;
            this.pATStatusTypesRepository = pATStatusTypesRepository;
            this.invoiceClassificationRepository = invoiceClassificationRepository;
        }

        public int CreateCurrency(Currency currency)
        {
            var res = currencyRepository.Insert(currency.AutoMapObject<Currency, DB.Currency>());
            return res.CurrencyId;
        }

        public void DeleteCurrency(int currencyId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Currency> GetCurrencies()
        {
            return currencyRepository.GetAll().Select(c => c.AutoMapObject<DB.Currency, Currency>());
        }

        public Currency GetCurrency(int currencyId)
        {
            return currencyRepository.GetById(c => c.CurrencyId == currencyId).AutoMapObject<DB.Currency, Currency>();
        }

        public IEnumerable<JobsType> GetJobsType()
        {
            return jobTypesRepository.GetAll().Select(t => t.AutoMapObject<DB.JobsType, JobsType>());
        }

        public void UpdateCurrency(Currency currency)
        {
            var original = currencyRepository.GetById(c => c.CurrencyId == currency.CurrencyId);
            currencyRepository.Update(original, currency.AutoMapObject<Currency, DB.Currency>());
        }

        public int CreateInvoiceClassificationType(GenericLookupType type)
        {
            var res = invoiceClassificationRepository.Insert(type.AutoMapObject<GenericLookupType, DB.InvoicesClassificationType>());
            return res.Id;
        }

        public void DeleteInvoiceClassificationType(int typeId)
        {
          //  invoiceClassificationRepository.Delete()
        }

        public IEnumerable<GenericLookupType> GetInvoiceClassificationTypes()
        {
            return invoiceClassificationRepository.GetAll().Select(c => c.AutoMapObject<DB.InvoicesClassificationType, GenericLookupType>());
        }

        public GenericLookupType GetInvoiceClassificationType(int typeId)
        {
            return invoiceClassificationRepository.GetById(c => c.Id == typeId).AutoMapObject<DB.InvoicesClassificationType, GenericLookupType>();
        }

        public void UpdateInvoicesClassificationType(GenericLookupType type)
        {
            var original = invoiceClassificationRepository.GetById(c => c.Id == type.Id);
            invoiceClassificationRepository.Update(original, type.AutoMapObject<GenericLookupType, DB.InvoicesClassificationType>());
        }

        public int CreatePATStatusType(PATStatusType statusType)
        {
            var res = pATStatusTypesRepository.Insert(statusType.AutoMapObject<PATStatusType, DB.PATStatusType>());
            return res.Id;
        }

        public void DisablePATStatusType(int id)
        {
            pATStatusTypesRepository.Disable();
        }

        public void EditPATStatusType(PATStatusType pATStatusType)
        {
            var original = pATStatusTypesRepository.GetById(c => c.Id == pATStatusType.Id);
            pATStatusTypesRepository.Update(original, pATStatusType.AutoMapObject<PATStatusType, DB.PATStatusType>());
        }

        public void EnablePATStatusType(int statusTypeId)
        {
            pATStatusTypesRepository.Enable();
        }

        public PATStatusType GetPATStatusType(int statusTypeId)
        {
            return pATStatusTypesRepository
                 .GetById(c => c.Id == statusTypeId)
                 .AutoMapObject<DB.PATStatusType, PATStatusType>();
        }

        public IEnumerable<PATStatusType> GetPATStatusTypes()
        {
            return pATStatusTypesRepository
                .GetAll()
                .Select(c => c.AutoMapObject<DB.PATStatusType, PATStatusType>());
        }

        public IEnumerable<PATStatusType> SearchPATStatusTypes(string searchText)
        {
            return pATStatusTypesRepository
                .SearchData(c => c.Name.ToLower().Contains(searchText))
                .Select(c => c.AutoMapObject<DB.PATStatusType, PATStatusType>());
        }



    }
}
