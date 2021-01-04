import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IClient } from './client';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  public displayedColumns: string[] = ['clientId', 'firstName', 'lastName', 'email','phone','dateOfBirth','assignDate', 'location', 'details'];
  public clients: MatTableDataSource<IClient>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "lastName";
  public defaultSortOrder: string = "asc";
  defaultFilterColumn: string = "lastName";
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

    const url = this.baseUrl + 'api/Clients';
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
        this.clients = new MatTableDataSource<IClient>(result.data);
      }, error => console.error(error));
  }

  getRecord(row){
    console.log(row);
  }
}
