using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LashApp.Data.Db;
using LashApp.Data.Dtos;
using LashApp.Data.QueryParameters;

namespace LashApp.Data.Interfaces
{
    public interface IProductQuantityChangesService
    {
        Task<IList<ProductQuantityChangeDto>> GetProductQuantityChanges(int productId, AppDbContext context);

        Task<int> GetProductQuantity(int productId, AppDbContext context);

        Task<bool> ChangeProductQuantity(ProductQuantityChangeParamerets paramerets, AppDbContext context);

    }
}
