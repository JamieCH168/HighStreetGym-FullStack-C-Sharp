using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HighStreetGym.Domain;
using HighStreetGym.Service.BookingService;
using HighStreetGym.Service.BookingService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HighStreetGym.WebAPI.Controllers
{

    public class BookingController : BaseController
    {
        private readonly IBookingService _bookingService;
        private readonly ILogger<BookingController> _logger;
        private readonly IMapper _mapping;

        public BookingController(IBookingService bookingService, ILogger<BookingController> logger, IMapper mapping)
        {
            _bookingService = bookingService;
            _logger = logger;
            this._mapping = mapping;
        }

        [Authorize(Roles = "admin,trainer,member")]
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto bookingDto)
        {
            try
            {
                var currentDateTime = DateTime.Now;
                var booking = new Booking
                {
                    booking_id = bookingDto.booking_id,
                    booking_user_id = bookingDto.booking_user_id,
                    booking_class_id = bookingDto.booking_class_id,
                    booking_created_date = currentDateTime.Date,
                    booking_created_time = currentDateTime
                };
                var result = await _bookingService.CreateBookingAsync(booking);

                var formattedBookingCreatedDate = booking.booking_created_date.ToString("yyyy-MM-dd");
                var formattedBookingCreatedTime = booking.booking_created_time.TimeOfDay.ToString(@"hh\:mm\:ss");

                return Ok(new
                {
                    status = 200,
                    message = "Created booking",
                    result = new
                    {
                        result.booking_id,
                        result.booking_user_id,
                        result.booking_class_id,
                        booking_created_date = formattedBookingCreatedDate,
                        booking_created_time = formattedBookingCreatedTime
                    },
                    currentDate = currentDateTime.ToString("yyyy-MM-dd"),
                    currentTime = currentDateTime.TimeOfDay.ToString(@"hh\:mm\:ss")
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to create booking"
                });
            }
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();

            // Format the date and time fields for each booking
            var formattedBookings = bookings.Select(booking => new
            {
                booking.booking_id,
                booking.booking_user_id,
                booking.booking_class_id,
                booking_created_date = booking.booking_created_date.ToString("yyyy-MM-dd"),
                booking_created_time = booking.booking_created_time.TimeOfDay.ToString(@"hh\:mm\:ss")
            });

            return Ok(formattedBookings);
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBookingById(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [Authorize(Roles = "admin,trainer")]
        [HttpPut]
        // [Authorize(Roles = "admin", "trainer")]
        public async Task<IActionResult> UpdateBooking([FromBody] UpdateBookingDto updateBookingDto)
        {
            try
            {
                var booking = _mapping.Map<Booking>(updateBookingDto);
                var updatedBooking = await _bookingService.UpdateBookingAsync(booking);
                return Ok(new
                {
                    status = 200,
                    message = "Updated booking",
                    updatedBooking
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to update booking"
                });
            }
        }

        [Authorize(Roles = "admin,trainer,member")]
        [HttpGet("user/{userID}")]
        public async Task<IActionResult> GetAllBookingByUserID(int userID)
        {
            var bookings = await _bookingService.GetAllBookingByUserIDAsync(userID);

            return Ok(new { bookings });
        }


        [Authorize(Roles = "admin,trainer,member")]
        [HttpGet("class/{classID}")]
        public async Task<IActionResult> GetBookingByClassID(int classID)
        {
            var booking = await _bookingService.GetBookingByClassIDAsync(classID);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(new { booking });
        }


        [Authorize(Roles = "admin,trainer,member")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookingById(int id)
        {
            try
            {
                await _bookingService.DeleteBookingByIdAsync(id);
                return Ok(new
                {
                    status = 200,
                    message = "Deleted booking"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    status = 500,
                    message = "Failed to delete booking"
                });
            }
        }

    }

}