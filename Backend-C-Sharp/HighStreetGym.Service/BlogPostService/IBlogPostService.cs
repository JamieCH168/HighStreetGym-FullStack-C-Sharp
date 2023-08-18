using HighStreetGym.Domain;

namespace HighStreetGym.Service.BlogPostService
{
    public interface IBlogPostService
    {
        Task<BlogPost> CreateBlogPostAsync(BlogPost blogPost);
        Task DeleteBlogPostByIdAsync(int postId);
        Task<List<BlogPost>> GetAllBlogPostsAsync();
        Task<BlogPost> GetBlogPostByIdAsync(int postId);
        Task<BlogPost> UpdateBlogPostAsync(BlogPost updatedBlogPost);
    }
}