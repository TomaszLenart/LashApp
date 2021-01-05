import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IAppointment } from './appointment';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {

  public displayedColumns: string[] = ['appointmentId', 'from', 'hour', 'location','treatment','client','clientPhone'];
  public appointments: MatTableDataSource<IAppointment>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "date";
  public defaultSortOrder: string = "asc";
  defaultFilterColumn: string = "client";
  filterQuery:string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor( private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.loadData();
  }

  loadData(query: string = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.getData(pageEvent);
    if (query) {
      this.filterQuery = query;
      }
  }

  getData(event: PageEvent) {

    const url = this.baseUrl + 'api/Appointments';
    let params = new HttpParams()
      .set('pageIndex', event.pageIndex.toString())
      .set('pageSize', event.pageSize.toString())
      .set("sortColumn", (this.sort) ? this.sort.active : this.defaultSortColumn)
      .set("sortOrder", (this.sort) ? this.sort.direction : this.defaultSortOrder);

    if (this.filterQuery) {
        params = params
        .set("filterColumn", this.defaultFilterColumn)
        .set("filterQuery", this.filterQuery);
        }

    this.http.get<any>(url, { params })
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        console.log(result);
        this.appointments = new MatTableDataSource<IAppointment>(result.data);
      }, error => console.error(error));
  }

  getRecord(row){
    console.log(row);
  }
}
