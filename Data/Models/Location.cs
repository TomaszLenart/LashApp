using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Models
{
    public class Location
    {

        [Key]
        [Required]
        public int LocationId { get; set; }
        [DefaultValue(true)]
        public bool Active { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string CityCode { get; set; }

        public virtual List<Client> Clients { get; set; }
        public virtual List<Appointment> Appointments { get; set; }

    }
}
