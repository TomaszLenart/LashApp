using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Models
{
    public class ProductQuantityChange
    {
        [Key]
        [Required]
        public int ProductQuantityChangeId { get; set; }
        public bool Active { get; set; }
       
        [ForeignKey("ProductId")]
        [Required]
        public int LocationId { get; set; }
        public bool IsPurchase { get; set; }
        public int QuantityChange { get; set; }
        public DateTime Date { get; set; }

        public  virtual Product Product { get; set; }
    }
}
