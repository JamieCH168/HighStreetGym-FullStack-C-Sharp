using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json.Converters;


namespace HighStreetGym.Domain
{
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int booking_id { get; set; }

        public int booking_user_id { get; set; }
        public int booking_class_id { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime booking_created_date { get; set; }

        [DisplayFormat(DataFormatString = @"hh\:mm\:ss")]
        public DateTime booking_created_time { get; set; }

        [JsonIgnore]
  
        public ICollection<BookingClass> BookingClasses { get; set; }
        [JsonIgnore]
        public User User { get; set; }

    }


}

