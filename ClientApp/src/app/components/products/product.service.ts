import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { IProduct } from './product';


@Injectable({
  providedIn: 'root',
})
export class ProductService
    extends BaseService {
    constructor(
        http: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        super(http, baseUrl);
    }

    getData<ApiResult>(
        pageIndex: number,
        pageSize: number,
        sortColumn: string,
        sortOrder: string,
        filterColumn: string,
        filterQuery: string
    ): Observable<ApiResult> {
        var url = this.baseUrl + 'api/Products';
        var params = new HttpParams()
        .set("pageIndex", pageIndex.toString())
        .set("pageSize", pageSize.toString())
        .set("sortColumn", sortColumn)
        .set("sortOrder", sortOrder);

        if (filterQuery) {
        params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
        }

        return this.http.get<ApiResult>(url, { params });
    }

    get<Product>(id): Observable<Product> {
        var url = this.baseUrl + "api/Products/" + id;
        return this.http.get<Product>(url);
    }

    put<Product>(item): Observable<Product> {
        var url = this.baseUrl + "api/Products/" + item.id;
        return this.http.put<Product>(url, item);
    }

    post<Product>(item): Observable<Product> {
        var url = this.baseUrl + "api/Products/" + item.id;
        return this.http.post<Product>(url, item);
    }

    getProductQuantityChangesByProduct<IProductQuantityChange>(id): Observable<IProductQuantityChange> {
        var url = this.baseUrl + "api/ProductQuantityChanges/" + id;
        return this.http.get<IProductQuantityChange>(url);
    }

    processPayment(item): Observable<boolean> {
        var url = this.baseUrl + "api/Products/ProcessPayment";
        
        // let headers = new HttpHeaders({
        //     'Access-Control-Allow-Origin': '*',
        //      });
        // let options = { headers: headers };
        // item.isPaid = false;
        // console.log(item);
        // return this.http.post<boolean>(url, item);


        var url = this.baseUrl + "api/Products/ProcessPayment/" + item.productId;
        return this.http.post<boolean>(url, item);
    }

    isDupeProduct(product: IProduct ): Observable<boolean> {
        // let headers = new HttpHeaders();
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/');
        // headers.append('Access-Control-Allow-Origin', '*');


        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
             });
        let options = { headers: headers };


        var url = this.baseUrl + "api/Products/IsDupeProduct";
        return this.http.post<boolean>(url, product,options);
    }
}
