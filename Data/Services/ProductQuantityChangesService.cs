using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LashApp.Data.Db;
using LashApp.Data.Dtos;
using LashApp.Data.Interfaces;
using LashApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LashApp.Data.Services
{
    public class ProductQuantityChangesService : IProductQuantityChangesService
    {
        public async Task<IList<ProductQuantityChangeDto>> GetProductQuantityChanges(int productId, AppDbContext context)
        {
           var result = await context.ProductQuantityChanges.Where(x => x.Active && x.ProductId == productId).ToListAsync();
           return MapResult(result);

        }

        IList<ProductQuantityChangeDto> MapResult(IList<ProductQuantityChange> list)
        {
            IList<ProductQuantityChangeDto> result = new List<ProductQuantityChangeDto>();

            foreach(var item in list)
            {
                result.Add(new ProductQuantityChangeDto()
                {
                    Active = item.Active,
                    Date = item.Date,
                    IsPurchase = item.IsPurchase,
                    QuantityChange = item.QuantityChange
                });
            }
            return result;

        }
    }
}
