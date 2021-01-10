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

    constructor( private _tableHelpers: TableHelpers,  @Inject('BASE_URL') private baseUrl: string, private ReportService) {

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

        {'enrollDate':'2020-12-12', 'firstName':'Weronika','lastName':'Kowalska', 'dateOfBirth':'1996-03-12'},
        {'enrollDate':'2020-12-12', 'firstName':'Tomek','lastName':'Atomek', 'dateOfBirth':'1996-03-12'},

    ]

    table;

  
}



