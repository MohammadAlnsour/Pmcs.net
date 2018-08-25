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
    public class ElementsController : SecuredBaseAPIController
    {
        private readonly IElementsService elementsService;
        public ElementsController(IElementsService elementsService)
        {
            this.elementsService = elementsService;
        }

        [HttpPost]
        [Route("api/Elements/PostElement")]
        public IHttpActionResult PostElement(Element element)
        {
            if (element == null) return BadRequest("element cannot be found in the request body request");
            try
            {
                element.CreatedDate = DateTime.Now;
                elementsService.CreateElement(element);

                var elements = elementsService.GetElements();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Elements/ElementsList.cshtml", elements);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Elements/EditElement")]
        public IHttpActionResult EditElement(Element element)
        {
            if (element == null) return BadRequest("element cannot be found in the request body request");
            try
            {
                var original = elementsService.GetElement(element.ElementId);
                element.IsActive = true;
                element.CreatedDate = original.CreatedDate;
                elementsService.EditElement(element);

                var elements = elementsService.GetElements();
                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Elements/ElementsList.cshtml", elements);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Elements/GetElements")]
        public IHttpActionResult GetElements()
        {
            try
            {
                return Ok(elementsService.GetElements());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Elements/GetElement/{elementId}")]
        public IHttpActionResult GetElement(int elementId)
        {
            if (elementId <= 0) return BadRequest("element Id connot be found in the request body");
            try
            {
                return Ok(elementsService.GetElement(elementId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
