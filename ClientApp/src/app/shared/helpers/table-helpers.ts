import { Injectable } from "@angular/core";


@Injectable()
export class TableHelpers{

    constructor(
        // private _reportsService: ReportsService
        ) {
        
    }

    options:any;

    public prepareFinancesReportTableOptions(route:string
        // ,
        //  parameters:PassSalesReportParameters
         ){
        

        // this.urlString=this._reportsService.shareServiceUrl()+route;

        this.options={
            responsive: true,
            processing:true,
            serverSide:true,
            info:true,
            scrollX: true,
            ajax:{
                crossDomain:"true",
                url:"url",
                type:"GET",
                // headers:this.authHeaders.toJSON(),
                data:{
                    "test":"test"
                    // "to":parameters.to,
                    // "passName":parameters.passName,
                    // "clientName":parameters.clientName,
                    // "clientId": parameters.clientId,
                    // "locationIds":parameters.locationIds,
                    // "workerId":parameters.workerId,
                    // "passType":parameters.passType,
                    // "noContractPasses":parameters.noContractPasses,   
                    // "includeCancellation": parameters.includeCancellation,             
                    // "paymentForm":parameters.paymentForm,
                },
                order:[[0, "asc"]]
            }
            // ,
            // language:languageToUse
        }
        return this.options;
    }
}