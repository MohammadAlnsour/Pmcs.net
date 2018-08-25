using pmcs.Model.Assets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IAssetsManagementService
    {
        int CreateSiteInventory(SiteInventory siteInventory);
        void EditSiteInventory(SiteInventory siteInventory);
        IEnumerable<SiteInventory> GetSiteInventories();
        SiteInventory GetSiteInventory(int inventoryId);
        IEnumerable<SiteInventory> GetSiteInventoryBySiteId(int siteId);


        int CreateSiteInventoryItem(SiteInventoryItem siteInventoryItem);
        void EditSiteInventoryItem(SiteInventoryItem siteInventoryItem);
        IEnumerable<SiteInventoryItem> GetSiteInventoryItemsByInventoryId(int inventoryId);
        IEnumerable<SiteInventoryItem> GetSiteInventoryItemsBySiteId(int siteId);
        void DeleteSiteInventoryItem(int itemId);
        SiteInventoryItem GetSiteInventoryItem(int itemId);
        IEnumerable<SiteInventoryItem> GetSiteInventoryItemsByParentItemId(int parentItemId);
        IEnumerable<SiteInventoryItem> GetInventoryItemsRootNodes(int inventoryId);



    }
}
