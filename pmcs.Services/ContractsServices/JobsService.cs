using pmcs.Business.Projects;
using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.ContractsServices
{
    public class JobsService : IJobsService
    {
        private readonly JobsRepository jobsRepository;
        private readonly AsBuiltRepository asBuiltRepository;
        private readonly PATRepository pATRepository;
        private readonly OILsRepository oILsRepository;
        private readonly ProjectTasksRepository projectTasksRepository;

        public JobsService(JobsRepository jobsRepository,
                           AsBuiltRepository asBuiltRepository,
                           PATRepository pATRepository,
                           OILsRepository oILsRepository,
                           ProjectTasksRepository projectTasksRepository)
        {
            this.jobsRepository = jobsRepository;
            this.asBuiltRepository = asBuiltRepository;
            this.pATRepository = pATRepository;
            this.oILsRepository = oILsRepository;
            this.projectTasksRepository = projectTasksRepository;
        }

        public int CreateJob(Job job)
        {
            var res = jobsRepository.Insert(job.AutoMapObject<Job, DB.Job>());
            return res.JobId;
        }

        public void UpdateJobTaskActualStartDate(int taskId)
        {
            TasksHandler.UpdateTaskActualStartDate(taskId);
        }


        public void DeleteAsBuilt(int asBuiltId)
        {
            asBuiltRepository.Delete(asBuiltRepository.GetById(b => b.Id == asBuiltId));
        }

        public void DeleteOIL(int OILId)
        {
            oILsRepository.Delete(oILsRepository.GetById(b => b.OILId == OILId));
        }

        public void DeletePAT(int PATId)
        {
            pATRepository.Delete(pATRepository.GetById(b => b.PATId == PATId));
        }

        public void EditAsBuilt(AsBuilt asBuilt)
        {
            var original = asBuiltRepository.GetById(b => b.Id == asBuilt.Id);
            asBuiltRepository.Update(original, asBuilt.AutoMapObject<AsBuilt, DB.AsBuilt>());
        }

        public void EditJob(Job job)
        {
            var original = jobsRepository.GetById(b => b.JobId == job.JobId);
            jobsRepository.Update(original, job.AutoMapObject<Job, DB.Job>());
        }

        public void EditOIL(JobsOIL oIL)
        {
            var original = oILsRepository.GetById(b => b.OILId == oIL.OILId);
            oILsRepository.Update(original, oIL.AutoMapObject<JobsOIL, DB.JobsOIL>());
        }

        public void EditPAT(PAT pAT)
        {
            var original = pATRepository.GetById(b => b.PATId == pAT.PATId);
            pATRepository.Update(original, pAT.AutoMapObject<PAT, DB.PAT>());
        }

        public AsBuilt GetAsBuilt(int asBuiltId)
        {
            return asBuiltRepository.GetById(b => b.Id == asBuiltId).AutoMapObject<DB.AsBuilt, AsBuilt>();
        }

        public Job GetJob(int jobId)
        {
            return jobsRepository.GetById(b => b.JobId == jobId).AutoMapObject<DB.Job, Job>();
        }

        public IEnumerable<AsBuilt> GetJobAsBuilt(int jobId)
        {
            return asBuiltRepository
                 .SearchData(b => b.JobId == jobId)
                 .Select(b => b.AutoMapObject<DB.AsBuilt, AsBuilt>())
                 .OrderByDescending(c => c.Id);
        }

        public IEnumerable<JobsOIL> GetJobOILs(int jobId)
        {
            return oILsRepository
                .SearchData(o => o.JobId == jobId)
                .Select(o => o.AutoMapObject<DB.JobsOIL, JobsOIL>())
                .OrderByDescending(c => c.OILId);
        }

        public IEnumerable<PAT> GetJobPATs(int jobId)
        {
            return pATRepository
                   .SearchData(p => p.JobId == jobId)
                   .Select(p => p.AutoMapObject<DB.PAT, PAT>())
                   .OrderByDescending(c => c.PATId);
        }

        public IEnumerable<Job> GetJobs()
        {
            return jobsRepository
                    .GetAll()
                    .Select(j => j.AutoMapObject<DB.Job, Job>())
                    .OrderByDescending(c => c.JobId);
        }

        public IEnumerable<Job> SearchJobs(Expression<Func<DB.Job, bool>> where)
        {
            return jobsRepository
                    .SearchData(where)
                    .Select(j => j.AutoMapObject<DB.Job, Job>())
                    .OrderByDescending(c => c.JobId);
        }

        public JobsOIL GetOIL(int OILId)
        {
            return oILsRepository
                .GetById(o => o.OILId == OILId)
                .AutoMapObject<DB.JobsOIL, JobsOIL>();
        }

        public PAT GetPAT(int PATId)
        {
            return pATRepository.GetById(b => b.PATId == PATId).AutoMapObject<DB.PAT, PAT>();
        }

        public IEnumerable<AsBuilt> GetPOAsBuilt(int POId)
        {
            return asBuiltRepository
            .SearchData(b => b.Job.POId == POId)
            .Select(b => b.AutoMapObject<DB.AsBuilt, AsBuilt>())
            .OrderByDescending(c => c.Id);
        }

        public IEnumerable<Job> GetPOJobs(int POId)
        {
            return jobsRepository
                    .SearchData(j => j.POId == POId)
                    .Select(j => j.AutoMapObject<DB.Job, Job>())
                    .OrderByDescending(c => c.JobId);
        }

        public IEnumerable<PAT> GetPOPATs(int POId)
        {
            return pATRepository
           .SearchData(p => p.Job.POs.PoId == POId)
           .Select(p => p.AutoMapObject<DB.PAT, PAT>())
           .OrderByDescending(c => c.PATId);
        }

        public int InsertAsBuilt(AsBuilt asBuilt)
        {
            var res = asBuiltRepository.Insert(asBuilt.AutoMapObject<AsBuilt, DB.AsBuilt>());
            return res.Id;
        }

        public int InsertOIL(JobsOIL oIL)
        {
            var res = oILsRepository.Insert(oIL.AutoMapObject<JobsOIL, DB.JobsOIL>());
            return res.OILId;
        }

        public int InsertPAT(PAT pAT)
        {
            var res = pATRepository.Insert(pAT.AutoMapObject<PAT, DB.PAT>());
            return res.PATId;
        }

    }
}
