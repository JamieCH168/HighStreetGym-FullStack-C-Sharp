using HighStreetGym.Domain;

namespace HighStreetGym.Service.RoomService
{
    public interface IRoomService
    {
        Task<Room> CreateRoomAsync(Room roomObj);
        Task DeleteRoomByIdAsync(int roomId);
        Task<List<Room>> GetAllRoomsAsync();
        Task<Room> GetRoomByIdAsync(int roomId);
        Task<Room> UpdateRoomAsync(Room updatedRoom);
    }
}