using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Dtos
{
    public class AppointmentDto
    {
        public AppointmentDto()
        {

        }

        public int AppointmentId { get; set; }
        public bool Active { get; set; }
        public string Client { get; set; }
        public string ClientPhone { get; set; }
        public string Location { get; set; }
        public string Worker { get; set; }
        public string Treatment { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }

    }
}
