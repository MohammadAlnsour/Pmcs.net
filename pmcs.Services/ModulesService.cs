using pmcs.DB;
using pmcs.Repository;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model;

namespace pmcs.Services
{
    public class ModulesService : IModulesService
    {
        ModulesRepository _repository;
        public ModulesService(ModulesRepository repository)
        {
            _repository = repository;
        }
        public DB.SystemModule CreateModule(DB.SystemModule module)
        {
            return _repository.Insert(module);
        }

        public void DeleteModule(DB.SystemModule module)
        {
            _repository.Delete(module);
        }

        public void DisableModule(int moduleId)
        {
            _repository.Disable(moduleId);
        }

        public void EnableModule(int moduleId)
        {
            _repository.Enable(moduleId);
        }

        public IEnumerable<Model.SystemModule> GetAllModules(int maxRows = 1000)
        {
            return _repository.GetAll(maxRows).Select(m => new Model.SystemModule()
            {
                CreatedDate = m.CreatedDate,
                IsActive = m.IsActive,
                ModuleId = m.ModuleId,
                ModuleName = m.ModuleName
            });
        }

        public Model.SystemModule GetModuleById(int id)
        {
            var m = _repository.GetById(mo => mo.ModuleId == id);

            return new Model.SystemModule()
            {
                CreatedDate = m.CreatedDate,
                IsActive = m.IsActive,
                ModuleId = m.ModuleId,
                ModuleName = m.ModuleName
            };
        }

        public IEnumerable<Model.SystemModule> GetModulesPaged(int pageNumber, int pageSize)
        {
            int numberOfPages = 1;
            int totalNumberOfRecords = 0;
            return _repository.GetPaged(pageSize, pageNumber, "", ref numberOfPages, ref totalNumberOfRecords).Select(m => new Model.SystemModule()
            {
                CreatedDate = m.CreatedDate,
                IsActive = m.IsActive,
                ModuleId = m.ModuleId,
                ModuleName = m.ModuleName
            });
        }

        public IEnumerable<Model.SystemModule> QueryModules(Expression<Func<DB.SystemModule, bool>> where)
        {
            return _repository.SearchData(where).Select(m => new Model.SystemModule()
            {
                CreatedDate = m.CreatedDate,
                IsActive = m.IsActive,
                ModuleId = m.ModuleId,
                ModuleName = m.ModuleName
            });
        }

        public IEnumerable<Model.SystemModule> QueryModulesPaged(Expression<Func<DB.SystemModule, bool>> where, int pageNumber, int pageSize)
        {
            return _repository.SearchDataPaged(where, pageSize, pageNumber).Select(m => new Model.SystemModule()
            {
                CreatedDate = m.CreatedDate,
                IsActive = m.IsActive,
                ModuleId = m.ModuleId,
                ModuleName = m.ModuleName
            });
        }

        public void UpdateModule(DB.SystemModule module)
        {
            var original = _repository.GetById(m => m.ModuleId == module.ModuleId);
            _repository.Update(original, module);
        }

    }
}
