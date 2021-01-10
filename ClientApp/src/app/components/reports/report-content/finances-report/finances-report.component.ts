import { Component, ViewChild, Input, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    form: FormGroup;
    incomeOnly = false;

    constructor( private _tableHelpers: TableHelpers,  @Inject('BASE_URL') private baseUrl: string, private reportService: ReportService) {
        this.form = new FormGroup({
            from: new FormControl('', Validators.required),
            to: new FormControl('', Validators.required)});
            

    }
    generate(){
      this.setParams();

        this.reportService.getFinancesReportDetails(this.params).subscribe( result =>{
            console.log(result);
            this.dataSource = new MatTableDataSource<IFinancesReportDetailsItem>(result);

            }
        )
    }
    setParams(){
        this.params = new IFinancesReportParameters();
        this.params.from = this.form.get("from").value;
        this.params.to = this.form.get("to").value;
        this.params.incomeOnly = this.incomeOnly;
    }
}