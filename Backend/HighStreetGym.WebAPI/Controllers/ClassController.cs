using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HighStreetGym.Domain;
using HighStreetGym.Service.ClassService;
using HighStreetGym.Service.ClassService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HighStreetGym.WebAPI.Controllers
{
    public class ClassController : BaseController
    {
        private readonly IClassService _classService;
        private readonly ILogger<ClassController> _logger;
        private readonly IMapper _mapping;

        public ClassController(IClassService classService, ILogger<ClassController> logger, IMapper mapping)
        {

            _classService = classService;
            this._logger = logger;
            this._mapping = mapping;

        }



        [Authorize(Roles = "admin,trainer")]
        [HttpPost]
        public async Task<IActionResult> CreateClass([FromBody] ClassDto classDto)
        {
            try
            {
                var currentDateTime = DateTime.Now;

                DateTime classDateParsed;
                DateTime classTimeParsed;
                if (string.IsNullOrEmpty(classDto.class_date) || !DateTime.TryParse(classDto.class_date, out classDateParsed))
                {
                    classDateParsed = currentDateTime.Date;
                }
                if (string.IsNullOrEmpty(classDto.class_time) || !DateTime.TryParse(classDto.class_time, out classTimeParsed))
                {
                    classTimeParsed = currentDateTime;
                }

                var createdClass = new Class
                {
                    // class_date = classDateParsed,
                    // class_time = classTimeParsed,
                    class_date = classDateParsed,
                    class_time = classTimeParsed,
                    class_room_id = classDto.class_room_id,
                    class_activity_id = classDto.class_activity_id,
                    class_trainer_user_id = classDto.class_trainer_user_id
                };

                // var createdClass = new Class
                // {
                //     class_date = classDto.class_date,
                //     class_time = classDto.class_time,
                //     class_room_id = classDto.class_room_id,
                //     class_activity_id = classDto.class_activity_id,
                //     class_trainer_user_id = classDto.class_trainer_user_id
                // };

                var result = await _classService.CreateClassAsync(createdClass);

                var formattedClassDate = result.class_date.ToString("yyyy-MM-dd");
                var formattedClassTime = result.class_time.TimeOfDay.ToString(@"hh\:mm\:ss");

                var response = new
                {
                    result.class_id,
                    class_date = formattedClassDate,
                    class_time = formattedClassTime,
                    result.class_room_id,
                    result.class_activity_id,
                    result.class_trainer_user_id
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error when creating a class: {ex.Message}. Stack Trace: {ex.StackTrace}");
                return StatusCode(500, $"Failed to create class: {ex.Message}");
            }
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpGet]
        public async Task<IActionResult> GetAllClasses()
        {
            try
            {
                var classes = await _classService.GetAllClassesAsync();

                // Format the date and time fields for each class
                var formattedClasses = classes.Select(classObj => new
                {
                    classObj.class_id,
                    classObj.class_room_id,
                    classObj.class_activity_id,
                    classObj.class_trainer_user_id,
                    class_date = classObj.class_date.ToString("yyyy-MM-dd"),
                    class_time = classObj.class_time.ToString(@"hh\:mm\:ss")
                });

                return Ok(formattedClasses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to get all classes: {ex.Message}");
            }
        }

        [Authorize(Roles = "admin,trainer,member")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClassById(int id)
        {
            try
            {
                var classObj = await _classService.GetClassByIdAsync(id);
                if (classObj == null)
                {
                    return NotFound($"Class with ID {id} not found");
                }
                return Ok(classObj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to get class by ID: {ex.Message}");
            }
        }

        [HttpGet("activity/{id}")]
        public async Task<IActionResult> GetClassByActivityId(int id)
        {
            try
            {
                var classobj = await _classService.GetClassByActivityIdAsync(id);
                return Ok(classobj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to get classes by activity ID: {ex.Message}");
            }
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpPut]
        public async Task<IActionResult> UpdateClass([FromBody] UpdateClassDto updateClassDto)
        {
            try
            {
                var updatedClass = _mapping.Map<Class>(updateClassDto);

                var result = await _classService.UpdateClassAsync(updatedClass);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{class_id}")]
        public async Task<IActionResult> DeleteClass(int class_id)
        {
            try
            {
                await _classService.DeleteClassByIdAsync(class_id);
                return Ok($"Deleted class with ID {class_id}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to delete class: {ex.Message}");
            }
        }
    }

}
