using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Models
{
    public class Treatment
    {
        [Key]
        [Required]
        public int TreatmentId { get; set; }
        public bool Active { get; set; }
        public string Name { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public DateTime ActiveFrom { get; set; }
        public DateTime? ActiveTo { get; set; }
        public string Duration { get; set; }
        public string ShortDescription { get; set; }
        public string Details { get; set; }

        public virtual List<Appointment> Appointments { get; set; }


    }
}
