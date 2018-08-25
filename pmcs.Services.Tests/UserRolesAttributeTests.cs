using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using pmcs.Auth.UsersAuth;
using pmcs.DB;
using pmcs.Repository.EntitiesRepos;

namespace pmcs.Services.Tests
{
    [TestClass]
    public class UserRolesAttributeTests
    {
        private UsersAccountsRepository respository;
        private RolesModulesMappingsRepository mappingRepo;
        private RolesRepository rolesRep;
        private UsersAccountsRepository usersRepo;
        private PmcsDbContext _context;

        [TestMethod]
        public void TestPmcsUserRolesAuthAttribute()
        {
            _context = new PmcsDbContext();
            this.respository = new UsersAccountsRepository(_context);
            this.mappingRepo = new RolesModulesMappingsRepository(_context);
            this.rolesRep = new RolesRepository(_context);
            this.usersRepo = new UsersAccountsRepository(_context);

        }
    }
}
