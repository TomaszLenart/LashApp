using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LashApp.Data.Interfaces.Reports;
using LashApp.Data.QueryParameters;
using Microsoft.AspNetCore.Mvc;

namespace LashApp.Controllers.Reports
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinancesReportController : ControllerBase
    {

        private readonly IFinancesReportService _financesReportService;

        public FinancesReportController(IFinancesReportService financesReportService)
        {
            _financesReportService = financesReportService;
        }
        // POST: api/Appointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("details")]
        public async Task<ActionResult> GetReportDetails([FromBody] FinancesReportParameters parameters)
        {
            //var result = await _paymentService.ProcessPayment(appointmentId, _context);
            var result = await _financesReportService.GetFinancesReportDetails(parameters);
            return Ok(result);
        }


    }
}
