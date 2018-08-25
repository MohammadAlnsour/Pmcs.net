using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Model.Contracts;
using pmcs.Core;

namespace pmcs.ui.Controllers.API
{
    public class SitesController : SecuredBaseAPIController
    {
        private readonly ISitesLookupService sitesLookupService;
        private readonly ISitesService sitesService;

        public SitesController(ISitesLookupService sitesLookupService, ISitesService sitesService)
        {
            this.sitesLookupService = sitesLookupService;
            this.sitesService = sitesService;
        }

        [HttpGet]
        [Route("api/Sites/GetSiteTypes")]
        public IHttpActionResult GetSiteTypes()
        {
            try
            {
                return Ok(sitesLookupService.GetSiteTypes());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Sites/GetSiteOwners")]
        public IHttpActionResult GetSiteOwners()
        {
            try
            {
                return Ok(sitesLookupService.GetSiteOwners());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Sites/GetGoveronates")]
        public IHttpActionResult GetGoveronates()
        {
            try
            {
                return Ok(sitesLookupService.GetGovernorates());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Sites/GetDistricts")]
        public IHttpActionResult GetDistricts()
        {
            try
            {
                return Ok(sitesLookupService.GetDistricts());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Sites/EditSite")]
        public IHttpActionResult EditSite(Site site)
        {
            if (site == null) return BadRequest("The site object can't be found in the request body.");

            try
            {
                site.CreatedDate = DateTime.Now;
                sitesService.UpdateSite(site);
                var sites = sitesService.GetSites();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Sites/SitesList.cshtml", sites);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/Sites/PostSite")]
        public IHttpActionResult PostSite(Site site)
        {
            if (site == null) return BadRequest("The site object can't be found in the request body.");

            try
            {
                site.CreatedDate = DateTime.Now;
                sitesService.CreateSite(site);
                var sites = sitesService.GetSites();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Sites/SitesList.cshtml", sites);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Sites/GetSites")]
        public IHttpActionResult GetSites()
        {
            try
            {
                return Ok(sitesService.GetSites());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Sites/GetSite/{siteId}")]
        public IHttpActionResult GetSite(int siteId)
        {
            if (siteId <= 0) return BadRequest("site Id not passed");
            try
            {
                return Ok(sitesService.GetSite(siteId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
