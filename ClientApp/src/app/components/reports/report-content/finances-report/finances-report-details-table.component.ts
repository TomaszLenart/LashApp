import { Component, ViewChild, Input, Inject, OnInit } from '@angular/core';
import { TableHelpers } from 'src/app/shared/helpers/table-helpers';
import * as $ from 'jquery';
import { MatTableDataSource } from '@angular/material/table';
import { IFinancesReportDetailsItem } from './models/finances-report-details-item';
import { ReportService } from '../../report.service';
import { IFinancesReportParameters } from './models/finances-report-parameters';

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

    constructor( private _tableHelpers: TableHelpers,  @Inject('BASE_URL') private baseUrl: string, private reportService: ReportService) {

    }

    ngOnInit(): void {
        
    }

    generate(){
        this.params = {
            from: new Date('2021-01-01'),
            to: new Date('2021-01-10'),
            incomeOnly: false
        }

        this.reportService.getFinancesReportDetails(this.params).subscribe( result =>{
            console.log(result);
            this.dataSource = new MatTableDataSource<IFinancesReportDetailsItem>(result);

            }
        )
    }

  
}