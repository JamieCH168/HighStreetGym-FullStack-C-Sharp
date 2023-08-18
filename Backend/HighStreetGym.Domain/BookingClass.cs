using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Domain
{
    public class BookingClass
    {
        public int BookingId { get; set; }
        public Booking Booking { get; set; }

        public int ClassId { get; set; }
        public Class Class { get; set; }
    }
}