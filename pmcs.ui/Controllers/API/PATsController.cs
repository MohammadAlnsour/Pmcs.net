using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Notifications.Config;
using pmcs.Notifications;

namespace pmcs.ui.Controllers.API
{
    public class PATsController : SecuredBaseAPIController
    {
        private readonly IJobsService jobsService;
        private readonly IProjectManagementService projectManagementService;
        private readonly IProjectsService projectsService;
        private readonly IAuthService authService;

        public PATsController(IJobsService jobsService,
            IProjectManagementService projectManagementService,
            IProjectsService projectsService,
            IAuthService authService)
        {
            this.jobsService = jobsService;
            this.projectManagementService = projectManagementService;
            this.projectsService = projectsService;
            this.authService = authService;
        }

        [HttpGet]
        [Route("api/PATs/GetPATsByJobId/{jobId}")]
        public IHttpActionResult GetPATsByJobId(int jobId)
        {
            try
            {
                return Ok(jobsService.GetJobPATs(jobId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/PATs/GetPATById/{patId}")]
        public IHttpActionResult GetPATById(int patId)
        {
            if (patId < 0) return BadRequest("pat id has not been passed to the api");
            try
            {
                return Ok(jobsService.GetPAT(patId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/PATs/PostPAT")]
        [HttpPost]
        public IHttpActionResult PostPAT(PAT PAT)
        {
            if (PAT == null) return BadRequest("pat object cannot be found the http request body");
            try
            {
                PAT.CreatedDate = DateTime.Now;
                var id = jobsService.InsertPAT(PAT);
                var projectTaskId = jobsService.GetJob(PAT.JobId).ProjectTaskId;
                if (projectTaskId != null)
                {
                    projectsService.FinishTaskPercentage((int)projectTaskId);
                }
                var inspectors = authService.GetInspectorUsers().ToList();
                Notification.Email(inspectors, NotificationObjectType.PAT, PAT);
                Notification.System(inspectors, NotificationObjectType.PAT, User.UserId, Url.Link("JobDetails", new { id = PAT.JobId }), PAT);
                //Notification.OnEmailNotification += (a1, a2) =>
                //{
                //    return new EmailStatus();
                //};
                // Log.Inforamtion(Type.Sql, "log title", "log body")
                // Log.Error(Type.Sql, "log title", "log body")
                // Log.Warning(Type.Csv, "log title", "log text")

                var pats = jobsService.GetJobPATs(PAT.JobId);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Jobs/PATs.cshtml", pats);

                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [Route("api/PATs/EditPAT")]
        [HttpPost]
        public IHttpActionResult EditPAT(PAT PAT)
        {
            if (PAT == null) return BadRequest("pat object cannot be found the http request body");
            try
            {
                PAT.CreatedDate = DateTime.Now;
                jobsService.EditPAT(PAT);

                var pats = jobsService.GetJobPATs(PAT.JobId);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Jobs/PATs.cshtml", pats);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
