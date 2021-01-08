import { Component, Input, EventEmitter, Output } from "@angular/core";
import { IReport, REPORTS } from "../reports-model";


@Component({
    selector: 'report-content',
    templateUrl: './report-content.component.html'
})
export class ReportContentComponent {

    constructor() {
            
    }
   
    @Input() chosenReport: IReport;
    public reports: IReport[] = REPORTS;

}