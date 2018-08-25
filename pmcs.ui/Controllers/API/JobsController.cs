using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    public class JobsController : SecuredBaseAPIController
    {
        private readonly IJobsService jobsService;
        public JobsController(IJobsService jobsService)
        {
            this.jobsService = jobsService;
        }

        [HttpPost]
        [Route("api/Jobs/PostJob")]
        public IHttpActionResult PostJob(Job job)
        {
            if (job == null) return BadRequest("Job object cannot be found in the request body.");
            try
            {
                job.CreatedDate = DateTime.Now;
                jobsService.CreateJob(job);
                if (job.ProjectTaskId != null)
                    jobsService.UpdateJobTaskActualStartDate((int)job.ProjectTaskId);

                var jobs = jobsService
                    .GetJobs()
                    .Select(j => j.AutoMapObject<Job, Model.ViewModels.JobsListViewModel>());
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Jobs/JobsList.cshtml", jobs);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Jobs/EditJob")]
        public IHttpActionResult EditJob(Job job)
        {
            if (job == null) return BadRequest("Job object cannot be found in the request body.");
            try
            {
                job.CreatedDate = DateTime.Now;
                jobsService.EditJob(job);

                var jobs = jobsService.GetJobs().Select(j => j.AutoMapObject<Job, Model.ViewModels.JobsListViewModel>());
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Jobs/JobsList.cshtml", jobs);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJob/{jobId}")]
        public IHttpActionResult GetJob(int jobId)
        {
            if (jobId <= 0) return BadRequest("job id connot be found in the request body.");
            try
            {
                return Ok(jobsService.GetJob(jobId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetJobs")]
        public IHttpActionResult GetJobs()
        {
            try
            {
                return Ok(jobsService.GetJobs());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
