using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Dtos
{
    public class TreatmentDto
    {
        public TreatmentDto() { }
        public int TreatmentId { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public decimal Price { get; set; }
        public DateTime ActiveFrom { get; set; }
        public DateTime? ActiveTo { get; set; }

        public string Duration { get; set; }


        public string ShortDescription { get; set; }
        public string Details { get; set; }
    }

}
