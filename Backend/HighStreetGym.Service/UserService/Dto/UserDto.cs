using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Service.UserService.Dto
{
    public class UserDto
    {
        public int user_id { get; set; }
        public string user_email { get; set; }
        public string user_password { get; set; }
        public string user_access_role { get; set; }
        public string user_phone { get; set; }
        public string user_first_name { get; set; }
        public string user_last_name { get; set; }
        public string user_address { get; set; }

    }
}