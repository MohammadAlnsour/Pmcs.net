using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;
using pmcs.DB;

namespace pmcs.Services.ContractsServices
{
    public class BOQService : IBOQService
    {
        private readonly BOQRepository bOQRepository;
        private readonly JobsRepository jobsRepo;
        public BOQService(BOQRepository bOQRepository, JobsRepository jobsRepository)
        {
            this.bOQRepository = bOQRepository;
            this.jobsRepo = jobsRepository;
        }

        public int CreateBOQ(BOQ bOQ)
        {
            var res = bOQRepository.Insert(bOQ.AutoMapObject<BOQ, DesignBOQ>());
            return res.DesignId;
        }

        public void DeleteBOQ(int BOQId)
        {
            throw new NotImplementedException();
        }

        public BOQ GetBOQ(int BOQId)
        {
            var design = bOQRepository.GetById(b => b.DesignId == BOQId);
            return design.AutoMapObject<DesignBOQ, BOQ>();
        }

        public IEnumerable<BOQ> GetBOQs()
        {
            return bOQRepository.GetAll().Select(b => b.AutoMapObject<DesignBOQ, BOQ>());
        }

        public IEnumerable<BOQ> GetBOQsByJobId(int jobId)
        {
            return bOQRepository
                .SearchData(b => b.JobId == jobId)
                .Select(b => b.AutoMapObject<DesignBOQ, BOQ>());
        }

        public IEnumerable<BOQ> GetBOQsByPOId(int POId)
        {
            var res = jobsRepo
                .SearchData(j => j.POId == POId)
                .SelectMany(j => bOQRepository
                                .SearchData(b => b.JobId == j.JobId));

            return res.Select(b => b.AutoMapObject<DesignBOQ, BOQ>());
        }

        public IEnumerable<BOQ> GetBOQsByElementId(int elementId)
        {
            var res = jobsRepo
                .SearchData(j => j.ElementId == elementId)
                .SelectMany(j => bOQRepository
                                .SearchData(b => b.JobId == j.JobId));

            return res.Select(b => b.AutoMapObject<DesignBOQ, BOQ>());
        }

        public void UpdateBOQ(BOQ bOQ)
        {
            var original = bOQRepository.GetById(b => b.DesignId == bOQ.DesignId);
            bOQRepository.Update(original, bOQ.AutoMapObject<BOQ, DesignBOQ>());
        }

    }
}
