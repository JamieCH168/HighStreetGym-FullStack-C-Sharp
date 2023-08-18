using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HighStreetGym.Domain
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int user_id { get; set; }

        [Required]
        [MaxLength(95)]
        public string user_email { get; set; }

        [Required]
        [MaxLength(195)]
        public string user_password { get; set; }

        [Required]
        [MaxLength(45)]
        public string user_access_role { get; set; }

        [MaxLength(45)]
        public string user_phone { get; set; }

        [MaxLength(45)]
        public string user_first_name { get; set; }

        [MaxLength(45)]
        public string user_last_name { get; set; }

        [MaxLength(65)]
        public string user_address { get; set; }
        [MaxLength(145)]
        // [Required(AllowEmptyStrings = true)]
    
        [JsonIgnore]
        public ICollection<BlogPost> BlogPosts { get; set; } = new List<BlogPost>();

        [JsonIgnore]
        public ICollection<Booking> Bookings { get; set; }
        [JsonIgnore]
        public virtual ICollection<Class> Classes { get; set; } = new List<Class>();


    }
}