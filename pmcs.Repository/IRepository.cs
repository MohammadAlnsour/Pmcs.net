using pmcs.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Repository
{
    public interface IRepository<T> where T : class
    {
        T GetById(Expression<Func<T, bool>> where);
        IEnumerable<T> GetAll(int maxRows = 1000);
        T Insert(T entity);
        IEnumerable<T> BulkInsert(IEnumerable<T> entities);
        void Update(T originalEntity, T updatedEntity);
        void Delete(T entity);
        List<T> GetPaged(int pageSize, int pageNumber, string spName, ref int numberOfPages, ref int totalNumberOfItems);
        IEnumerable<T> SearchData(Expression<Func<T, bool>> where);
        IEnumerable<T> SearchDataPaged(Expression<Func<T, bool>> where, int pageSize, int pageNumber);

    }
}
