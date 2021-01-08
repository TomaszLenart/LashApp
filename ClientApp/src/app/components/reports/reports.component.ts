import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { IReport } from './reports-model';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

//   public report: IProduct;
//    @ViewChild(ProductHistoryComponent) reportHisotryComponent: ProductHistoryComponent;

  isProductAvailable: boolean = false;
  id:number;
  public chosenReport:IReport;

  constructor(private activatedRoute: ActivatedRoute) {
    // this.report={name:'asdasd',price:20,active:true,reportId:1,quantity:5}
  }

  ngOnInit() {
    // this.loadData();
  }
  onReportChange(report:IReport){
     this.chosenReport = report; 
  }

//   loadData(query: string = null) {
//     this.id = +this.activatedRoute.snapshot.paramMap.get('id');
//     if (this.id) {
//     // EDIT MODE

//     // fetch the client from the server
//     // this.reportService.get<IProduct>(this.id).subscribe(result => {
//     //         this.report = result;
//     //         console.log(this.report);
//     //         this.isProductAvailable = true;
//     //     }, error => console.error(error));
//     // }
//     }
//     }

//   quantityChange(param:any){
//     this.reportHisotryComponent.ngOnInit();
//   }

}
