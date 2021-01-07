using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Dtos
{
    public class ProductDto
    {
        public ProductDto() { }
        public int ProductId { get; set; }
        public bool Active { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Price { get; set; }
    }

}
