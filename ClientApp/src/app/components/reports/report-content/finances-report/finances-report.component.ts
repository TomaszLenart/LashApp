import { Component, ViewChild, Input, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableHelpers } from 'src/app/shared/helpers/table-helpers';
import { ReportService } from '../../report.service';
import { IFinancesReportDetailsItem } from './models/finances-report-details-item';
import { IFinancesReportParameters } from './models/finances-report-parameters';

@Component({
    selector: 'app-finances-report',
    templateUrl: 'finances-report.component.html',
    styleUrls:['../report-table.css']
})
export class FinancesReportComponent {

    params:IFinancesReportParameters;
    dataSource:MatTableDataSource<IFinancesReportDetailsItem>;

    constructor( private _tableHelpers: TableHelpers,  @Inject('BASE_URL') private baseUrl: string, private reportService: ReportService) {

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