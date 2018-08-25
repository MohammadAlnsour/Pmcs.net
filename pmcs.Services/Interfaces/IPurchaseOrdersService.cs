using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IPurchaseOrdersService
    {
        POs CreatePO(POs PO);
        void EditPO(POs PO);
        IEnumerable<POs> GetPOs();
        IEnumerable<POs> GetPOsByProject(int projectId);
        POs GetPO(int POid);

    }
}
