using HighStreetGym.Domain;

namespace HighStreetGym.Service.ClassService
{
    public interface IClassService
    {

        Task<Class> CreateClassAsync(Class classObj);
        Task DeleteClassByIdAsync(int classId);
        Task<List<Class>> GetAllClassesAsync();
        Task<Class> GetClassByIdAsync(int classId);
        Task<Class> UpdateClassAsync(Class updatedClass);
        Task<Class> GetClassByActivityIdAsync(int activityId);

    }
}