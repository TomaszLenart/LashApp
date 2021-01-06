using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LashApp.Data.Db;
using LashApp.Data.Interfaces;

namespace LashApp.Data.Services
{
    public class PaymentService : IPaymentService
    {
        //private readonly AppDbContext _context;

        public PaymentService()
        {
            //_context = context;
        }
        public async Task<bool> ProcessPayment(int appointmentId, AppDbContext _context)
        {
           
                var result = false;

               
                try
                {
                    var payment = _context.Appointments
                   .Where(a => a.AppointmentId == appointmentId)
                   .FirstOrDefault();

                    if (payment != null)
                    {
                        payment.IsPaid = true;
                        payment.PayDate = DateTime.Now;

                        try
                        {
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception e)
                        {
                            return false;
                        }
                        result = true;
                    }
                    return result;
                }
                catch (Exception e)
                {
                    return false;
                }

            
         
        }
    }
}
