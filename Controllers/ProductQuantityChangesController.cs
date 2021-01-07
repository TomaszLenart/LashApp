using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LashApp.Data.Db;
using LashApp.Data.Models;
using LashApp.Data;
using LashApp.Data.Dtos;
using LashApp.Data.Interfaces;
using LashApp.Data.QueryParameters;

namespace LashApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductQuantityChangesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IProductQuantityChangesService _productQuantityChangeService;

        public ProductQuantityChangesController(AppDbContext context, IProductQuantityChangesService productQuantityChangeService)
        {
            _context = context;
            _productQuantityChangeService = productQuantityChangeService;
        }

        // GET: api/ProductQuantityChanges
        [HttpGet]
        public async Task<ActionResult<ApiResult<ProductQuantityChangeDto>>> GetProductQuantityChanges(
       int pageIndex = 0,
       int pageSize = 10,
       string sortColumn = null,
       string sortOrder = null,
       string filterColumn = null,
       string filterQuery = null)
        {
            return await ApiResult<ProductQuantityChangeDto>.CreateAsync(
             _context.ProductQuantityChanges
             .Select(p => new ProductQuantityChangeDto()
             {
                 ProductQuantityChangeId = p.ProductQuantityChangeId,
                 Active = p.Active,
                 IsPurchase = p.IsPurchase,
                 QuantityChange = p.QuantityChange,
                 Date = p.Date


             }),
             pageIndex,
             pageSize,
             sortColumn,
             sortOrder,
             filterColumn,
             filterQuery);
        }




        // GET: api/ProductQuantityChanges/5
        [HttpGet("{productId}")]
        public async Task<ActionResult<ApiResult<ProductQuantityChangeDto>>> GetProductQuantityChange(int productId,
               int pageIndex = 0,
               int pageSize = 10,
               string sortColumn = null,
               string sortOrder = null,
               string filterColumn = null,
               string filterQuery = null)
        {
           
            return await ApiResult<ProductQuantityChangeDto>.CreateAsync(
             _context.ProductQuantityChanges
             .Where(x=>x.Active && x.ProductId == productId)
             .Select(p => new ProductQuantityChangeDto()
             {
                 ProductQuantityChangeId = p.ProductQuantityChangeId,
                 Active = p.Active,
                 IsPurchase = p.IsPurchase,
                 QuantityChange = p.QuantityChange,
                 Date = p.Date
             }),
             pageIndex,
             pageSize,
             sortColumn,
             sortOrder,
             filterColumn,
             filterQuery);
        }

        // PUT: api/ProductQuantityChanges/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductQuantityChange(int id, ProductQuantityChange productQuantityChange)
        {
            if (id != productQuantityChange.ProductQuantityChangeId)
            {
                return BadRequest();
            }

            _context.Entry(productQuantityChange).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductQuantityChangeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductQuantityChanges
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductQuantityChange>> PostProductQuantityChange(ProductQuantityChange productQuantityChange)
        {
            _context.ProductQuantityChanges.Add(productQuantityChange);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductQuantityChange", new { id = productQuantityChange.ProductQuantityChangeId }, productQuantityChange);
        }

        // DELETE: api/ProductQuantityChanges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductQuantityChange(int id)
        {
            var productQuantityChange = await _context.ProductQuantityChanges.FindAsync(id);
            if (productQuantityChange == null)
            {
                return NotFound();
            }

            _context.ProductQuantityChanges.Remove(productQuantityChange);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductQuantityChangeExists(int id)
        {
            return _context.ProductQuantityChanges.Any(e => e.ProductQuantityChangeId == id);
        }

        // POST: api/Appointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet]
        [Route("ByProduct/{productId}")]
        public async Task<ActionResult<List<ProductQuantityChangeDto>>> GetProductQuantityChangesByProduct(int productId)
        {
            var result = await _productQuantityChangeService.GetProductQuantityChanges(productId, _context);

            return Ok(result);
        }

        [HttpPost]
        [Route("ChangeProductQuantity")]

        public async Task<ActionResult<int>> ChangeProductQuantity([FromBody] ProductQuantityChangeParamerets paramerets)
        {
            var result = await _productQuantityChangeService.ChangeProductQuantity(paramerets, _context);

            return Ok(result);
        }

        [HttpGet]
        [Route("ProductQuantity/{productId}")]
        public async Task<ActionResult<int>> ChangeProductQuantity(int productId)
        {
            var result = await _productQuantityChangeService.GetProductQuantity(productId, _context);

            return Ok(result);
        }
    }
}
