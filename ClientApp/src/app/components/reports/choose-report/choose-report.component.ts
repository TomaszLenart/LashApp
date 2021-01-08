import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { IReport, REPORTS } from '../reports-model';


@Component({
  selector: 'app-choose-report',
  templateUrl: './choose-report.component.html'
//   styleUrls: ['./choose-report.component.css']
})
export class ChooseReportComponent  {

//   public choose-report: IProduct;
//    @ViewChild(ProductHistoryComponent) choose-reportHisotryComponent: ProductHistoryComponent;
    @Output() reportChange: EventEmitter<any> = new EventEmitter();

  isProductAvailable: boolean = false;
  id:number;

  reports: IReport[] = REPORTS;
  
  constructor(private activatedRoute: ActivatedRoute) {
    // this.choose-report={name:'asdasd',price:20,active:true,choose-reportId:1,quantity:5}
  }

  ngOnInit() {
    // this.loadData();
  }

//   loadData(query: string = null) {
//     this.id = +this.activatedRoute.snapshot.paramMap.get('id');
//     if (this.id) {
//     // EDIT MODE

//     // fetch the client from the server
//     // this.choose-reportService.get<IProduct>(this.id).subscribe(result => {
//     //         this.choose-report = result;
//     //         console.log(this.choose-report);
//     //         this.isProductAvailable = true;
//     //     }, error => console.error(error));
//     // }
//     }
//     }

//   quantityChange(param:any){
//     this.choose-reportHisotryComponent.ngOnInit();
//   }

    chooseReport(report){
        console.log('asdasdasd');
        console.log(report);
        this.reportChange.emit(report)
    }
}
