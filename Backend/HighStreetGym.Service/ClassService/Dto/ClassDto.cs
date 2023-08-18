using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighStreetGym.Service.ClassService.Dto
{
    public class ClassDto
    {


        public int class_id { get; set; }
        public string class_date { get; set; }
        public string class_time { get; set; }

        public int class_room_id { get; set; }

        public int class_activity_id { get; set; }

        public int class_trainer_user_id { get; set; }


    }
}