using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Service.BlogPostService.Dto
{
    public class UpdateBlogPostDto
    {
        public int post_id { get; set; }

        public string post_date { get; set; }

        public string post_time { get; set; }

        public int post_user_id { get; set; }
        public string post_title { get; set; }
        public string post_content { get; set; }
    }
}