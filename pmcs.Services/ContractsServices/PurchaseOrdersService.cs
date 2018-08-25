using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Services.ContractsServices
{
    public class PurchaseOrdersService : IPurchaseOrdersService
    {
        private readonly PurchaseOrderRepository purchaseOrderRepository;

        public PurchaseOrdersService(PurchaseOrderRepository purchaseOrderRepository)
        {
            this.purchaseOrderRepository = purchaseOrderRepository;
        }
        public POs CreatePO(POs PO)
        {
            var dbPO = purchaseOrderRepository.Insert(PO.AutoMapObject<POs, DB.POs>());
            return dbPO.AutoMapObject<DB.POs, POs>();
        }

        public void EditPO(POs PO)
        {
            var original = purchaseOrderRepository.GetById(p => p.PoId == PO.PoId);
            purchaseOrderRepository.Update(original, PO.AutoMapObject<POs, DB.POs>());
        }

        public POs GetPO(int POid)
        {
            return purchaseOrderRepository
                .GetById(p => p.PoId == POid)
                .AutoMapObject<DB.POs, POs>();
        }

        public IEnumerable<POs> GetPOs()
        {
            return purchaseOrderRepository
                .GetAll()
                .Select(p => p.AutoMapObject<DB.POs, POs>())
                .OrderByDescending(p => p.PoId);
        }

        public IEnumerable<POs> GetPOsByProject(int projectId)
        {
            return purchaseOrderRepository
                .SearchData(p => p.ProjectId == projectId)
                .Select(p => p.AutoMapObject<DB.POs, POs>())
                .OrderByDescending(p => p.PoId);
        }

    }
}
