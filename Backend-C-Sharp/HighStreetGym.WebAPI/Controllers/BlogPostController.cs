using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HighStreetGym.Domain;
using HighStreetGym.Service.BlogPostService;
using HighStreetGym.Service.BlogPostService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HighStreetGym.WebAPI.Controllers
{
    public class BlogPostController : BaseController
    {
        private readonly IBlogPostService _blogPostService;
        private readonly ILogger<BlogPostController> _logger;
        private readonly IMapper _mapping;

        public BlogPostController(IBlogPostService blogPostService, ILogger<BlogPostController> logger, IMapper mapping)
        {
            _blogPostService = blogPostService;
            _logger = logger;
            this._mapping = mapping;
        }

        [Authorize(Roles = "admin,trainer,member")]
        [HttpPost]

        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostDto blogPostDto)
        {
            try
            {
                var currentDateTime = DateTime.Now;
                var blogPost = new BlogPost
                {
                    post_user_id = blogPostDto.post_user_id,
                    post_title = blogPostDto.post_title,
                    post_content = blogPostDto.post_content,
                    post_date = currentDateTime.Date,
                    post_time = currentDateTime
                };

                var result = await _blogPostService.CreateBlogPostAsync(blogPost);

                var formattedPostDate = result.post_date.ToString("yyyy-MM-dd");
                var formattedPostTime = result.post_time.TimeOfDay.ToString(@"hh\:mm\:ss");

                return Ok(new
                {
                    status = 200,
                    message = "Created blog post",
                    result = new
                    {
                        result.post_id,
                        result.post_user_id,
                        result.post_title,
                        result.post_content,
                        PostDate = formattedPostDate,
                        PostTime = formattedPostTime
                    },
                    currentDate = currentDateTime.ToString("yyyy-MM-dd"),
                    currentTime = currentDateTime.TimeOfDay.ToString(@"hh\:mm\:ss")
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error when creating a blogPost: {ex.Message}. Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to create blog post"
                });
            }
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPost>>> GetAllBlogPosts()
        {
            var blogPosts = await _blogPostService.GetAllBlogPostsAsync();

            // Format the date and time fields for each blog post
            var formattedBlogPosts = blogPosts.Select(blogPost => new
            {
                blogPost.post_id,
                blogPost.post_user_id,
                blogPost.post_title,
                blogPost.post_content,
                post_date = blogPost.post_date.ToString("yyyy-MM-dd"),
                post_time = blogPost.post_time.ToString(@"hh\:mm\:ss")
            });

            return Ok(formattedBlogPosts);
        }

        [Authorize(Roles = "admin,trainer,member")]
        [HttpGet("{postId}")]
        public async Task<ActionResult<BlogPost>> GetBlogPostById(int postId)
        {
            var blogPost = await _blogPostService.GetBlogPostByIdAsync(postId);
            if (blogPost == null)
            {
                return NotFound();
            }
            return Ok(blogPost);
        }

        [Authorize(Roles = "admin,trainer,member")]
        [HttpPut]
        public async Task<IActionResult> UpdateBlogPost([FromBody] UpdateBlogPostDto updateBlogPost)
        {
            try
            {
                var blogPost = _mapping.Map<BlogPost>(updateBlogPost);
                var updatedBlogPost = await _blogPostService.UpdateBlogPostAsync(blogPost);
                return Ok(new
                {
                    status = 200,
                    message = "Updated blog post",
                    result = updatedBlogPost
                });
            }
            catch (Exception)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Blog post not found"
                });
            }
        }


        [Authorize(Roles = "admin,trainer,member")]
        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeleteBlogPostById(int postId)
        {
            try
            {
                await _blogPostService.DeleteBlogPostByIdAsync(postId);
                return Ok(new
                {
                    status = 200,
                    message = "Deleted blog post"
                });
            }
            catch (Exception)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Blog post not found"
                });
            }
        }
    }

}
