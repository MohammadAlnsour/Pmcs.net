using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;
using pmcs.Model.Assets;
using pmcs.Core;
using pmcs.Services.Interfaces;

namespace pmcs.Services.AssetsServices
{
    public class AssetsManagementService : IAssetsManagementService
    {
        private readonly SiteInventoryRepository siteInventoryRepository;
        private readonly SiteInventoryItemsRepository siteInventoryItemsRepository;
        public AssetsManagementService(SiteInventoryRepository siteInventoryRepository,
            SiteInventoryItemsRepository siteInventoryItemsRepository)
        {
            this.siteInventoryRepository = siteInventoryRepository;
            this.siteInventoryItemsRepository = siteInventoryItemsRepository;
        }

        public int CreateSiteInventory(SiteInventory siteInventory)
        {
            var res = siteInventoryRepository.Insert(siteInventory.AutoMapObject<SiteInventory, DB.SiteInventory>());
            return res.SiteId;
        }

        public int CreateSiteInventoryItem(SiteInventoryItem siteInventoryItem)
        {
            var res = siteInventoryItemsRepository.Insert(siteInventoryItem.AutoMapObject<SiteInventoryItem, DB.SiteInventoryItem>());
            return res.ItemId;
        }

        public void DeleteSiteInventoryItem(int itemId)
        {
            throw new NotImplementedException();
        }

        public void EditSiteInventory(SiteInventory siteInventory)
        {
            var original = siteInventoryRepository.GetById(s => s.InventoryId == siteInventory.InventoryId);
            siteInventoryRepository.Update(original, siteInventory.AutoMapObject<SiteInventory, DB.SiteInventory>());
        }

        public void EditSiteInventoryItem(SiteInventoryItem siteInventoryItem)
        {
            var original = siteInventoryItemsRepository.GetById(s => s.ItemId == siteInventoryItem.ItemId);
            siteInventoryItemsRepository.Update(original, siteInventoryItem.AutoMapObject<SiteInventoryItem, DB.SiteInventoryItem>());
        }

        public IEnumerable<SiteInventory> GetSiteInventories()
        {
            return siteInventoryRepository
                .GetAll()
                .Select(i => i.AutoMapObject<DB.SiteInventory, SiteInventory>())
                .OrderByDescending(c => c.InventoryId);
        }

        public SiteInventory GetSiteInventory(int inventoryId)
        {
            return siteInventoryRepository
                  .GetById(i => i.InventoryId == inventoryId)
                  .AutoMapObject<DB.SiteInventory, SiteInventory>();
        }

        public IEnumerable<SiteInventory> GetSiteInventoryBySiteId(int siteId)
        {
            return siteInventoryRepository
               .SearchData(i => i.SiteId == siteId)
               .Select(i => i.AutoMapObject<DB.SiteInventory, SiteInventory>())
               .OrderByDescending(c => c.InventoryId);
        }

        public SiteInventoryItem GetSiteInventoryItem(int itemId)
        {
            return siteInventoryItemsRepository
                 .GetById(i => i.ItemId == itemId)
                 .AutoMapObject<DB.SiteInventoryItem, SiteInventoryItem>();
        }

        public IEnumerable<SiteInventoryItem> GetSiteInventoryItemsByInventoryId(int inventoryId)
        {
            return siteInventoryItemsRepository
             .SearchData(i => i.SiteInventoryId == inventoryId)
             .Select(i => i.AutoMapObject<DB.SiteInventoryItem, SiteInventoryItem>())
             .OrderByDescending(c => c.ItemId);
        }

        public IEnumerable<SiteInventoryItem> GetInventoryItemsRootNodes(int inventoryId)
        {
            return siteInventoryItemsRepository
             .SearchData(i => i.SiteInventoryId == inventoryId && i.ParentItemId == null)
             .Select(i => i.AutoMapObject<DB.SiteInventoryItem, SiteInventoryItem>())
             .OrderByDescending(c => c.ItemId);
        }

        public IEnumerable<SiteInventoryItem> GetSiteInventoryItemsByParentItemId(int parentItemId)
        {
            return siteInventoryItemsRepository
             .SearchData(i => i.ParentItemId == parentItemId)
             .Select(i => i.AutoMapObject<DB.SiteInventoryItem, SiteInventoryItem>())
             .OrderByDescending(c => c.ItemId);
        }

        public IEnumerable<SiteInventoryItem> GetSiteInventoryItemsBySiteId(int siteId)
        {
            var inventories = siteInventoryRepository
               .SearchData(i => i.SiteId == siteId)
               .Select(i => i.InventoryId);

            return siteInventoryItemsRepository
           .SearchData(i => inventories.Contains(i.SiteInventoryId))
           .Select(i => i.AutoMapObject<DB.SiteInventoryItem, SiteInventoryItem>())
           .OrderByDescending(c => c.ItemId);
        }
    }
}
