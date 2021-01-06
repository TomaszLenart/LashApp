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
using LashApp.Data.Interfaces;

namespace LashApp.Controllers.Appointments
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPaymentService _paymentService;

        public AppointmentsController(AppDbContext context
            , IPaymentService paymentService
            )
        {
            _context = context;
            _paymentService = paymentService;
        }

        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<ApiResult<AppointmentDto>>> GetAppointments(
        int pageIndex = 0,
        int pageSize = 10,
        string sortColumn = null,
        string sortOrder = null,
        string filterColumn = null,
        string filterQuery = null)
        {
            return await ApiResult<AppointmentDto>.CreateAsync(
             _context.Appointments
             .Select(a => new AppointmentDto()
             {
                 AppointmentId = a.AppointmentId,
                 Active = a.Active,
                 Client = a.Client.FirstName + ' ' + a.Client.LastName,
                 ClientPhone = a.Client.Phone,
                 Location = a.Location.Name,
                 Worker = a.Worker.FirstName + ' ' + a.Worker.LastName,
                 Treatment = a.Treatment.Name,
                 Date = a.Date,
                 Hour = a.Hour,
                 IsPaid = a.IsPaid

             }),
             pageIndex,
             pageSize,
             sortColumn,
             sortOrder,
             filterColumn,
             filterQuery);
        }

        // GET: api/Appointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var Appointment = await _context.Appointments.FindAsync(id);

            if (Appointment == null)
            {
                return NotFound();
            }

            return Appointment;
        }

        // PUT: api/Appointments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, Appointment Appointment)
        {
            if (id != Appointment.AppointmentId)
            {
                return BadRequest();
            }

            _context.Entry(Appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
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

        // POST: api/Appointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment Appointment)
        {
            _context.Appointments.Add(Appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = Appointment.AppointmentId }, Appointment);
        }

        // DELETE: api/Appointments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var Appointment = await _context.Appointments.FindAsync(id);
            if (Appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(Appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointments.Any(e => e.AppointmentId == id);
        }

        // POST: api/Appointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("ProcessPayment/{appointmentId}")]
        public async Task<ActionResult<bool>> ProcessPayment(int appointmentId)
        {
            var result = await _paymentService.ProcessPayment(appointmentId,_context);

            return Ok(result);
        }

    }
}
