using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HighStreetGym.Common.TokenModule.Models;
using Microsoft.IdentityModel.Tokens;

namespace HighStreetGym.Common.TokenModule
{
    public class TokenHelper
    {
        public static string CreateToken(JwtTokenModel jwtTokenModel)
        {
            var claims = new[] {
                new Claim(ClaimTypes.Role, jwtTokenModel.user_access_role),
                new Claim("user_id", jwtTokenModel.user_id.ToString()),
                new Claim("user_access_role", jwtTokenModel.user_access_role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtTokenModel.Security));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtTokenModel.Issuer,
                audience: jwtTokenModel.Audience,
                expires: DateTime.Now.AddDays(jwtTokenModel.Expires),
                signingCredentials: creds,
                claims: claims);
            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            return accessToken;
        }
    }
}