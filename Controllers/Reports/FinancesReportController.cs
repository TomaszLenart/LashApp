using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LashApp.Controllers.Reports
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinancesReportController : ControllerBase
    {
        // POST: api/Appointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet]
        [Route("details")]
        public async Task<ActionResult<bool>> GetReportDetails(int appointmentId)
        {
            //var result = await _paymentService.ProcessPayment(appointmentId, _context);

            return Ok("dupa");
        }


    }
}
