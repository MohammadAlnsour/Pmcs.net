using pmcs.Model.Assets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class InventoryDetailsViewModel
    {
        public SiteInventory Inventory { get; set; }
        public IEnumerable<SiteInventoryItem> InventoryItems { get; set; }


    }
}
