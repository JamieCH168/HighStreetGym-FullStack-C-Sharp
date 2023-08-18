using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighStreetGym.Core.Repository;
using HighStreetGym.Domain;

namespace HighStreetGym.Service.ClassService
{
    public class ClassService : IClassService
    {
        private readonly IRepository<Class> _classRepo;

        public ClassService(IRepository<Class> classRepo)
        {
            this._classRepo = classRepo;
        }

        public async Task<Class> CreateClassAsync(Class classObj)
        {
            return await _classRepo.InsertAsync(classObj);
        }

        public async Task<List<Class>> GetAllClassesAsync()
        {
            return await _classRepo.GetListAsync();
        }

        public async Task<Class> GetClassByIdAsync(int classId)
        {
            var existingClass = await _classRepo.GetAsync(x => x.class_id == classId);
            if (existingClass == null)
            {
                throw new Exception($"Class with ID {classId} not found.");
            }

            return existingClass;
        }


        public async Task<Class> GetClassByActivityIdAsync(int activityId)
        {
            return await _classRepo.GetAsync(c => c.class_activity_id == activityId);
        }
        
        public async Task<Class> UpdateClassAsync(Class updatedClass)
        {
            var existingClass = await _classRepo.GetAsync(x => x.class_id == updatedClass.class_id);

            if (existingClass == null)
            {
                throw new Exception($"Class with ID {updatedClass.class_id} not found.");
            }

            // Update the properties of the existing class using the provided updatedClass details.
            // Adjust the property names according to the actual properties of the Class entity.

            existingClass.class_date = updatedClass.class_date;
            existingClass.class_time = updatedClass.class_time;
            existingClass.class_room_id = updatedClass.class_room_id;
            existingClass.class_activity_id = updatedClass.class_activity_id;
            existingClass.class_trainer_user_id = updatedClass.class_trainer_user_id;

            await _classRepo.UpdateAsync(existingClass);
            return existingClass;
        }


        public async Task DeleteClassByIdAsync(int classId)
        {
            var existingClass = await _classRepo.GetAsync(x => x.class_id == classId);
            if (existingClass == null)
            {
                throw new Exception($"Class with ID {classId} not found.");
            }

            await _classRepo.DeleteAsync(existingClass);
        }
    }
}