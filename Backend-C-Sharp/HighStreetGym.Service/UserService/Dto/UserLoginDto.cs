using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Service.UserService.Dto
{
    #nullable disable warnings
    public class UserLoginDto
    {
        [Required(ErrorMessage = "Customer Number is required.")]
        public string user_email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        public string user_password { get; set; }
    }
}