using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Dtos
{
    public class LocationDto
    {
        public LocationDto()
        {

        }

        public int LocationId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string CityCode { get; set; }

        public int ClientsCount { get; set; }
    }
}
