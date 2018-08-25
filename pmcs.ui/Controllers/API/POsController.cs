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
    public class POsController : SecuredBaseAPIController
    {
        private readonly IPOsService pOsService;
        public POsController(IPOsService pOsService)
        {
            this.pOsService = pOsService;
        }

        [HttpPost]
        [Route("api/POs/PostPO")]
        public IHttpActionResult PostPO(POs po)
        {
            if (po == null) return BadRequest("PO object is not present the request body");
            try
            {
                po.CreatedDate = DateTime.Now;
                po.IsActive = true;
                po.POClassificationId = 1;

                pOsService.CreatePO(po);
                var POs = pOsService.GetPOs();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/POs/POsList.cshtml", POs);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/POs/GetPOs")]
        public IHttpActionResult GetPOs()
        {
            try
            {
                return Ok(pOsService.GetPOs());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/POs/GetPO/{POId}")]
        public IHttpActionResult GetPO(int POId)
        {
            if (POId <= 0) return BadRequest("POId cannot be found in the request object");
            try
            {
                return Ok(pOsService.GetPO(POId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPut]
        [Route("api/POs/EditPO")]
        public IHttpActionResult EditPO(POs po)
        {
            if (po == null) return BadRequest("PO object is not present the request body");
            try
            {
                //po.CreatedDate = DateTime.Now;
                //po.IsActive = true;
                //po.POClassificationId = 1;
                var original = pOsService.GetPO(po.PoId);
                po.CreatedDate = original.CreatedDate;
                po.POClassificationId = 1;
                pOsService.EditPO(po);

                var POs = pOsService.GetPOs();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/POs/POsList.cshtml", POs);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }
}
