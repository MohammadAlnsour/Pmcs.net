using pmcs.Model;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Services
{
    public class RolesService : IRolesService
    {
        private RolesRepository rolesRepository;
        private readonly RolesModulesMappingsRepository mappingRepo;
        private readonly ModulesRepository moduleRepo;
        private readonly SystemViewsRepository viewsRepository;

        public RolesService(RolesRepository repo,
            RolesModulesMappingsRepository mappingRepo,
            ModulesRepository moduleRepo,
            SystemViewsRepository viewsRepository)
        {
            rolesRepository = repo;
            this.mappingRepo = mappingRepo;
            this.moduleRepo = moduleRepo;
            this.viewsRepository = viewsRepository;
        }
        public int CreateRole(SystemRole role)
        {
            Role dbRole = new Role()
            {
                CreatedDate = role.CreatedDate,
                IsActive = role.IsActive,
                RoleId = role.RoleId,
                RoleName = role.RoleName
            };
            return rolesRepository.Insert(dbRole).RoleId;
        }
        public void DisableRole(int roleId)
        {
            rolesRepository.DisableRole(roleId);
        }
        public void EditRole(SystemRole role)
        {
            var original = rolesRepository.GetById(r => r.RoleId == role.RoleId);
            Role dbRole = rolesRepository.GetById(r => r.RoleId == role.RoleId);
            dbRole.RoleName = role.RoleName;
            rolesRepository.Update(original, dbRole);
        }
        public void EnableRole(int roleId)
        {
            rolesRepository.EnableRole(roleId);
        }
        public IEnumerable<Model.RolesModulesMapping> GetRoleModulesMappingsList()
        {
            return mappingRepo.GetAll().Select(m => new Model.RolesModulesMapping()
            {
                CanDelete = m.CanDelete,
                CanNavigate = m.CanNavigate,
                CanRead = m.CanRead,
                CanWrite = m.CanWrite,
                CreatedBy = m.CreatedBy,
                CreatedDate = m.CreatedDate,
                FullControll = m.FullControll,
                MappingId = m.MappingId,
                ModuleId = m.ModuleId,
                RoleId = m.RoleId,
                ModuleName = moduleRepo.GetById(mod => mod.ModuleId == m.ModuleId).ModuleName,
                RoleName = rolesRepository.GetById(rol => rol.RoleId == m.RoleId).RoleName,
                ViewName = viewsRepository.GetById(view => view.ViewId == m.ViewId).ViewName
            });
        }
        public SystemRole GetSystemRole(int roleId)
        {
            var dbRole = rolesRepository.GetById(r => r.RoleId == roleId);
            return new SystemRole()
            {
                CreatedDate = dbRole.CreatedDate,
                IsActive = dbRole.IsActive,
                RoleId = dbRole.RoleId,
                RoleName = dbRole.RoleName
            };
        }
        public IEnumerable<SystemRole> GetSystemRoles()
        {
            return rolesRepository
                 .GetAll()
                 .Select(r => new SystemRole()
                 {
                     RoleName = r.RoleName,
                     RoleId = r.RoleId,
                     IsActive = r.IsActive,
                     CreatedDate = r.CreatedDate
                 });
        }
        public IEnumerable<Model.RolesModulesMapping> GetViewsModulesMappingByModuleIdAndRoleId(int moduleId, int roleId)
        {
            var mappings = mappingRepo.GetMappingListByRoleAndModuleId(moduleId, roleId).ToList();
            if (mappings.Any())
            {
                return mappings
                    .Select(m => new Model.RolesModulesMapping()
                    {
                        CanDelete = m.CanDelete,
                        CanNavigate = m.CanNavigate,
                        CanRead = m.CanRead,
                        CanWrite = m.CanWrite,
                        CreatedBy = m.CreatedBy,
                        CreatedDate = m.CreatedDate,
                        FullControll = m.FullControll,
                        MappingId = m.MappingId,
                        ModuleId = m.ModuleId,
                        RoleId = m.RoleId,
                        ModuleName = (moduleRepo.GetById(mod => mod.ModuleId == m.ModuleId) != null ? moduleRepo.GetById(mod => mod.ModuleId == m.ModuleId).ModuleName : ""),
                        RoleName = (rolesRepository.GetById(rol => rol.RoleId == m.RoleId) != null ? rolesRepository.GetById(rol => rol.RoleId == m.RoleId).RoleName : ""),
                        ViewName = (viewsRepository.GetById(view => view.ViewId == m.ViewId) != null ? viewsRepository.GetById(view => view.ViewId == m.ViewId).ViewName : "")
                    });
            }
            return null;
        }

        public void EditRolesModulesMapping(Model.RolesModulesMapping mapping)
        {
            var original = mappingRepo.GetById(r => r.MappingId == mapping.MappingId);
            var map = mappingRepo.GetById(r => r.MappingId == mapping.MappingId);
            map.CanDelete = mapping.CanDelete;
            map.CanRead = mapping.CanRead;
            map.CanWrite = mapping.CanWrite;
            map.CanNavigate = mapping.CanRead;
            map.FullControll = mapping.CanWrite;
            mappingRepo.Update(original, map);
        }

        public IEnumerable<Model.SystemView> GetSystemViews()
        {
            return viewsRepository.GetAll().Select(v => new Model.SystemView()
            {
                CreatedBy = v.CreatedBy,
                CreatedDate = v.CreatedDate,
                IsActive = v.IsActive,
                ViewId = v.ViewId,
                ViewModuleId = v.ViewModuleId,
                ViewName = v.ViewName
            });
        }
        public void InsertInitailRolePermissionsSheet(int roleId)
        {
            var views = viewsRepository.GetAll();

            mappingRepo.BulkInsert(views.Select(v => new DB.RolesModulesMapping()
            {
                CanDelete = false,
                CanNavigate = false,
                CanRead = false,
                CanWrite = false,
                CreatedBy = 0,
                CreatedDate = DateTime.Now,
                FullControll = false,
                ModuleId = v.ViewModuleId,
                RoleId = roleId,
                ViewId = v.ViewId
            }));
        }

    }
}
