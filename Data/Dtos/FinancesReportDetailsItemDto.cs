using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Dtos
{
    public class FinancesReportDetailsItemDto
    {
        public int Position { get; set; }
        public DateTime? Date { get; set; }
        public string Name { get; set; }
        public decimal? Value { get; set; }

    }
}
