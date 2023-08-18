using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Service.ActivityService.Dto
{
    public class ActivityDto
    {
        public int activity_id { get; set; }
        public string activity_name { get; set; }
        public string activity_description { get; set; }
        public string activity_duration { get; set; }
    }
}