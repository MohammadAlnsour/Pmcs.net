using pmcs.Core;
using pmcs.DB;
using pmcs.Model;
using pmcs.Models;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services
{
    public class AuthService : IAuthService
    {
        private readonly UsersAccountsRepository _respository;
        private readonly RolesModulesMappingsRepository mappingRepo;
        private readonly RolesRepository rolesRep;
        private readonly UsersAccountsRepository usersRepo;
        private readonly UsersRolesRepository usersRolesRepository;

        public AuthService(UsersAccountsRepository respository,
            RolesModulesMappingsRepository mappingRepo,
            RolesRepository rolesRep,
            UsersAccountsRepository usersRepo,
            UsersRolesRepository usersRolesRepository)
        {
            this._respository = respository;
            this.mappingRepo = mappingRepo;
            this.rolesRep = rolesRep;
            this.usersRepo = usersRepo;
            this.usersRolesRepository = usersRolesRepository;
        }

        public void AssignRoleModulesMapping(int roleId, IEnumerable<DB.SystemModule> modules)
        {
            throw new NotImplementedException();
        }

        public UserAccountModel AuthenticateUser(string username, string password)
        {
            var account = _respository.GetUserByUsernameAndPassword(username, password);
            if (account != null)
                return new UserAccountModel()
                {
                    DepartmentId = account.DepartmentId,
                    DistrictId = account.DistrictId,
                    Email = account.Email,
                    FullName = account.FullName,
                    IsAdministrator = account.IsAdministrator,
                    Mobile = account.Mobile,
                    RoleId = account.RoleId,
                    UserId = account.UserId,
                    UserName = account.UserName,
                    UserRolesIds = account.UserRolesIds
                };
            return null;
        }

        public Role CreateRole(Role role)
        {
            throw new NotImplementedException();
        }

        public UsersAccount CreateUserAccount(UsersAccount user)
        {
            return _respository.Insert(user);
        }
        public void AddUserRoles(int userId, string rolesIds)
        {
            var roles = rolesIds.Split(",".ToArray());
            foreach (var role in roles)
            {
                usersRolesRepository.Insert(new UsersRole()
                {
                    CreatedDate = DateTime.Now,
                    IsActive = true,
                    RoleId = Convert.ToInt32(role),
                    UserId = userId
                });
            }
        }
        public void DeleteUserRoles(int userId)
        {
            usersRolesRepository.DeleteUserRolesByUserId(userId);
        }

        public void DeleteRoleModulesMappings(int roleId)
        {
            throw new NotImplementedException();
        }

        public void DisableUser(int userId)
        {
            _respository.Disable(userId);
        }

        public void EditRole(Role role)
        {
            throw new NotImplementedException();
        }

        public void EditUserAccount(UserAccountModel user)
        {
            var dbuser = _respository.GetById(u => u.UserId == user.UserId);
            dbuser.Email = user.Email;
            dbuser.FullName = user.FullName;
            dbuser.IsActive = true;
            dbuser.IsAdministrator = user.IsAdministrator;
            dbuser.Mobile = user.Mobile;
            dbuser.Password = user.Password;
            dbuser.UserId = user.UserId;
            dbuser.UserName = user.UserName;
            dbuser.UserRolesIds = user.UserRolesIds;
            var originl = _respository.GetById(u => u.UserId == user.UserId);
            _respository.Update(originl, dbuser);
        }

        public void EnableUser(int userId)
        {
            _respository.Enable(userId);
        }

        public IEnumerable<UserAccountModel> GetAllUsersAccounts()
        {
            return _respository.GetAll().Select(u => new UserAccountModel()
            {
                DepartmentId = u.DepartmentId,
                DistrictId = u.DistrictId,
                Email = u.Email,
                FullName = u.FullName,
                IsAdministrator = u.IsAdministrator,
                Mobile = u.Mobile,
                RoleId = u.RoleId,
                UserId = u.UserId,
                UserName = u.UserName,
                UserRolesIds = u.UserRolesIds,
                IsActive = u.IsActive
            });
        }

        public IEnumerable<UserAccountModel> GetInspectorUsers()
        {
            var userIds = usersRolesRepository
                //.SearchData(r => r.RoleId == 2)
                .GetAll()
                .Select(r => r.UserId)
                .ToList();

            var inspectors = _respository
                .SearchData(u => userIds.Contains(u.UserId))
                .Select(u => u.AutoMapObject<DB.UsersAccount, UserAccountModel>());
            return inspectors;
        }

        public IEnumerable<int> GetUserRoles(int userId)
        {
            var userIds = usersRolesRepository
                .SearchData(r => r.UserId == userId)
                .Select(r => r.RoleId)
                .ToList();

            return userIds;
            //var inspectors = _respository
            //    .SearchData(u => userIds.Contains(u.UserId))
            //    .Select(u => u.AutoMapObject<DB.UsersAccount, UserAccountModel>());
            //return inspectors;
        }

        /// <summary>
        /// Returns each user views:modules mapping permissions sheet
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public IEnumerable<UserMappingsSheet> GetUserMappingsSheet(int userId)
        {
            var user = usersRepo.GetById(u => u.UserId == userId);
            if (user == null) throw new Exception("User Id not valid");
            var userRolesArr = user.UserRolesIds.Split(",".ToCharArray());
            var usersRoles = userRolesArr.Select(r => Convert.ToInt32(r));

            return usersRoles.SelectMany(r =>
            {
                var dbMappings = mappingRepo.SearchData(m => m.RoleId == r).ToList();
                return dbMappings.Select(m => new UserMappingsSheet()
                {
                    ModuleId = m.ModuleId,
                    Delete = m.CanDelete,
                    MappingId = m.MappingId,
                    Read = m.CanRead,
                    ViewId = m.ViewId ?? 0,
                    Write = m.CanWrite
                });

            });
        }

        public Models.UserAccountModel GetUsersAccount(int userId)
        {
            var dbUser = _respository.GetById(u => u.UserId == userId);
            return new UserAccountModel()
            {
                DepartmentId = dbUser.DepartmentId,
                DistrictId = dbUser.DistrictId,
                Email = dbUser.Email,
                FullName = dbUser.FullName,
                IsActive = dbUser.IsActive,
                IsAdministrator = dbUser.IsAdministrator,
                Mobile = dbUser.Mobile,
                RoleId = dbUser.RoleId,
                UserId = dbUser.UserId,
                UserName = dbUser.UserName,
                UserRolesIds = dbUser.UserRolesIds,
                Password = dbUser.Password
            };
        }

        public bool IsInRole(int userId, int roleId)
        {
            var userRoles = usersRepo.GetById(r => r.UserId == userId).UserRolesIds;
            return userRoles.Contains(roleId.ToString());
        }

    }
}
