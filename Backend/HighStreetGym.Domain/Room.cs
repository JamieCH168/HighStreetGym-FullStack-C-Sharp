using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HighStreetGym.Domain
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int room_id { get; set; }

        [Required]
        [MaxLength(45)]
        public string room_location { get; set; }

        public int room_number { get; set; }

        // Navigation property
        [JsonIgnore]
        public virtual ICollection<Class> Classes { get; set; } = new List<Class>(); // Classes held in this room



    }
}