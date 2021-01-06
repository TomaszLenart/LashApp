using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Models
{
    public class Product
    {
        [Key]
        [Required]
        public int ProductId { get; set; }
        public bool Active { get; set; }
        public string Name { get; set; }
        public string Quantity { get; set; }
        public string Price { get; set; }

    }
}
