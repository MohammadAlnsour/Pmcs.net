using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    public class TasksController : SecuredBaseAPIController
    {
        private readonly ITasksService tasksService;
        private readonly IPOsService pOsService;
        public TasksController(ITasksService tasksService, IPOsService pOsService)
        {
            this.tasksService = tasksService;
            this.pOsService = pOsService;
        }

        [HttpGet]
        [Route("api/Tasks/GetTasksByProjectId/{projectId}")]
        public IHttpActionResult GetTasksByProjectId(int projectId)
        {
            if (projectId <= 0) return BadRequest("Project Id must be passed to the API");
            try
            {
                return Ok(tasksService.GetTasksByProjectId(projectId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Tasks/GetTasksByPOId/{POId}")]
        public IHttpActionResult GetTasksByPOId(int POId)
        {
            if (POId <= 0) return BadRequest("po Id must be passed to the API");
            try
            {
                var projectId = pOsService.GetPO(POId).ProjectId;
                return Ok(tasksService.GetTasksByProjectId(projectId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        

    }
}
