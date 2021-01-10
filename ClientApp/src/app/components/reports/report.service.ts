import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { IFinancesReportDetailsItem } from './report-content/finances-report/models/finances-report-details-item';
import { IFinancesReportParameters } from './report-content/finances-report/models/finances-report-parameters';
import { param } from 'jquery';


@Injectable({
  providedIn: 'root',
})
export class ReportService 
{
    baseUrl: string;
    constructor(
        @Inject('BASE_URL') baseUrl: string, private http: HttpClient) {
            this.baseUrl = baseUrl;
            
    }

    getFinancesReportDetails(params: IFinancesReportParameters): Observable<any> {

        let data = {
            "from": params.from,
            "to": params.to,
            "incomeOnly": params.incomeOnly
        }
        
        var url = this.baseUrl + "api/FinancesReport/details" ;
        return this.http.post<any>(url,data);
    }

    
}
