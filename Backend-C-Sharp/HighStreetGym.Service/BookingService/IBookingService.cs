using HighStreetGym.Domain;

namespace HighStreetGym.Service.BookingService
{
    public interface IBookingService
    {
        Task<Booking> CreateBookingAsync(Booking booking);
        Task DeleteBookingByIdAsync(int bookingId);
        Task<List<Booking>> GetAllBookingsAsync();
        Task<Booking> GetBookingByIdAsync(int bookingId);
        Task<Booking> UpdateBookingAsync(Booking updatedBooking);
        Task<List<Booking>> GetAllBookingByUserIDAsync(int userId);
        Task<List<Booking>> GetBookingByClassIDAsync(int classID);
    }
}