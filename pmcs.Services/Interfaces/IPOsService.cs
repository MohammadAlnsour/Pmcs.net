using pmcs.Model.Contracts;
using System.Collections.Generic;

namespace pmcs.Services.Interfaces
{
    public interface IPOsService
    {
        int CreatePO(POs pOs);
        IEnumerable<POs> GetPOs();
        IEnumerable<POs> GetProjectPOs(int projectId);
        IEnumerable<POs> GetSitePOs(int siteId);
        IEnumerable<POs> GetContractorPOs(int contractorId);
        IEnumerable<Element> GetPOElements(int POId);
        POs GetPO(int POId);
        void EditPO(POs PO);


    }
}