using HighStreetGym.Domain;
using HighStreetGym.Service.UserService.Dto;

namespace HighStreetGym.Service.UserService
{
    public interface IUserService
    {
        public Task<User> GetUserByEmailAsync(string user_email);
        public Task<List<User>> GetAllUsersAsync();
        public Task<User> GetUserByIdAsync(int userId);
        public Task<User> CreateUserAsync(User user);
        public Task<User> UpdateUserAsync(User updatedUser);
        public Task DeleteUserByIDAsync(int userId);
        // public Task<User> GetUserByAuthenticationKeyAsync(string authenticationKey);
    }

}