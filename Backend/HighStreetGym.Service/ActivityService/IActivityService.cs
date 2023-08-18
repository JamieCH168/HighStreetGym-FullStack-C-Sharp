

using HighStreetGym.Domain;

namespace HighStreetGym.Service.ActivityService
{
    public interface IActivityService
    {
        Task<Activity> CreateActivityAsync(Activity activity);
        Task DeleteActivityByIdAsync(int activityId);
        Task<Activity> GetActivityByIdAsync(int activityId);
        Task<List<Activity>> GetAllActivitiesAsync();
        Task<Activity> UpdateActivityAsync(Activity updatedActivity);
    }
}