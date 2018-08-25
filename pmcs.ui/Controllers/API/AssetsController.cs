using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Model.Assets;
using pmcs.Core;
using pmcs.Model.DTOs;

namespace pmcs.ui.Controllers.API
{
    public class AssetsController : SecuredBaseAPIController
    {
        private readonly IAssetsManagementService assetsManagementService;
        public AssetsController(IAssetsManagementService assetsManagementService)
        {
            this.assetsManagementService = assetsManagementService;
        }

        [HttpPost]
        [Route("api/Assets/PostInventory")]
        public IHttpActionResult PostInventory(SiteInventory inventory)
        {
            if (inventory == null) return BadRequest("inventory must be passed to the body of the http request");
            try
            {
                inventory.CreatedDate = DateTime.Now;
                assetsManagementService.CreateSiteInventory(inventory);

                var inventories = assetsManagementService.GetSiteInventories();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Assets/InventoryList.cshtml", inventories);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Assets/GetInventory/{inventoryId}")]
        public IHttpActionResult GetInventory(int inventoryId)
        {
            if (inventoryId <= 0) return BadRequest("inventory Id cannot be found in the request body");
            try
            {
                return Ok(assetsManagementService.GetSiteInventory(inventoryId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Assets/EditInventory")]
        public IHttpActionResult EditInventory(SiteInventory inventory)
        {
            if (inventory == null) return BadRequest("inventory must be passed to the body of the http request");
            try
            {
                inventory.CreatedDate = DateTime.Now;
                assetsManagementService.EditSiteInventory(inventory);

                var inventories = assetsManagementService.GetSiteInventories();
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Assets/InventoryList.cshtml", inventories);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/Assets/GetInventoryItem/{itemId}")]
        public IHttpActionResult GetInventoryItem(int itemId)
        {
            if (itemId <= 0) return BadRequest("inventory Id cannot be found in the request body");
            try
            {
                return Ok(assetsManagementService.GetSiteInventoryItem(itemId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Assets/GetInventoryItemsByParentItemId/{parentItemId}")]
        public IHttpActionResult GetInventoryItemsByParentItemId(int parentItemId)
        {
            if (parentItemId <= 0) return BadRequest("inventory Id cannot be found in the request body");
            try
            {
                return Ok(assetsManagementService.GetSiteInventoryItem(parentItemId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Assets/GetItemsByInventoryId/{inventoryId}")]
        public IHttpActionResult GetItemsByInventoryId(int inventoryId)
        {
            if (inventoryId <= 0) return BadRequest("inventory Id cannot be found in the request body");
            try
            {
                return Ok(assetsManagementService.GetSiteInventoryItemsByInventoryId(inventoryId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Assets/GetInventoryItemsRootNodes/{inventoryId}")]
        public IHttpActionResult GetInventoryItemsRootNodes(int inventoryId)
        {
            if (inventoryId <= 0) return BadRequest("inventory Id cannot be found in the request body");
            try
            {
                List<InventoryItemTreeTable> items = new List<InventoryItemTreeTable>();
                var rootItems = assetsManagementService
                    .GetInventoryItemsRootNodes(inventoryId)
                    .Select((t, i) =>
                    {
                        var tt = t.AutoMapObject<SiteInventoryItem, InventoryItemTreeTable>();
                        tt.DataTTId = (i + 1).ToString();
                        tt.DataTTParentId = string.Empty;
                        return tt;
                    })
                    .ToList();

                foreach (var item in rootItems)
                {
                    items.Add(item);
                    items.AddRange(GetSubTreeInventoryItemRecursevly(item.ItemId, item.DataTTId));
                }
                return Ok(items);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        public List<InventoryItemTreeTable> GetSubTreeInventoryItemRecursevly(int parentItemId, string parentTTId)
        {
            var childItemsNode = new List<InventoryItemTreeTable>();

            var childNodes = assetsManagementService
                .GetSiteInventoryItemsByParentItemId(parentItemId)
                .Select((t, i) =>
                {
                    var tt = t.AutoMapObject<SiteInventoryItem, InventoryItemTreeTable>();
                    tt.DataTTId = parentTTId + "-" + (i + 1).ToString();
                    tt.DataTTParentId = parentTTId;
                    return tt;
                })
                .ToList();

            foreach (var child in childNodes)
            {
                childItemsNode.Add(child);
                childItemsNode.AddRange(GetSubTreeInventoryItemRecursevly(child.ItemId, child.DataTTId));
            }
            return childItemsNode;
        }


        [HttpPost]
        [Route("api/Assets/PostItem")]
        public IHttpActionResult PostItem(SiteInventoryItem item)
        {
            if (item == null) return BadRequest("item must be passed to the body of the http request");
            try
            {
                item.CreatedDate = DateTime.Now;
                assetsManagementService.CreateSiteInventoryItem(item);

                List<InventoryItemTreeTable> items = new List<InventoryItemTreeTable>();
                var rootItems = assetsManagementService
                    .GetInventoryItemsRootNodes(item.SiteInventoryId)
                    .Select((t, i) =>
                    {
                        var tt = t.AutoMapObject<SiteInventoryItem, InventoryItemTreeTable>();
                        tt.DataTTId = (i + 1).ToString();
                        tt.DataTTParentId = string.Empty;
                        return tt;
                    })
                    .ToList();

                foreach (var invItem in rootItems)
                {
                    items.Add(invItem);
                    items.AddRange(GetSubTreeInventoryItemRecursevly(invItem.ItemId, invItem.DataTTId));
                }

                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Assets/ItemsTreeTable.cshtml", items);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Assets/EditItem")]
        public IHttpActionResult EditItem(SiteInventoryItem item)
        {
            if (item == null) return BadRequest("item must be passed to the body of the http request");
            try
            {
                item.CreatedDate = DateTime.Now;
                assetsManagementService.EditSiteInventoryItem(item);

                List<InventoryItemTreeTable> items = new List<InventoryItemTreeTable>();
                var rootItems = assetsManagementService
                    .GetInventoryItemsRootNodes(item.SiteInventoryId)
                    .Select((t, i) =>
                    {
                        var tt = t.AutoMapObject<SiteInventoryItem, InventoryItemTreeTable>();
                        tt.DataTTId = (i + 1).ToString();
                        tt.DataTTParentId = string.Empty;
                        return tt;
                    })
                    .ToList();

                foreach (var invItem in rootItems)
                {
                    items.Add(invItem);
                    items.AddRange(GetSubTreeInventoryItemRecursevly(invItem.ItemId, invItem.DataTTId));
                }

                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Assets/ItemsTreeTable.cshtml", items);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
