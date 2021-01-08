import { Component, ViewChild, Input, Inject, OnInit } from '@angular/core';
import { TableHelpers } from 'src/app/shared/helpers/table-helpers';
import * as $ from 'jquery';
import { MatTableDataSource } from '@angular/material/table';
import { IFinancesReportDetailsItem } from './finances-report-details-item';

@Component({
    selector: 'finances-details-table',
    templateUrl: '../report-table.template.html',
    styleUrls:['../report-table.css']
})
export class FinancesReportDetailsTableComponent implements OnInit{

    constructor( private _tableHelpers: TableHelpers,  @Inject('BASE_URL') private baseUrl: string) {

    }
    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<IFinancesReportDetailsItem>(this.items);
    }

    tableId: string = "finances-details-table";
    colNames = [
        "date",
        "name",
        "price"
       
    ]
    dataSource;
    items: any = [

        {'date':'2020-12-12', 'name':'Waciki','price':'5'},
        {'date':'2020-12-13', 'name':'Waciki','price':'5'}

    ]

    // @Input() parameters: FinancesReportParameters = new FinancesReportParameters();
    // route: string = ApiRoutes.FinancesDetails;
    table;

    // ngAfterViewInit() {
    //     // var options = this._tableHelpers.prepareFinancesReportTableOptions(this.baseUrl + '/api/FinancesReport/details')
    //     // this.table = (<any>$("#" + this.tableId)).DataTable(options);
    //     this.dataSource = new MatTableDataSource<IFinancesReportDetailsItem>(this.items);
    // }

    // generate(){
    //     var options = this._tableHelpers.prepareFinancesReportTableOptions(this.baseUrl + '/api/FinancesReport/details')
    //     this.table = (<any>$("#" + this.tableId)).DataTable(options);
    // }
    // public refreshTable() {
    //     if(this.table.settings()[0].jqXHR){
    //         this.table.settings()[0].jqXHR.abort();
    //     }
    //     this.table.clear();
    //     this.table.destroy();
    //     var options = this._tableHelpers.prepareFinancesReportTableOptions(this.route, this.parameters)
    //     this.table = (<any>$("#" + this.tableId)).DataTable(options);
    // }

  
}