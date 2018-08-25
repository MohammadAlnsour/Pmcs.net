using pmcs.Core;
using pmcs.ExcelHandler;
using pmcs.Model.Contracts;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Data;

namespace pmcs.ui.Controllers.API
{
    public class BOQsController : SecuredBaseAPIController
    {
        private readonly IBOQService boqsService;
        private readonly ICULsService cULsService;
        private readonly IJobsService jobsService;

        public BOQsController(IBOQService boqsService, ICULsService cULsService, IJobsService jobsService)
        {
            this.boqsService = boqsService;
            this.cULsService = cULsService;
            this.jobsService = jobsService;
        }

        [HttpPost]
        [Route("api/BOQs/PostBOQ")]
        public IHttpActionResult PostBOQ(BOQ BOQ)
        {
            if (BOQ == null) return BadRequest("BOQ object cannot be found in the request body.");
            try
            {
                BOQ.CreatedDate = DateTime.Now;
                BOQ.PATIssueDate = DateTime.Now;
                boqsService.CreateBOQ(BOQ);

                var boqs = boqsService.GetBOQs();
                //.Select(j => j.AutoMapObject<pmcs.DB.DesignBOQ, BOQ>());
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/BOQs/BOQsList.cshtml", boqs);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/BOQs/ParseBOQDesignExcel")]
        public IHttpActionResult ParseBOQDesignExcel(string filePath)
        {
            if (string.IsNullOrEmpty(filePath)) return BadRequest("BOQ design excel cannot be found in the request body.");
            try
            {
                //http://localhost:56735/FilesContainer/file.pdf
                var fileName = filePath.Substring(filePath.LastIndexOf("/") + 1);
                var PhysicalPath = HttpContext.Current.Server.MapPath("~/FilesContainer/") + fileName;
                var validationResults = DesignBOQExcelValidator.ValidateBOQExcelFile(PhysicalPath);
                if (validationResults.Any())
                {
                    return BadRequest(JsonConvert.SerializeObject(validationResults));
                }

                var boqsTable = OLEDbExcelReader.ReadExcelWorkbook(PhysicalPath);
                foreach (DataRow boqRow in boqsTable.Rows)
                {
                    var culs = cULsService.SearchCULs(boqRow[1].ToString()).ToList();
                    var culId = culs.Any() ? culs[0].CULId : 0;

                    var jobNumber = boqRow[0].ToString();
                    var jobs = jobsService.SearchJobs(j => j.JobNumber == jobNumber).ToList();
                    var jobId = jobs.Any() ? jobs[0].JobId : 0;

                    var boq = new pmcs.Model.Contracts.BOQ()
                    {
                        CreatedDate = DateTime.Now,
                        PATIssueDate = DateTime.Now,
                        CULId = culId,
                        FOC = double.Parse(boqRow[3].ToString()),
                        IsFOC = (boqRow[5].ToString() == "true" ? true : false),
                        JobId = jobId,
                        Payable = double.Parse(boqRow[4].ToString()),
                        Quantity = double.Parse(boqRow[2].ToString()),
                        IsActive = true
                    };

                    boqsService.CreateBOQ(boq);
                }

                var boqs = boqsService.GetBOQs();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/BOQs/BOQsList.cshtml", boqs);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //[HttpPut]
        //[Route("api/Jobs/EditJob")]
        //public IHttpActionResult EditJob(Job job)
        //{
        //    if (job == null) return BadRequest("Job object cannot be found in the request body.");
        //    try
        //    {
        //        job.CreatedDate = DateTime.Now;
        //        boqsService.EditJob(job);

        //        var jobs = boqsService.GetJobs().Select(j => j.AutoMapObject<Job, Model.ViewModels.JobsListViewModel>());
        //        var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Jobs/JobsList.cshtml", jobs);
        //        return Ok(partialView);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet]
        //[Route("api/Jobs/GetJob/{jobId}")]
        //public IHttpActionResult GetJob(int jobId)
        //{
        //    if (jobId <= 0) return BadRequest("job id connot be found in the request body.");
        //    try
        //    {
        //        return Ok(boqsService.GetJob(jobId));
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet]
        //[Route("api/Jobs/GetJobs")]
        //public IHttpActionResult GetJobs()
        //{
        //    try
        //    {
        //        return Ok(boqsService.GetJobs());
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

    }
}
