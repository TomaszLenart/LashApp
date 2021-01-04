using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Models
{
    public class Worker
    {

        public Worker()
        {

        }

        [Key]
        [Required]
        public int ClientId { get; set; }
        [DefaultValue(true)]
        public bool Active { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual List<Appointment> Appointments { get; set; }

    }
}
