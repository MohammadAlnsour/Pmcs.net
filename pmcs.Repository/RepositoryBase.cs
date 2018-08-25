using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Data.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.DB;
using pmcs.Core;

namespace pmcs.Repository
{
    public abstract class RepositoryBase<T> : IRepository<T> where T : class
    {
        PmcsDbContext _context;
        DbSet<T> _entities;

        public PmcsDbContext DbContext { get => _context; }
        public DbSet<T> DbSet { get => _entities; }

        public RepositoryBase(PmcsDbContext dbContext)
        {
            _context = dbContext;
            _entities = dbContext.Set<T>();
        }
        public void Delete(T entity)
        {
            if (entity == null) throw new ArgumentException("Id connot be 0", "id");
            try
            {
                _entities.Remove(entity);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                //log exception
            }
        }

        public IEnumerable<T> GetAll(int maxRows = 1000)
        {
            return _entities
                //.Reverse()
                //.OrderByDescending(e => e.GetSortingKeySelector())
                .Take(maxRows)
                .AsEnumerable<T>();
        }

        public T GetById(Expression<Func<T, bool>> where)
        {
            return _entities.Where(where).SingleOrDefault();
        }

        //public T GetById(int entityId)
        //{
        //    return _entities.Where(e => e.LookupEntityId == entityId).SingleOrDefault();
        //}

        public List<T> GetPaged(int pageSize, int pageNumber, string spName, ref int numberOfPages, ref int totalNumberOfItems)
        {
            //var sourceType = typeof(T);
            //var sourceProp = sourceType.GetProperty(primaryKeyName, typeof(int));
            //if (sourceProp == null)
            //    throw new Exception("this object does not contains an integer Id property, thus cannot sort it");
            var res = _context.GetObjectPaged<T>(pageSize, pageNumber, spName) as IEnumerable<T>;
            var recordsCount = _entities.Count();
            numberOfPages = (int)Math.Ceiling((double)recordsCount / (double)pageSize);
            totalNumberOfItems = _entities.Count();
            return res.ToList();
            //.OrderByDescending(e => (int)sourceProp.GetValue(sourceProp))
            ////.OrderByDescending(e => e)
            ////.Reverse()
            //.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();
        }

        public T Insert(T entity)
        {
            try
            {
                lock (_entities)
                {
                    _entities.Add(entity);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return entity;
        }

        public IEnumerable<T> BulkInsert(IEnumerable<T> entities)
        {
            lock (_entities)
            {
                _entities.AddRange(entities);
                _context.SaveChanges();
                return _entities;
            }
        }

        public IEnumerable<T> SearchData(Expression<Func<T, bool>> where)
        {
            return _entities
                .Where(where)
                //.Reverse()
                //.OrderByDescending(e => e.GetSortingKeySelector())
                .AsEnumerable();
        }

        public IEnumerable<T> SearchDataPaged(Expression<Func<T, bool>> where, int pageSize, int pageNumber)
        {
            return _entities.Where(where)
                //.OrderByDescending(e => e.GetSortingKeySelector())
                //.Reverse()
                .Skip((pageNumber * pageSize) - 1)
                .Take(pageSize).AsEnumerable();
        }
        //public abstract void Update(T entity);
        public void Update(T originalEntity, T updatedEntity)
        {
            DbContext.Entry(originalEntity).State = System.Data.Entity.EntityState.Detached;
            DbSet.Attach(updatedEntity);
            DbContext.Entry(updatedEntity).State = System.Data.Entity.EntityState.Modified;
            DbContext.SaveChanges();
        }
        public void Enable()
        {

        }
        public void Disable()
        {

        }

    }
}
