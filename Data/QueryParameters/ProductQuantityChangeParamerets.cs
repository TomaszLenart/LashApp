using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.QueryParameters
{
    public class ProductQuantityChangeParamerets
    {
        public int ProductId { get; set; }
        public int QuantityChange { get; set; }
        public bool IsPurchase { get; set; }
    }
}
