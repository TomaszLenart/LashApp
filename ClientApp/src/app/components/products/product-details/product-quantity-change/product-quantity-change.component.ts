import { Component, Inject, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IProductQuantityChange } from './product-quantity-change';
import { ProductService } from '../../product.service';
import { IProduct } from '../../product';
@Component({
  selector: 'app-product-quantity-change',
  templateUrl: './product-quantity-change.component.html',
  styleUrls: ['./product-quantity-change.component.css']
})
export class ProductQuantityChangeComponent {

  public displayedColumns: string[] = ['productQuantityChangeId', 'quantity'];
  public productQuantityChanges: MatTableDataSource<IProductQuantityChange>;



  quantityChanges: IProductQuantityChange[];

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: string = "asc";
  defaultFilterColumn: string = "name";
  filterQuery:string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() product: IProduct;
  
  constructor( private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private productService: ProductService) {
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    // this.loadData();
  }

  loadData(query: string = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    // this.getData(pageEvent);
    if (query) {
      this.filterQuery = query;
      }
  }

  add(){
    console.log('adding');
  }

  sub(){
    console.log('subbing');
  }
  getData(event: PageEvent) {

    const url = this.baseUrl + 'api/Products/ProductQuantityChanges';
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
        this.productQuantityChanges = new MatTableDataSource<IProductQuantityChange>(result.data);
      }, error => console.error(error));
  }
}
