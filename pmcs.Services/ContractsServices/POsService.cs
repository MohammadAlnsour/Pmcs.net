using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.ContractsServices
{
    public class POsService : IPOsService
    {
        private readonly PORepository pORepository;
        private readonly JobsRepository jobsRepository;
        private readonly ElementsRepositroy elementsRepositroy;

        public POsService(PORepository pORepository, JobsRepository jobsRepository, ElementsRepositroy elementsRepositroy)
        {
            this.pORepository = pORepository;
            this.jobsRepository = jobsRepository;
            this.elementsRepositroy = elementsRepositroy;
        }

        public int CreatePO(POs pOs)
        {
            var res = pORepository.Insert(pOs.AutoMapObject<POs, DB.POs>());
            return res.PoId;
        }

        public void EditPO(POs PO)
        {
            var original = pORepository.GetById(p => p.PoId == PO.PoId);
            pORepository.Update(original, PO.AutoMapObject<POs, DB.POs>());
        }

        public IEnumerable<POs> GetContractorPOs(int contractorId)
        {
            return pORepository
                .SearchData(p => p.ContractorId == contractorId)
                .Select(p => p.AutoMapObject<DB.POs, POs>())
                .OrderByDescending(c => c.PoId);
        }

        public POs GetPO(int POId)
        {
            return pORepository
                .GetById(p => p.PoId == POId)
                .AutoMapObject<DB.POs, POs>();
        }

        public IEnumerable<Element> GetPOElements(int POId)
        {
            return jobsRepository
                .SearchData(j => j.POId == POId)
                .Select(j => elementsRepositroy
                            .GetById(e => e.ElementId == j.ElementId)
                            .AutoMapObject<DB.Element, Element>())
                .OrderByDescending(c => c.ElementId);
        }

        public IEnumerable<POs> GetPOs()
        {
            return pORepository
                .GetAll()
                .Select(p => p.AutoMapObject<DB.POs, POs>())
                .OrderByDescending(c => c.PoId);
        }

        public IEnumerable<POs> GetProjectPOs(int projectId)
        {
            return pORepository
                .SearchData(p => p.ProjectId == projectId)
                .Select(p => p.AutoMapObject<DB.POs, POs>())
                .OrderByDescending(c => c.PoId);
        }

        public IEnumerable<POs> GetSitePOs(int siteId)
        {
            return pORepository
                .SearchData(p => p.Project.SiteId == siteId)
                .Select(p => p.AutoMapObject<DB.POs, POs>())
                .OrderByDescending(c => c.PoId);
        }

    }
}
