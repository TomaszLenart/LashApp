using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using LashApp.Data.Db;
using LashApp.Data.Dtos;
using LashApp.Data.Interfaces.Reports;
using LashApp.Data.QueryParameters;
using LashApp.Data.Scripts;
using Microsoft.Data.SqlClient;

namespace LashApp.Data.Services.Reports
{
    public class FinancesReportService : IFinancesReportService
    {
        private const string connectionSrting = "Server=localhost;Database=LashApp;Trusted_Connection=True";
        string _genericCommmandText;

        const string DateColName = "Date";
        const string NameColName = "Name";
        const string ValueColName = "Value";


        private string FormatCommand(string command)
        {
            const string Colon = ":";

            var lines = command.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None);
            var processedLines = new List<string>(lines.Length);
            foreach (var line in lines)
            {
                if (line.StartsWith(Colon, StringComparison.Ordinal))
                    continue;

                processedLines.Add(line);
            }

            return String.Join(Environment.NewLine, processedLines);
        }
        public async Task<IList<FinancesReportDetailsItemDto>> GetFinancesReportDetails(FinancesReportParameters parameters)
        {
            var result = new List<FinancesReportDetailsItemDto>();



            using (var conn = new SqlConnection(connectionSrting))
            {
                await conn.OpenAsync().ConfigureAwait(false);
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = FormatCommand(SqlScripts.GetFinancesReportDetails);
                cmd.CommandType = CommandType.Text;


                using (var reader = await cmd.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    int posIndex = 1;

                    while (await reader.ReadAsync().ConfigureAwait(false))
                    {

                        var item = new FinancesReportDetailsItemDto
                        {
                            Position = posIndex++,
                            Name = reader.GetString(NameColName),
                            Date = (DateTime?)reader.GetDateTime(DateColName),
                            Value = reader.GetDecimal(ValueColName)
                          


                        };
                        result.Add(item);

                    }
                }

            }
            return result;
        }
    }
}
        

//        //using (
//        ////var cmd = _commandApplier.CreateCommand(queryParameters)
//        //)
//        //{
//        cmd.CommandText = FormatCommand(SqlScripts.GetFinancesReportDetails);
//            cmd.Connection = new SqlConnection(connectionSrting);

//            using (var reader = await cmd.ExecuteReaderAsync().ConfigureAwait(false))
//            {
//                bool hasRun = false;
//                int posIndex = 1;

//                while (await reader.ReadAsync().ConfigureAwait(false))
//                {

//                    var item = new SalaryReportDetailsItemDto
//                    {
//                        Position = posIndex++,
//                        FirstName = reader.GetString(FirstNameColName),
//                        SecondName = reader.GetString(SecondNameColName),
//                        Email = reader.GetString(EmailColName),
//                        Phone = reader.GetString(PhoneColName),
//                        WorkerPosition = reader.GetString(WorkerPositionColName),
//                        SalaryNet = reader.GetValue<decimal?>(SalaryNetColName),
//                        Currency = reader.GetValue<short?>(CurrencyColName),
//                        PaymentForm = reader.GetValue<int?>(PaymentFromColName),
//                        BankName = reader.GetString(BankNameColName),
//                        BankAccount = reader.GetString(BankAccountColName)


//                    };
//                    result.Items.Add(item);


//                    if (!hasRun)
//                    {
//                        result.TotalRows = reader.GetValue<int>(TotalRowsColName);
//                        hasRun = true;
//                    }
//                }
//                //}



//                return result;
//                //var scripts = 

//                //using( var context = new AppDbContext())
//                //{
//                //    var treatments = context.Appointments
//                //}

//            }
//        }
//    }
//}
      
    
    

