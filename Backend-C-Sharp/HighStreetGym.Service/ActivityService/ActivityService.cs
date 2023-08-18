using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighStreetGym.Core.Repository;
using HighStreetGym.Domain;

namespace HighStreetGym.Service.ActivityService
{


    public class ActivityService : IActivityService
    {

        private readonly IRepository<Activity> _activityRepo;

        public ActivityService(IRepository<Activity> activityRepo)
        {
            _activityRepo = activityRepo;
        }

        public async Task<Activity> CreateActivityAsync(Activity activity)
        {
            var createdActivity = await _activityRepo.InsertAsync(activity);
            return createdActivity;
        }

        public async Task<List<Activity>> GetAllActivitiesAsync()
        {
            return await _activityRepo.GetListAsync();
        }

        public async Task<Activity> GetActivityByIdAsync(int activityId)
        {
            return await _activityRepo.GetAsync(activity => activity.activity_id == activityId);
        }



        public async Task<Activity> UpdateActivityAsync(Activity updatedActivity)
        {
            var existingActivity = await _activityRepo.GetAsync(activity => activity.activity_id == updatedActivity.activity_id);

            if (existingActivity == null)
            {
                throw new Exception($"Activity with ID {updatedActivity.activity_id} not found.");
            }

            existingActivity.activity_name = updatedActivity.activity_name;
            existingActivity.activity_description = updatedActivity.activity_description;
            existingActivity.activity_duration = updatedActivity.activity_duration;

            await _activityRepo.UpdateAsync(existingActivity);
            return existingActivity;
        }

        public async Task DeleteActivityByIdAsync(int activityId)
        {
            var existingActivity = await _activityRepo.GetAsync(activity => activity.activity_id == activityId);

            if (existingActivity == null)
            {
                throw new Exception($"Activity with ID {activityId} not found.");
            }

            await _activityRepo.DeleteAsync(existingActivity);
        }
    }
}

