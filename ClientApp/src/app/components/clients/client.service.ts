import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';


@Injectable({
  providedIn: 'root',
})
export class ClientService
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
        var url = this.baseUrl + 'api/Clients';
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

    get<IClient>(id): Observable<IClient> {
        var url = this.baseUrl + "api/Clients/" + id;
        return this.http.get<IClient>(url);
    }

    put<IClient>(item): Observable<IClient> {
        var url = this.baseUrl + "api/Clients/" + item.clientId;
        return this.http.put<IClient>(url, item);
    }

    post<IClient>(item): Observable<IClient> {
        console.log(item);
        var url = this.baseUrl + "api/Clients";
        return this.http.post<IClient>(url, item);
    }

    getLocations<ApiResult>(
        pageIndex: number,
        pageSize: number,
        sortColumn: string,
        sortOrder: string,
        filterColumn: string,
        filterQuery: string
    ): Observable<ApiResult> {
        var url = this.baseUrl + 'api/Locations';
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

    isDupeEmail(email: string): Observable<boolean> {
        var url = this.baseUrl + "api/Clients/IsDupeEmail";
        return this.http.post<boolean>(url, email);
    }

    isDupePhone(phone: string): Observable<boolean> {
        var url = this.baseUrl + "api/Clients/IsDupePhone";
        return this.http.post<boolean>(url, phone);
    }
}
