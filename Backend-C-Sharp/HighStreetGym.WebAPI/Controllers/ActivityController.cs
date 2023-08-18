
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighStreetGym.Core.Repository;
using HighStreetGym.Domain;
using HighStreetGym.Service.ActivityService;
using AutoMapper;
using HighStreetGym.Service.ActivityService.Dto;
using Microsoft.AspNetCore.Authorization;

namespace HighStreetGym.WebAPI.Controllers
{
    public class ActivityController : BaseController
    {
        private readonly IActivityService _activityService;
        private readonly IMapper _mapping;

        public ActivityController(IActivityService activityService, IMapper mapping)
        {
            this._mapping = mapping;
            _activityService = activityService;
        }


        [Authorize(Roles = "admin,trainer")]
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] ActivityDto activityDto)
        {
            try
            {
                var activity = _mapping.Map<Activity>(activityDto);
                var createdActivity = await _activityService.CreateActivityAsync(activity);
                return Ok(new
                {
                    status = 200,
                    message = "Created activity",
                    result = createdActivity
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to create activity",
                    error = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActivities()
        {
            try
            {
                var activities = await _activityService.GetAllActivitiesAsync();
                return Ok(new
                {
                    status = 200,
                    message = "Get all activities",
                    activities
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to get all activities",
                    error = ex.Message
                });
            }
        }

        [Authorize(Roles = "admin,trainer,member")]
        [HttpGet("{activityId}")]
        public async Task<IActionResult> GetActivityById(int activityId)
        {
            try
            {
                var activity = await _activityService.GetActivityByIdAsync(activityId);
                if (activity == null)
                {
                    return NotFound(new
                    {
                        status = 404,
                        message = $"Activity with ID {activityId} not found"
                    });
                }

                return Ok(new
                {
                    status = 200,
                    message = "Get activity by ID",
                    activity
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to get activity by ID",
                    error = ex.Message
                });
            }
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpPut]
        public async Task<IActionResult> UpdateActivity([FromBody] Activity updatedActivity)
        {
            try
            {
                var activity = await _activityService.UpdateActivityAsync(updatedActivity);
                return Ok(new
                {
                    status = 200,
                    message = "Updated activity",
                    modifiedCount = activity
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to update activity",
                    error = ex.Message
                });
            }
        }


        [Authorize(Roles = "admin,trainer")]
        [HttpDelete("{activityId}")]
        public async Task<IActionResult> DeleteActivityById(int activityId)
        {
            try
            {
                await _activityService.DeleteActivityByIdAsync(activityId);
                return Ok(new
                {
                    status = 200,
                    message = "Deleted activity by ID"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to delete activity by ID",
                    error = ex.Message
                });
            }
        }

    }
}
