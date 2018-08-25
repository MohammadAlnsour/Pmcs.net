using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    public class LookupsController : SecuredBaseAPIController
    {
        private readonly IContractsLookupsService contractsLookupsService;
        private readonly IAssetsLookupService assetsLookupService;
        private readonly IModulesService modulesService;

        public LookupsController(IContractsLookupsService contractsLookupsService,
            IAssetsLookupService assetsLookupService,
            IModulesService modulesService)
        {
            this.contractsLookupsService = contractsLookupsService;
            this.assetsLookupService = assetsLookupService;
            this.modulesService = modulesService;
        }

        [HttpGet]
        [Route("api/Lookups/GetCurrencies")]
        public IHttpActionResult GetCurrencies()
        {
            try
            {
                return Ok(contractsLookupsService.GetCurrencies());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Lookups/GetJobTypes")]
        public IHttpActionResult GetJobTypes()
        {
            try
            {
                return Ok(contractsLookupsService.GetJobsType());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Lookups/GetPATStatusTypes")]
        public IHttpActionResult GetPATStatusTypes()
        {
            try
            {
                return Ok(contractsLookupsService.GetPATStatusTypes());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/Lookups/GetInvoiceClassifications")]
        public IHttpActionResult GetInvoiceClassifications()
        {
            try
            {
                return Ok(contractsLookupsService.GetInvoiceClassificationTypes());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/Lookups/GetManufacturers")]
        public IHttpActionResult GetManufacturers()
        {
            try
            {
                return Ok(assetsLookupService.GetManufacturers());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [HttpGet]
        [Route("api/Lookups/GetInventoryCategories")]
        public IHttpActionResult GetInventoryCategories()
        {
            try
            {
                return Ok(assetsLookupService.GetInventoryCategories());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/Lookups/GetSystemModules")]
        public IHttpActionResult GetSystemModules()
        {
            try
            {
                return Ok(modulesService.GetAllModules());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
