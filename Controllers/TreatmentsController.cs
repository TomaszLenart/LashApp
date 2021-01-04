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
using WorldCities.Data;
using LashApp.Data.Dtos;

namespace LashApp.Controllers.Treatments
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TreatmentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Treatments
        [HttpGet]
        public async Task<ActionResult<ApiResult<TreatmentDto>>> GetTreatments(
        int pageIndex = 0,
        int pageSize = 10,
        string sortColumn = null,
        string sortOrder = null,
        string filterColumn = null,
        string filterQuery = null)
        {
            return await ApiResult<TreatmentDto>.CreateAsync(
             _context.Treatments
             .Select(c => new TreatmentDto()
             {
                 TreatmentId = c.TreatmentId,
                 Active = c.Active,
                 Name= c.Name,
                 ActiveFrom = c.ActiveFrom,
                 ActiveTo = c.ActiveTo,
                 Price = c.Price,
                 Duration = c.Duration,
                 ShortDescription = c.ShortDescription,
                 Details = c.Details

             }),
             pageIndex,
             pageSize,
             sortColumn,
             sortOrder,
             filterColumn,
             filterQuery);
        }

        // GET: api/Treatments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Treatment>> GetTreatment(int id)
        {
            var Treatment = await _context.Treatments.FindAsync(id);

            if (Treatment == null)
            {
                return NotFound();
            }

            return Treatment;
        }

        // PUT: api/Treatments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTreatment(int id, Treatment Treatment)
        {
            if (id != Treatment.TreatmentId)
            {
                return BadRequest();
            }

            _context.Entry(Treatment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TreatmentExists(id))
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

        // POST: api/Treatments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Treatment>> PostTreatment(Treatment Treatment)
        {
            _context.Treatments.Add(Treatment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTreatment", new { id = Treatment.TreatmentId }, Treatment);
        }

        // DELETE: api/Treatments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTreatment(int id)
        {
            var Treatment = await _context.Treatments.FindAsync(id);
            if (Treatment == null)
            {
                return NotFound();
            }

            _context.Treatments.Remove(Treatment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TreatmentExists(int id)
        {
            return _context.Treatments.Any(e => e.TreatmentId == id);
        }


    }
}
