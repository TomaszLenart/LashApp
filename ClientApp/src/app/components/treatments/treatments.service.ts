import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';


@Injectable({
  providedIn: 'root',
})
export class TreatmentService
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
        var url = this.baseUrl + 'api/Treatments';
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

    get<ITreatment>(id): Observable<ITreatment> {
        var url = this.baseUrl + "api/Treatments/" + id;
        return this.http.get<ITreatment>(url);
    }

    put<ITreatment>(item): Observable<ITreatment> {
        var url = this.baseUrl + "api/Treatments/" + item.treatmentId;
        return this.http.put<ITreatment>(url, item);
    }

    post<ITreatment>(item): Observable<ITreatment> {
        console.log(item);
        var url = this.baseUrl + "api/Treatments";
        return this.http.post<ITreatment>(url, item);
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
        var url = this.baseUrl + "api/Treatments/IsDupeEmail";
        return this.http.post<boolean>(url, email);
    }

    isDupePhone(phone: string): Observable<boolean> {
        var url = this.baseUrl + "api/Treatments/IsDupePhone";
        return this.http.post<boolean>(url, phone);
    }
}
