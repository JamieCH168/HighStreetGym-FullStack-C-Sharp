using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HighStreetGym.Domain;
using HighStreetGym.Service.RoomService;
using HighStreetGym.Service.RoomService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HighStreetGym.WebAPI.Controllers
{
    public class RoomController : BaseController
    {
        private readonly IRoomService _roomService;
        private readonly IMapper _mapping;

        public RoomController(IRoomService roomService, IMapper mapping)
        {
            this._mapping = mapping;
            _roomService = roomService;
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetAllRooms()
        {
            var rooms = await _roomService.GetAllRoomsAsync();
            return Ok(rooms);
        }

        [Authorize(Roles = "admin,trainer,member")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoomById(int id)
        {
            var room = await _roomService.GetRoomByIdAsync(id);

            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpPost]
        public async Task<ActionResult<Room>> CreateRoom([FromBody] RoomDto roomDto)
        {

            var room = _mapping.Map<Room>(roomDto);
            var createdRoom = await _roomService.CreateRoomAsync(room);
            return Ok(new
            {
                status = 200,
                message = "Created room",
                result = createdRoom
            });
        }


        [Authorize(Roles = "admin,trainer")]
        [HttpPut]
        public async Task<IActionResult> UpdateRoom([FromBody] Room room)
        {
            try
            {
                var updatedRoom = await _roomService.UpdateRoomAsync(room);
                return Ok(updatedRoom);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains($"Room with ID {room.room_id} not found"))
                {
                    return NotFound();
                }
                throw;
            }
            return NoContent();
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            try
            {
                await _roomService.DeleteRoomByIdAsync(id);
                return Ok(new { message = $"Room with ID {id} deleted successfully." });
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains($"Room with ID {id} not found"))
                {
                    return NotFound(new { error = $"Room with ID {id} not found" });
                }
                throw;
            }
        }

    }
}