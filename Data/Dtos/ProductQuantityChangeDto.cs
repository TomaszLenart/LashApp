using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Dtos
{
    public class ProductQuantityChangeDto
    {
        public ProductQuantityChangeDto() { }
        public int ProductQuantityChangeId { get; set; }
        public bool Active { get; set; }
        public bool IsPurchase { get; set; }
        public int QuantityChange { get; set; }
        public DateTime Date { get; set; }
    }

}
