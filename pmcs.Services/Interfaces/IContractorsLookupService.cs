using pmcs.Model.Lookup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IContractorsLookupService
    {
        void EditContractor(Contractor contractor);
        int CreateContractor(Contractor contractor);
        IEnumerable<Contractor> GetContractors();
        IEnumerable<Contractor> SearchContractors(string searchText);
        Contractor GetContractor(int contractorId);
        void DisableContractor(int contractorId);
        void EnableContractor(int contractorId);

    }
}
