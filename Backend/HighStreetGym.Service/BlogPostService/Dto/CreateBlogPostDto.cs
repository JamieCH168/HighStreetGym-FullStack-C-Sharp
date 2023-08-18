using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Service.BlogPostService.Dto
{
    public class CreateBlogPostDto
    {

        public int post_user_id { get; set; }
        public string post_title { get; set; }
        public string post_content { get; set; }
    }
}