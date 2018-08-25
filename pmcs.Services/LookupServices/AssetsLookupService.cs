using pmcs.Model.Lookup;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.LookupRepos;
using pmcs.Core;
using pmcs.DB;

namespace pmcs.Services.LookupServices
{
    public class AssetsLookupService : IAssetsLookupService
    {
        private readonly InventoryCategoryRepository inventoryCategoryRepository;
        private readonly ManufacturersRepository manufacturersRepository;

        public AssetsLookupService(InventoryCategoryRepository inventoryCategoryRepository,
            ManufacturersRepository manufacturersRepository)
        {
            this.inventoryCategoryRepository = inventoryCategoryRepository;
            this.manufacturersRepository = manufacturersRepository;
        }
        public int CreateInventoryCategory(InventoryCategory inventoryCategory)
        {
            var res = inventoryCategoryRepository.Insert(inventoryCategory.AutoMapObject<InventoryCategory, DB.InventoriesCategory>());
            return res.CategoryId;
        }

        public int CreateManufacturer(Model.Lookup.Manufacturer manufacturer)
        {
            var res = manufacturersRepository.Insert(manufacturer.AutoMapObject<Model.Lookup.Manufacturer, DB.Manufacturer>());
            return res.ManufacturerId;
        }

        public void DeleteInventoryCategory(int categoryId)
        {
            throw new NotImplementedException();
        }

        public void DeleteManufacturer(int manufacturerId)
        {
            throw new NotImplementedException();
        }

        public void EditInventoryCategory(InventoryCategory inventoryCategory)
        {
            var original = inventoryCategoryRepository.GetById(s => s.CategoryId == inventoryCategory.CategoryId);
            inventoryCategoryRepository.Update(original, inventoryCategory.AutoMapObject<InventoryCategory, InventoriesCategory>());
        }

        public void EditManufacturer(Model.Lookup.Manufacturer manufacturer)
        {
            var original = manufacturersRepository.GetById(s => s.ManufacturerId == manufacturer.ManufacturerId);
            manufacturersRepository.Update(original, manufacturer.AutoMapObject<Model.Lookup.Manufacturer, DB.Manufacturer>());
        }

        public IEnumerable<InventoryCategory> GetInventoryCategories()
        {
            return inventoryCategoryRepository
                 .GetAll()
                 .Select(r => r.AutoMapObject<DB.InventoriesCategory, InventoryCategory>());
        }

        public InventoryCategory GetInventoryCategory(int categoryId)
        {
            return inventoryCategoryRepository
                .GetById(c => c.CategoryId == categoryId)
                .AutoMapObject<DB.InventoriesCategory, InventoryCategory>();
        }

        public Model.Lookup.Manufacturer GetManufacturer(int manufacturerId)
        {
            return manufacturersRepository
                 .GetById(c => c.ManufacturerId == manufacturerId)
                 .AutoMapObject<DB.Manufacturer, Model.Lookup.Manufacturer>();
        }

        public IEnumerable<Model.Lookup.Manufacturer> GetManufacturers()
        {
            return manufacturersRepository
                 .GetAll()
                 .Select(r => r.AutoMapObject<DB.Manufacturer, Model.Lookup.Manufacturer>());
        }

    }
}
