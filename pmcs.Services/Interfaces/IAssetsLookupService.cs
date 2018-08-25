using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Lookup;

namespace pmcs.Services.Interfaces
{
    public interface IAssetsLookupService
    {
        int CreateManufacturer(Manufacturer manufacturer);
        void EditManufacturer(Manufacturer manufacturer);
        Manufacturer GetManufacturer(int manufacturerId);
        IEnumerable<Manufacturer> GetManufacturers();
        void DeleteManufacturer(int manufacturerId);


        int CreateInventoryCategory(InventoryCategory inventoryCategory);
        void EditInventoryCategory(InventoryCategory inventoryCategory);
        InventoryCategory GetInventoryCategory(int categoryId);
        IEnumerable<InventoryCategory> GetInventoryCategories();
        void DeleteInventoryCategory(int categoryId);


    }
}
