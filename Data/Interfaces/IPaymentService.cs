using System.Threading.Tasks;
using LashApp.Data.Db;

namespace LashApp.Data.Interfaces
{
    public interface IPaymentService
    {
        Task<bool> ProcessPayment(int appointmentId, AppDbContext context);
    }
}
