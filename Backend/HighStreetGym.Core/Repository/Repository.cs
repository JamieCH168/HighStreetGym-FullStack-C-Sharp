using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using HighStreetGym.Core.Core;
using HighStreetGym.Domain;
using Microsoft.EntityFrameworkCore;

namespace HighStreetGym.Core.Repository
{

    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
        //  where TEntity : BaseEntity
    {
        protected readonly HighStreetGymDbContext _context;
        public Repository(HighStreetGymDbContext context)
        {
            this._context = context;

        }
        public async Task<List<TEntity>> GetListAsync()
        {
            var dbSet = _context.Set<TEntity>();
            return await dbSet.ToListAsync();
        }

        // public async Task<List<TEntity>> GetListAsync(Func<TEntity, bool> predicate)
        // {
        //     var dbSet = _context.Set<TEntity>().AsQueryable();
        //     return await dbSet.Where(predicate).ToListAsync();
        // }


        // 使用 Expression<Func<TEntity, bool>> 作为参数
        public async Task<List<TEntity>> GetListAsync(Expression<Func<TEntity, bool>> predicate)
        {
            var dbSet = _context.Set<TEntity>().AsQueryable();
            return await dbSet.Where(predicate).ToListAsync();
        }

        public TEntity Get(Func<TEntity, bool> predicate)
        {
            var dbSet = _context.Set<TEntity>();
            return dbSet.FirstOrDefault(predicate);
        }
        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            var dbSet = _context.Set<TEntity>();
            return await dbSet.FirstOrDefaultAsync(predicate);
        }
        public TEntity Insert(TEntity entity)
        {
            var dbSet = _context.Set<TEntity>();
            var res = dbSet.Add(entity).Entity;
            _context.SaveChanges();
            return res;
        }
        public async Task<TEntity> InsertAsync(TEntity entity)
        {
            var dbSet = _context.Set<TEntity>();
            var res = (await dbSet.AddAsync(entity)).Entity;
            await _context.SaveChangesAsync();
            return res;
        }
        public TEntity Delete(TEntity entity)
        {
            var dbSet = _context.Set<TEntity>();
            var res = dbSet.Remove(entity).Entity;
            _context.SaveChanges();
            return res;
        }
        public async Task<TEntity> DeleteAsync(TEntity entity)
        {
            var dbSet = _context.Set<TEntity>();
            var res = dbSet.Remove(entity).Entity;
            await _context.SaveChangesAsync();
            return res;
        }
        public TEntity Update(TEntity entity)
        {
            var dbSet = _context.Set<TEntity>();
            var res = dbSet.Update(entity).Entity;
            _context.SaveChanges();
            return res;
        }
        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            var dbSet = _context.Set<TEntity>();
            var res = dbSet.Update(entity).Entity;
            await _context.SaveChangesAsync();
            return res;
        }

    }

    public class UserRepository : Repository<User>,IUserRepository
    {
        public UserRepository(HighStreetGymDbContext context) : base(context)
        {
        }

        public async Task<User> FindByUserEmailAsync(string email)
        {
            return await _context.user.FirstOrDefaultAsync(u => u.user_email == email);
        }
    }

}