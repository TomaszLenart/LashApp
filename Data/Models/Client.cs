using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Models
{
    public class Client
    {
        public Client()
        {

        }

        [Key]
        [Required]
        public int ClientId { get; set; }
        public bool Active { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Phone { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public DateTime AssignDate { get; set; }
        [ForeignKey("LocationId")]
        public int? LocationId { get; set; }

        //public int? LashLiftingId { get; set; }
        //public int? BrowLiftingId { get; set; }

        //public int? BrowStylization { get; set; }

        public virtual Location Location { get; set; }
        public virtual List<Appointment> Appointments { get; set; }

    }
}
