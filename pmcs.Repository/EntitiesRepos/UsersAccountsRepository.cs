using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository.EntitiesRepos
{
    public class UsersAccountsRepository : RepositoryBase<UsersAccount>
    {
        public UsersAccountsRepository(PmcsDbContext context) : base(context)
        {
        }

        public void Enable(int id)
        {
            var user = GetById(m => m.UserId == id);
            DbContext.Entry(user).State = System.Data.Entity.EntityState.Detached;
            user.IsActive = true;
            DbSet.Attach(user);
            DbContext.Entry(user).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
        }

        public void Disable(int id)
        {
            var user = GetById(m => m.UserId == id);
            DbContext.Entry(user).State = System.Data.Entity.EntityState.Detached;
            user.IsActive = false;
            DbSet.Attach(user);
            DbContext.Entry(user).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
        }

        public UsersAccount GetUserByUsernameAndPassword(string username, string password)
        {
           var result = DbSet.Where(u => u.UserName.ToLower() == username.ToLower()
                        && u.Password == password).ToList();

            if(result.Any())
            {
                return result.FirstOrDefault();
            }

            return null;
        }

        //public override void Update(UsersAccount entity)
        //{
        //    var originalObject = GetById(e => e.UserId == entity.UserId);
        //    DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;
        //    DbSet.Attach(entity);
        //    DbContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        //    DbContext.SaveChanges();
        //}
    }
}
