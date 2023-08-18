using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BCrypt.Net;
using HighStreetGym.Common.TokenModule;
using HighStreetGym.Common.TokenModule.Models;
using HighStreetGym.Domain;
using HighStreetGym.Service.UserService;
using HighStreetGym.Service.UserService.Dto;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;


namespace HighStreetGym.WebAPI.Controllers
{
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        private readonly ILogger<UserController> _logger;
        private readonly IMapper _mapping;

        public UserController(IUserService userService, IConfiguration configuration, ILogger<UserController> logger, IMapper mapping)
        {
            this._mapping = mapping;
            this._userService = userService;
            this._configuration = configuration;
            this._logger = logger;
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }


        [HttpGet("{userId}")]
        public async Task<ActionResult<User>> GetUserById(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            var userDto = _mapping.Map<UserDto>(user);
            return Ok(userDto);
        }


        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            try
            {
                var user = _mapping.Map<User>(userDto);
                // if (!user.user_password.StartsWith("$2a"))
                // {
                //     user.user_password = BCrypt.Net.BCrypt.HashPassword(user.user_password);
                // }
                user.user_password = BCrypt.Net.BCrypt.HashPassword(user.user_password);

                var createdUser = await _userService.CreateUserAsync(user);

                return Ok(new
                {
                    status = 200,
                    message = "Created user",
                    result = createdUser
                });
            }
            catch (Exception ex)
            {
                // Log the exception or perform any other necessary actions
                return StatusCode(500, new
                {
                    status = 500,
                    message = "An error occurred while creating user",
                    error = ex.Message
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            var user = await _userService.GetUserByEmailAsync(dto.user_email);
            if (user != null && BCrypt.Net.BCrypt.Verify(dto.user_password, user.user_password))
            {
                var jwtToken = GetToken(user.user_id, user.user_access_role);
                return Ok(new
                {
                    status = 200,
                    message = "User logged in",
                    user_id = user.user_id,
                    jwtToken
                });
            }
            else
            {
                return BadRequest(new
                {
                    status = 400,
                    message = "Invalid credentials"
                });
            }
        }

        private static List<string> tokenBlacklist = new List<string>();

        [Authorize(Roles = "admin,trainer,member")]
        [HttpPost("logout")]
        public IActionResult Logout([FromBody] TokenRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.JwtToken))
            {
                return BadRequest(new
                {
                    status = 400,
                    message = "Invalid JWT token"
                });
            }
            tokenBlacklist.Add(request.JwtToken);
            return Ok(new
            {
                status = 200,
                message = "User logged out"
            });
        }

        public class TokenRequest
        {
            public string JwtToken { get; set; }
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto userDto)

        {
            try
            {
                var user = _mapping.Map<User>(userDto);
                if (!user.user_password.StartsWith("$2a"))
                {
                    user.user_password = BCrypt.Net.BCrypt.HashPassword(user.user_password);
                }

                if (user.user_id == null)
                {
                    return NotFound(new
                    {
                        status = 404,
                        message = "Cannot find user to update without ID"
                    });
                }

                var updatedUser = await _userService.UpdateUserAsync(user);

                return Ok(new
                {
                    status = 200,
                    message = "User updated",
                    user = updatedUser
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to update user"
                });
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{userId}")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteUserByID(int userId)
        {
            try
            {
                await _userService.DeleteUserByIDAsync(userId);

                return Ok(new
                {
                    status = 200,
                    message = "User deleted successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to delete user",
                    error = ex.Message
                });
            }
        }

        private string GetToken(int user_id, string user_access_role)
        {
            var token = _configuration.GetSection("Jwt").Get<JwtTokenModel>();
            token.user_id = user_id;
            token.user_access_role = user_access_role;
            return TokenHelper.CreateToken(token);
        }


    }
}