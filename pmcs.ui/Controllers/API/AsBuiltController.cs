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
    public class AsBuiltController : SecuredBaseAPIController
    {
        private readonly IJobsService jobsService;
        public AsBuiltController(IJobsService jobsService)
        {
            this.jobsService = jobsService;
        }

        [HttpGet]
        [Route("api/AsBuilt/GetAsBuiltsByJobId/{jobId}")]
        public IHttpActionResult GetAsBuiltsByJobId(int jobId)
        {
            try
            {
                return Ok(jobsService.GetJobAsBuilt(jobId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/AsBuilt/GetAsBuiltById/{asBuiltId}")]
        public IHttpActionResult GetAsBuiltById(int asBuiltId)
        {
            if (asBuiltId < 0) return BadRequest("asbuilt id has not been passed to the api");
            try
            {
                return Ok(jobsService.GetAsBuilt(asBuiltId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/AsBuilt/PostAsBuilt")]
        [HttpPost]
        public IHttpActionResult PostAsBuilt(AsBuilt asBuiltObj)
        {
            if (asBuiltObj == null) return BadRequest("asbuilt object cannot be found the http request body");
            try
            {
                asBuiltObj.CreatedDate = DateTime.Now;
                var id = jobsService.InsertAsBuilt(asBuiltObj);

                var asBuilts = jobsService.GetJobAsBuilt(asBuiltObj.JobId);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Jobs/AsBuiltList.cshtml", asBuilts);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [Route("api/AsBuilt/EditAsBuilt")]
        [HttpPut]
        public IHttpActionResult EditAsBuilt(AsBuilt asBuiltObj)
        {
            if (asBuiltObj == null) return BadRequest("asbuilt object cannot be found the http request body");
            try
            {
                asBuiltObj.CreatedDate = DateTime.Now;
                jobsService.EditAsBuilt(asBuiltObj);

                var asBuilts = jobsService.GetJobAsBuilt(asBuiltObj.JobId);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Jobs/AsBuiltList.cshtml", asBuilts);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
