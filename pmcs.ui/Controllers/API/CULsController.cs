using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Model.Contracts;
using pmcs.Core;
using System.Web;
using pmcs.Model.DTOs;

namespace pmcs.ui.Controllers.API
{
    public class CULsController : SecuredBaseAPIController
    {
        private readonly ICULsService cULsService;
        public CULsController(ICULsService cULsService)
        {
            this.cULsService = cULsService;
        }

        [HttpPost]
        [Route("api/CULs/PostCUL")]
        public IHttpActionResult PostCUL(CUL cUL)
        {
            if (cUL == null) return BadRequest("CUL object is not present the request body");
            try
            {
                cUL.CreatedDate = DateTime.Now;
                cULsService.InsertCUL(cUL);
                var culs = cULsService.GetCULs();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/CULs/CULsItemsList.cshtml", culs);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/CULs/UpdateCUL")]
        public IHttpActionResult PutPost(CUL cUL)
        {
            if (cUL == null) return BadRequest("CUL object is not present the request body");
            try
            {
                var original = cULsService.GetCUL(cUL.CULId);
                cUL.CreatedDate = original.CreatedDate;
                cUL.CreatedBy = original.CreatedBy;
                cULsService.UpdateCUL(cUL);
                var culs = cULsService.GetCULs();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/CULs/CULsItemsList.cshtml", culs);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/CULs/GetCUL/{culId}")]
        public IHttpActionResult GetCUL(int culId)
        {
            if (culId <= 0) return BadRequest("CUL item Id is not present the request url.");
            try
            {
                return Ok(cULsService.GetCUL(culId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/CULs/GetCULs")]
        public IHttpActionResult GetCULs()
        {
            //if (culId <= 0) return BadRequest("CUL item Id is not present the request url.");
            try
            {
                return Ok(cULsService.GetCULs());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/CULs/GetCULsPaged/{pageSize}/{pageNumber}")]
        public IHttpActionResult GetCULsPaged(int pageSize, int pageNumber)
        {
            try
            {
                int numberOfPages = 0;
                int totalNumberOfItems = 0;
                var culsPaged = cULsService.GetCULsPaged(pageSize, pageNumber, ref numberOfPages, ref totalNumberOfItems).ToList();
                return Ok(new { pageSize = pageSize, data = culsPaged, totalNumberOfRecords = totalNumberOfItems });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/CULs/GetCULsDataTable")]
        public IHttpActionResult GetCULsDataTable()
        {
            try
            {
                var culs = cULsService.GetCULs().ToList();
                var res = culs.Select(c => new[] { c.CULId.ToString(), c.Code, c.Description, c.Discount.ToString(), c.UnitPrice.ToString(), c.UnitOfMeasure, "<button id='BtnEditCUL_" + c.CULId.ToString() + "' class='btn btn-primary'><i class='fa fa-refresh'></i>Edit</button>" });

                return Ok(new
                {
                    //draw = 1,
                    recordsTotal = culs.Count,
                    recordsFiltered = culs.Count,
                    data = res
                });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/CULs/GetGroupCULs/{groupId}")]
        public IHttpActionResult GetGroupCULs(int groupId)
        {
            if (groupId <= 0) return BadRequest("group Id is not present the request url.");
            try
            {
                var culs = cULsService
                    .GetGroupCULItems(groupId)
                    .Select(cg => cULsService.GetCUL(cg.CULItemId))
                    .ToList();
                return Ok(culs);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/CULs/SearchCULs/{searchText}")]
        public IHttpActionResult SearchCULs(string searchText)
        {
            if (string.IsNullOrEmpty(searchText)) return BadRequest("search Text is not present the request url.");
            try
            {
                searchText = HttpUtility.HtmlEncode(searchText);
                var culs = cULsService.SearchCULs(searchText);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/CULs/CULsItemsList.cshtml", culs);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/CULs/PostCULGroup")]
        public IHttpActionResult PostCULGroup(CULGroupAndCULItems cULGroup)
        {
            if (cULGroup == null) return BadRequest("CUL object is not present the request body");
            try
            {
                cULGroup.CreatedDate = DateTime.Now;
                var newCULGroupId = cULsService.InsertCULGroup(cULGroup.AutoMapObject<CULGroupAndCULItems, CULGroup>());

                var culsIds = cULGroup.CULItemsIds;
                foreach (var culId in culsIds)
                {
                    cULsService.InsertCULGroupCULItem(new CULGroupCULs()
                    {
                        CreatedDate = DateTime.Now,
                        CULGroupId = newCULGroupId,
                        CULItemId = culId,
                        IsActive = true
                    });
                }

                var groups = cULsService.GetCULGroups();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/CULs/CULsGroupsList.cshtml", groups);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/CULs/GetCULGroup/{groupId}")]
        public IHttpActionResult GetCULGroup(int groupId)
        {
            if (groupId <= 0) return BadRequest("CUL item Id is not present the request url.");
            try
            {
                return Ok(cULsService.GetCULGroup(groupId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/CULs/GetCULGroups")]
        public IHttpActionResult GetCULGroups()
        {
            try
            {
                return Ok(cULsService.GetCULGroups());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/CULs/UpdateCULGroup")]
        public IHttpActionResult PutCULGroup(CULGroupAndCULItems group)
        {
            if (group == null) return BadRequest("CUL Group object is not present the request body");
            try
            {
                var original = cULsService.GetCULGroup(group.CULGroupId);
                group.CreatedDate = original.CreatedDate;
                group.CreatedBy = original.CreatedBy;
                cULsService.UpdateCULGroup(group.AutoMapObject<CULGroupAndCULItems, CULGroup>());

                cULsService.DeleteCULGroupCULItemByGroupId(group.CULGroupId);
                var selectedGroupCuls = group.CULItemsIds;
                foreach (var selectedCULId in selectedGroupCuls)
                {
                    cULsService.InsertCULGroupCULItem(new CULGroupCULs()
                    {
                        CreatedDate = DateTime.Now,
                        CULGroupId = group.CULGroupId,
                        CULItemId = selectedCULId,
                        IsActive = true
                    });
                }


                var culs = cULsService.GetCULGroups();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/CULs/CULsGroupsList.cshtml", culs);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
