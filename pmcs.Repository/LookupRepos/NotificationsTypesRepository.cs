using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;

namespace pmcs.Repository.EntitiesRepos
{
    public class NotificationsTypesRepository : RepositoryBase<NotifiactionsType>
    {
        public NotificationsTypesRepository(PmcsDbContext dbContext) : base(dbContext)
        {
        }
        //public override void Update(NotifiactionsType entity)
        //{
        //    var originalObject = GetById(e => e.TypeId == entity.TypeId);
        //    DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;
        //    DbSet.Attach(entity);
        //    DbContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        //    DbContext.SaveChanges();
        //}
        public void UpdateNotificationText(int typeId, string newNotificationTemplateText)
        {
            var originalObject = GetById(e => e.TypeId == typeId);
            DbContext.Entry(originalObject).State = System.Data.Entity.EntityState.Detached;

            var cloneObject = GetById(e => e.TypeId == typeId);
            cloneObject.NotificationText = newNotificationTemplateText;
            DbSet.Attach(cloneObject);
            DbContext.Entry(cloneObject).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
        }

    }
}
