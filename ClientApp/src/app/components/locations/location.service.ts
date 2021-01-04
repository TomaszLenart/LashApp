import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { ILocation } from './location';


@Injectable({
  providedIn: 'root',
})
export class LocationService
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

    get<Location>(id): Observable<Location> {
        var url = this.baseUrl + "api/Locations/" + id;
        return this.http.get<Location>(url);
    }

    put<Location>(item): Observable<Location> {
        var url = this.baseUrl + "api/Locations/" + item.id;
        return this.http.put<Location>(url, item);
    }

    post<Location>(item): Observable<Location> {
        var url = this.baseUrl + "api/Locations/" + item.id;
        return this.http.post<Location>(url, item);
    }

    isDupeLocation(location: ILocation ): Observable<boolean> {
        var url = this.baseUrl + "api/Locations/IsDupeLocation";
        return this.http.post<boolean>(url, location);
    }
}
