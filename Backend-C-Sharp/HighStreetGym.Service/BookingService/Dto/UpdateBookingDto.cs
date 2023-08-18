using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Service.BookingService.Dto
{
    public class UpdateBookingDto
    {

        public int booking_id { get; set; }

        public int booking_user_id { get; set; }
        public int booking_class_id { get; set; }

        public string booking_created_date { get; set; }

        public string booking_created_time { get; set; }

    }
}