using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Common.TokenModule.Models
{
    public class JwtTokenModel
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int Expires { get; set; }
        public string Security { get; set; }
        public int user_id { get; set; }
  

        public string user_access_role { get; set; }

    }
}