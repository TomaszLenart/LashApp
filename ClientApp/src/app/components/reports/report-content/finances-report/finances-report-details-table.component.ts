import { Component, ViewChild, Input, Inject, OnInit } from '@angular/core';
import { TableHelpers } from 'src/app/shared/helpers/table-helpers';
import * as $ from 'jquery';
import { MatTableDataSource } from '@angular/material/table';
import { IFinancesReportDetailsItem } from './models/finances-report-details-item';
import { ReportService } from '../../report.service';
import { IFinancesReportParameters } from './models/finances-report-parameters';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'finances-details-table',
    templateUrl: '../report-table.template.html',
    styleUrls:['../report-table.css']
})
export class FinancesReportDetailsTableComponent implements OnInit{


    params:IFinancesReportParameters;
    @Input() dataSource:MatTableDataSource<IFinancesReportDetailsItem>;
    colNames = [
        "position",
        "date",
        "name",
        "value"
       
    ]

    constructor() {
      
    }

    ngOnInit(): void {
        
    }


   
  
}