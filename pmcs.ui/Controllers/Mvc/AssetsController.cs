using pmcs.Model.ViewModels;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.ui.Controllers.Mvc
{
    public class AssetsController : SecuredBaseController
    {
        private readonly IAssetsManagementService assetsManagementService;
        public AssetsController(IAssetsManagementService assetsManagementService)
        {
            this.assetsManagementService = assetsManagementService;
        }

        // GET: Assets
        public ActionResult Inventory()
        {
            ViewData["AssetsManagement"] = "active";
            var inventories = assetsManagementService.GetSiteInventories();
            return View(inventories);
        }
        public ActionResult InventoryDetails(int id)
        {
            ViewData["AssetsManagement"] = "active";
            var viewModel = new InventoryDetailsViewModel()
            {
                Inventory = assetsManagementService.GetSiteInventory(id),
                InventoryItems = assetsManagementService.GetSiteInventoryItemsByInventoryId(id)
            };
            return View(viewModel);
        }

    }
}