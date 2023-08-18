using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighStreetGym.Core.Repository;
using HighStreetGym.Domain;

namespace HighStreetGym.Service.BookingService
{

    public class BookingService : IBookingService
    {
        private readonly IRepository<Booking> _bookingRepo;

        public BookingService(IRepository<Booking> bookingRepo)
        {
            this._bookingRepo = bookingRepo;
        }

        public async Task<Booking> CreateBookingAsync(Booking booking)
        {
            var createdBooking = await _bookingRepo.InsertAsync(booking);
            return createdBooking;
        }

        // public async Task<List<Booking>> GetAllBookingByUserIDAsync(int userId)
        // {
        //     return await _bookingRepo.GetListAsync(b => b.booking_user_id == userId);
        // }

        // public async Task<List<Booking>> GetAllBookingByUserIDAsync(int userId)
        // {
        //     return await _bookingRepo.GetListAsync(b => b.booking_user_id == userId)
        //                              .OrderByDescending(b => b.booking_created_date)
        //                              .ThenByDescending(b => b.booking_created_time)
        //                              .ToListAsync();
        // }
        public async Task<List<Booking>> GetAllBookingByUserIDAsync(int userId)
        {
            var bookings = await _bookingRepo.GetListAsync(b => b.booking_user_id == userId);

            return bookings.OrderByDescending(b => b.booking_created_date)
                           .ThenByDescending(b => b.booking_created_time)
                           .ToList();
        }



        public async Task<List<Booking>> GetBookingByClassIDAsync(int classID)
        {
            return await _bookingRepo.GetListAsync(b => b.booking_class_id == classID);
        }

        public async Task<List<Booking>> GetAllBookingsAsync()
        {
            return await _bookingRepo.GetListAsync();
        }

        public async Task<Booking> GetBookingByIdAsync(int bookingId)
        {
            return await _bookingRepo.GetAsync(booking => booking.booking_id == bookingId);
        }

        public async Task<Booking> UpdateBookingAsync(Booking updatedBooking)
        {
            var existingBooking = await _bookingRepo.GetAsync(booking => booking.booking_id == updatedBooking.booking_id);

            if (existingBooking == null)
            {
                throw new Exception($"Booking with ID {updatedBooking.booking_id} not found.");
            }

            existingBooking.booking_user_id = updatedBooking.booking_user_id;
            existingBooking.booking_class_id = updatedBooking.booking_class_id;
            existingBooking.booking_created_date = updatedBooking.booking_created_date;
            existingBooking.booking_created_time = updatedBooking.booking_created_time;

            await _bookingRepo.UpdateAsync(existingBooking);
            return existingBooking;
        }

        public async Task DeleteBookingByIdAsync(int bookingId)
        {
            var existingBooking = await _bookingRepo.GetAsync(booking => booking.booking_id == bookingId);

            if (existingBooking == null)
            {
                throw new Exception($"Booking with ID {bookingId} not found.");
            }

            await _bookingRepo.DeleteAsync(existingBooking);
        }
    }
}