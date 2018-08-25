using pmcs.Model.Lookup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IContractsLookupsService
    {
        void UpdateCurrency(Currency currency);
        int CreateCurrency(Currency currency);
        IEnumerable<Currency> GetCurrencies();
        Currency GetCurrency(int currencyId);
        void DeleteCurrency(int currencyId);
        IEnumerable<JobsType> GetJobsType();

        int CreatePATStatusType(PATStatusType statusType);
        void DisablePATStatusType(int id);
        void EditPATStatusType(PATStatusType pATStatusType);
        void EnablePATStatusType(int statusTypeId);
        PATStatusType GetPATStatusType(int statusTypeId);
        IEnumerable<PATStatusType> GetPATStatusTypes();
        IEnumerable<PATStatusType> SearchPATStatusTypes(string searchText);

        int CreateInvoiceClassificationType(GenericLookupType type);
        void DeleteInvoiceClassificationType(int typeId);
        IEnumerable<GenericLookupType> GetInvoiceClassificationTypes();
        GenericLookupType GetInvoiceClassificationType(int typeId);
        void UpdateInvoicesClassificationType(GenericLookupType type);

    }
}
