using pmcs.DB;
using pmcs.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model;

namespace pmcs.Services.Interfaces
{
    public interface IModulesService
    {
        DB.SystemModule CreateModule(DB.SystemModule module);
        void UpdateModule(DB.SystemModule module);
        void DeleteModule(DB.SystemModule module);
        IEnumerable<Model.SystemModule> GetAllModules(int maxRows = 1000);
        Model.SystemModule GetModuleById(int id);
        IEnumerable<Model.SystemModule> GetModulesPaged(int pageNumber, int pageSize);
        IEnumerable<Model.SystemModule> QueryModules(Expression<Func<DB.SystemModule, bool>> where);
        IEnumerable<Model.SystemModule> QueryModulesPaged(Expression<Func<DB.SystemModule, bool>> where, int pageNumber, int pageSize);
        void EnableModule(int moduleId);
        void DisableModule(int moduleId);

    }
}
