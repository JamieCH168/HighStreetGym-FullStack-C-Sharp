using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighStreetGym.Core.Repository;
using HighStreetGym.Domain;

namespace HighStreetGym.Service.RoomService
{


    public class RoomService : IRoomService
    {

        private readonly IRepository<Room> _roomRepo;

        public RoomService(IRepository<Room> roomRepo)
        {
            this._roomRepo = roomRepo;
        }

        public async Task<Room> CreateRoomAsync(Room roomObj)
        {
            return await _roomRepo.InsertAsync(roomObj);
        }

        public async Task<List<Room>> GetAllRoomsAsync()
        {
            return await _roomRepo.GetListAsync();
        }

        public async Task<Room> GetRoomByIdAsync(int roomId)
        {
            var existingRoom = await _roomRepo.GetAsync(x => x.room_id == roomId);
            if (existingRoom == null)
            {
                throw new Exception($"Room with ID {roomId} not found.");
            }

            return existingRoom;
        }

        public async Task<Room> UpdateRoomAsync(Room updatedRoom)
        {
            var existingRoom = await _roomRepo.GetAsync(x => x.room_id == updatedRoom.room_id);

            if (existingRoom == null)
            {
                throw new Exception($"Room with ID {updatedRoom.room_id} not found.");
            }

            existingRoom.room_location = updatedRoom.room_location;
            existingRoom.room_number = updatedRoom.room_number;

            await _roomRepo.UpdateAsync(existingRoom);
            return existingRoom;
        }

        public async Task DeleteRoomByIdAsync(int roomId)
        {
            var existingRoom = await _roomRepo.GetAsync(x => x.room_id == roomId);
            if (existingRoom == null)
            {
                throw new Exception($"Room with ID {roomId} not found.");
            }

            await _roomRepo.DeleteAsync(existingRoom);
        }
    }
}



