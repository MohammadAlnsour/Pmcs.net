using Microsoft.VisualStudio.TestTools.UnitTesting;
using pmcs.DB;
using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Tests
{
    [TestClass]
    public class AuthServiceTests : IDisposable
    {
        private UsersAccountsRepository respository;
        private RolesModulesMappingsRepository mappingRepo;
        private RolesRepository rolesRep;
        private UsersAccountsRepository usersRepo;
        private UsersRolesRepository usersRolesRepo;
        private PmcsDbContext _context;

        public void Dispose()
        {
            _context.Dispose();
        }

        [TestMethod]
        public void TestGetUserMappingSheet()
        {
            _context = new PmcsDbContext();
            this.respository = new UsersAccountsRepository(_context);
            this.mappingRepo = new RolesModulesMappingsRepository(_context);
            this.rolesRep = new RolesRepository(_context);
            this.usersRepo = new UsersAccountsRepository(_context);
            this.usersRolesRepo = new UsersRolesRepository(_context);

            var authService = new AuthService(respository, mappingRepo, rolesRep, usersRepo, usersRolesRepo);
            var results = authService.GetUserMappingsSheet(3);

            Assert.AreEqual(results.Count(), 29);
        }

    }
}
