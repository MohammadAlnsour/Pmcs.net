using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Services.LookupServices;
using pmcs.Services.Interfaces;

namespace pmcs.ui.Controllers.API
{
    public class ContractorsController : ApiController
    {
        private readonly IContractorsLookupService contractorsLookupService;
        public ContractorsController(IContractorsLookupService contractorsLookupService)
        {
            this.contractorsLookupService = contractorsLookupService;
        }

        [HttpGet]
        [Route("api/Contractors/GetContractors")]
        public IHttpActionResult GetContractors()
        {
            try
            {
                return Ok(contractorsLookupService.GetContractors());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
