using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LashApp.Data.Db;
using LashApp.Data.Dtos;
using LashApp.Data.Interfaces;
using LashApp.Data.Models;
using LashApp.Data.QueryParameters;
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

        public async Task<bool> ChangeProductQuantity(ProductQuantityChangeParamerets paramerets, AppDbContext context)
        {
            var productQuantityChange = new ProductQuantityChange();
            productQuantityChange.Active = true;
            productQuantityChange.Date = DateTime.Now;
            productQuantityChange.IsPurchase = paramerets.IsPurchase;
            productQuantityChange.QuantityChange = paramerets.QuantityChange;
            productQuantityChange.ProductId = paramerets.ProductId;
            context.ProductQuantityChanges.Add(productQuantityChange);

            try
            {
                await context.SaveChangesAsync();
                return true;
            }catch(Exception e) { }
            return false;
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

        public async Task<int> GetProductQuantity(int productId, AppDbContext context)
        {
            int result = 0;
            var productChanges = await context.ProductQuantityChanges.Where(x => x.Active && x.ProductId == productId).ToListAsync();
            foreach (var change in productChanges)
            {
                if (change.IsPurchase)
                    result += change.QuantityChange;
                else
                    result -= change.QuantityChange;
            }
            return result;
        }
    }
}
