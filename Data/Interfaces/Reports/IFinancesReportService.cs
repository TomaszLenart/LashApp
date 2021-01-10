using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LashApp.Data.Dtos;
using LashApp.Data.QueryParameters;

namespace LashApp.Data.Interfaces.Reports
{
    public interface IFinancesReportService
    {
        Task<IList<FinancesReportDetailsItemDto>> GetFinancesReportDetails(FinancesReportParameters parameters);
    }
}
