using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HighStreetGym.Domain
{
    public class BlogPost
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int post_id { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime post_date { get; set; }

        [DisplayFormat(DataFormatString = @"hh\:mm\:ss")]
        public DateTime post_time { get; set; }

        public int post_user_id { get; set; }
        public string post_title { get; set; }
        public string post_content { get; set; }
        [JsonIgnore]
        public User User { get; set; }


    }
}