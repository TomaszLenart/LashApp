import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { IAppointment } from './appointment';


@Injectable({
  providedIn: 'root',
})
export class AppointmentService
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
        var url = this.baseUrl + 'api/Appointments';
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

    get<Appointment>(id): Observable<Appointment> {
        var url = this.baseUrl + "api/Appointments/" + id;
        return this.http.get<Appointment>(url);
    }

    put<Appointment>(item): Observable<Appointment> {
        var url = this.baseUrl + "api/Appointments/" + item.id;
        return this.http.put<Appointment>(url, item);
    }

    post<Appointment>(item): Observable<Appointment> {
        var url = this.baseUrl + "api/Appointments/" + item.id;
        return this.http.post<Appointment>(url, item);
    }

    isDupeAppointment(appointment: IAppointment ): Observable<boolean> {
        var url = this.baseUrl + "api/Appointments/IsDupeAppointment";
        return this.http.post<boolean>(url, appointment);
    }
}
