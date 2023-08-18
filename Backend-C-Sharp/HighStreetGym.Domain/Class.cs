using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HighStreetGym.Domain
{
    public class Class
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int class_id { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime class_date { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = @"hh\:mm\:ss")]
        public DateTime class_time { get; set; }

        public int class_room_id { get; set; }

        public int class_activity_id { get; set; }

        public int class_trainer_user_id { get; set; }

[JsonIgnore]
        public Activity Activity { get; set; }
[JsonIgnore]
        public Room Room { get; set; }
[JsonIgnore]

        public User User { get; set; }

[JsonIgnore]
        public ICollection<BookingClass> BookingClasses { get; set; }


    }
}