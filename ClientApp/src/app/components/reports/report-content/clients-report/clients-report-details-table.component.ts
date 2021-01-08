import { Component, ViewChild, Input, Inject, OnInit } from '@angular/core';
import { TableHelpers } from 'src/app/shared/helpers/table-helpers';
import * as $ from 'jquery';
import { MatTableDataSource } from '@angular/material/table';
import { IClientsReportDetailsItem } from './clients-report-details-item';

@Component({
    selector: 'clients-details-table',
    templateUrl: '../report-table.template.html',
    styleUrls:['../report-table.css']
})
export class ClientsReportDetailsTableComponent implements OnInit{

    constructor( private _tableHelpers: TableHelpers,  @Inject('BASE_URL') private baseUrl: string) {

    }
    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<IClientsReportDetailsItem>(this.items);
    }

    tableId: string = "clients-details-table";
    colNames = [
        "enrollDate",
        "firstName",
        "lastName",
        "dateOfBirth"
       
    ]
    dataSource;
    items: any = [

        {'enrollDate':'2020-12-12', 'firstName':'Weronika','lastName':'Augustyn', 'dateOfBirth':'1996-03-12'},
        {'enrollDate':'2020-12-12', 'firstName':'Tomek','lastName':'Lenart', 'dateOfBirth':'1996-03-12'},

    ]

    // @Input() parameters: ClientsReportParameters = new ClientsReportParameters();
    // route: string = ApiRoutes.ClientsDetails;
    table;

    // ngAfterViewInit() {
    //     // var options = this._tableHelpers.prepareClientsReportTableOptions(this.baseUrl + '/api/ClientsReport/details')
    //     // this.table = (<any>$("#" + this.tableId)).DataTable(options);
    //     this.dataSource = new MatTableDataSource<IClientsReportDetailsItem>(this.items);
    // }

    // generate(){
    //     var options = this._tableHelpers.prepareClientsReportTableOptions(this.baseUrl + '/api/ClientsReport/details')
    //     this.table = (<any>$("#" + this.tableId)).DataTable(options);
    // }
    // // public refreshTable() {
    //     if(this.table.settings()[0].jqXHR){
    //         this.table.settings()[0].jqXHR.abort();
    //     }
    //     this.table.clear();
    //     this.table.destroy();
    //     var options = this._tableHelpers.prepareClientsReportTableOptions(this.route, this.parameters)
    //     this.table = (<any>$("#" + this.tableId)).DataTable(options);
    // }

  
}



