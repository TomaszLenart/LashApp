﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.QueryParameters
{
    public class FinancesReportParameters
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public bool incomeOnly { get; set; }
    }
}
