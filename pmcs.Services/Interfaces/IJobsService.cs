using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IJobsService
    {
        void EditJob(Job job);
        int CreateJob(Job job);
        void UpdateJobTaskActualStartDate(int taskId);
        IEnumerable<Job> GetJobs();
        IEnumerable<Job> GetPOJobs(int POId);
        Job GetJob(int jobId);

        void EditAsBuilt(AsBuilt asBuilt);
        int InsertAsBuilt(AsBuilt asBuilt);
        IEnumerable<AsBuilt> GetJobAsBuilt(int jobId);
        IEnumerable<AsBuilt> GetPOAsBuilt(int POId);
        AsBuilt GetAsBuilt(int asBuiltId);
        void DeleteAsBuilt(int asBuiltId);

        void EditPAT(PAT pAT);
        int InsertPAT(PAT pAT);
        IEnumerable<PAT> GetJobPATs(int jobId);
        IEnumerable<PAT> GetPOPATs(int POId);
        PAT GetPAT(int PATId);
        void DeletePAT(int PATId);


        void EditOIL(JobsOIL oIL);
        int InsertOIL(JobsOIL oIL);
        IEnumerable<JobsOIL> GetJobOILs(int jobId);
        JobsOIL GetOIL(int OILId);
        void DeleteOIL(int OILId);

        IEnumerable<Job> SearchJobs(Expression<Func<DB.Job, bool>> where);

    }
}
