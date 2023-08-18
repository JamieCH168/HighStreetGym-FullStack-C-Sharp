using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighStreetGym.Core.Repository;
using HighStreetGym.Domain;
using HighStreetGym.Service.UserService.Dto;

namespace HighStreetGym.Service.UserService
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IUserRepository _userEmailRepo;

        public UserService(IRepository<User> userRepo, IUserRepository userEmailRepo)
        {
            this._userRepo = userRepo;
            this._userEmailRepo = userEmailRepo;
        }

        public async Task<User> GetUserByEmailAsync(string user_email)
        {
            return await _userRepo.GetAsync(m => m.user_email == user_email);
        }


        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepo.GetListAsync();
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _userRepo.GetAsync(user => user.user_id == userId);
        }

        public async Task<User> CreateUserAsync(User user)
        {

            var existingUser = await _userEmailRepo.FindByUserEmailAsync(user.user_email);
            if (existingUser != null)
            {
                throw new Exception("User with the provided email already exists.");
            }
            var createdUser = await _userRepo.InsertAsync(user);
            return createdUser;
        }

        public async Task<User> UpdateUserAsync(User updatedUser)
        {
            var existingUser = await _userRepo.GetAsync(user => user.user_id == updatedUser.user_id);

            if (existingUser == null)
            {
                throw new Exception($"User with ID {updatedUser.user_id} not found.");
            }
            existingUser.user_email = updatedUser.user_email;
            existingUser.user_password = updatedUser.user_password;
            existingUser.user_access_role = updatedUser.user_access_role;
            existingUser.user_phone = updatedUser.user_phone;
            existingUser.user_first_name = updatedUser.user_first_name;
            existingUser.user_last_name = updatedUser.user_last_name;
            existingUser.user_address = updatedUser.user_address;

            await _userRepo.UpdateAsync(existingUser);
            return existingUser;
        }

        // public async Task<User> GetUserByAuthenticationKeyAsync(string authenticationKey)
        // {
        //     return await _userRepo.GetAsync(user => user.user_authentication_key == authenticationKey);
        // }


        public async Task DeleteUserByIDAsync(int userId)
        {
            var existingUser = await _userRepo.GetAsync(user => user.user_id == userId);

            if (existingUser == null)
            {
                throw new Exception($"User with ID {userId} not found.");
            }

            await _userRepo.DeleteAsync(existingUser);
        }

    }
}