import { Component, Inject, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../product.service';
import { IProduct } from '../../product';
import { IProductQuantityChange } from '../product-quantity-change/product-quantity-change';
@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.css']
})
export class ProductHistoryComponent {

  public displayedColumns: string[] = ['date', 'quantityChange'];
  public quantityChanges: MatTableDataSource<IProductQuantityChange>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "date";
  public defaultSortOrder: string = "asc";
  defaultFilterColumn: string = "date";
  filterQuery:string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() product: IProduct;
  
  constructor( private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private productService: ProductService) {
  }
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

        const url = this.baseUrl + 'api/ProductQuantityChanges/'+this.product.productId;
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
            console.log(result);

            this.paginator.length = result.totalCount;
            this.paginator.pageIndex = result.pageIndex;
            this.paginator.pageSize = result.pageSize;
            this.quantityChanges = new MatTableDataSource<IProductQuantityChange>(result.data);
          }, error => console.error(error));
  }
}
