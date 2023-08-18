using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HighStreetGym.Domain
{
    public class Activity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int activity_id { get; set; }
        public string activity_name { get; set; }
        public string activity_description { get; set; }
        public string activity_duration { get; set; }


        [JsonIgnore]
        public ICollection<Class> Classes { get; set; } = new List<Class>();

    }
}