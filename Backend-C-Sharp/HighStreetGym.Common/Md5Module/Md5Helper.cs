using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace HighStreetGym.Common.Md5Module
{
    public static class Md5Helper
    {
        public static string ToMd5(this string str)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] bytes = md5.ComputeHash(Encoding.Default.GetBytes(str + "@HolyAce"));
            var md5Str = BitConverter.ToString(bytes).Replace("-", "");
            return md5Str;
        }
    }
}