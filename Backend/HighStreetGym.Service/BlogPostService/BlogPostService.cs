using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighStreetGym.Core.Repository;
using HighStreetGym.Domain;

namespace HighStreetGym.Service.BlogPostService
{


    public class BlogPostService : IBlogPostService
    {
        private readonly IRepository<BlogPost> _blogPostRepo;

        public BlogPostService(IRepository<BlogPost> blogPostRepo)
        {
            _blogPostRepo = blogPostRepo;
        }

        public async Task<BlogPost> CreateBlogPostAsync(BlogPost blogPost)
        {
            var createdBlogPost = await _blogPostRepo.InsertAsync(blogPost);
            return createdBlogPost;
        }

        // public async Task<List<BlogPost>> GetAllBlogPostsAsync()
        // {
        //     return await _blogPostRepo.GetListAsync();
        // }

        public async Task<List<BlogPost>> GetAllBlogPostsAsync()
        {
            var blogPosts = await _blogPostRepo.GetListAsync();

            return blogPosts.OrderByDescending(bp => bp.post_date)
                            .ThenByDescending(bp => bp.post_time)
                            .ToList();
        }


        public async Task<BlogPost> GetBlogPostByIdAsync(int postId)
        {
            return await _blogPostRepo.GetAsync(blogPost => blogPost.post_id == postId);
        }

        public async Task<BlogPost> UpdateBlogPostAsync(BlogPost updatedBlogPost)
        {
            var existingBlogPost = await _blogPostRepo.GetAsync(blogPost => blogPost.post_id == updatedBlogPost.post_id);

            if (existingBlogPost == null)
            {
                throw new Exception($"Blog post with ID {updatedBlogPost.post_id} not found.");
            }

            existingBlogPost.post_date = updatedBlogPost.post_date;
            existingBlogPost.post_time = updatedBlogPost.post_time;
            existingBlogPost.post_user_id = updatedBlogPost.post_user_id;
            existingBlogPost.post_title = updatedBlogPost.post_title;
            existingBlogPost.post_content = updatedBlogPost.post_content;

            await _blogPostRepo.UpdateAsync(existingBlogPost);
            return existingBlogPost;
        }

        public async Task DeleteBlogPostByIdAsync(int postId)
        {
            var existingBlogPost = await _blogPostRepo.GetAsync(blogPost => blogPost.post_id == postId);

            if (existingBlogPost == null)
            {
                throw new Exception($"Blog post with ID {postId} not found.");
            }

            await _blogPostRepo.DeleteAsync(existingBlogPost);
        }
    }
}



