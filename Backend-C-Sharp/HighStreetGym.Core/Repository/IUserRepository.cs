using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighStreetGym.Domain;

namespace HighStreetGym.Core.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> FindByUserEmailAsync(string email);
    }

}