using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Models
{
    public class Appointment
    {
        [Key]
        [Required]
        public int AppointmentId { get; set; }
        public bool Active { get; set; }
       
        [ForeignKey("ClientId")]
        [Required]
        public int ClientId { get; set; }
       
        [ForeignKey("LocationId")]
        [Required]
        public int LocationId { get; set; }
       
        [ForeignKey("WorkerId")]
        [Required]
        public int WorkerId { get; set; }
       
        [ForeignKey("TreatmentId")]
        [Required]
        public int TreatmentId { get; set; }
       
        [Required]
        public DateTime Date { get; set; }
       
        [Required]
        public DateTime Hour { get; set; }

        public virtual Client Client { get; set; }
        public virtual Location Location { get; set; }
        public virtual Worker Worker { get; set; }
        public virtual Treatment Treatment { get; set; }





    }
}
