import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  public product: IProduct;

  isProductAvailable: boolean = false;
  id:number;
  
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
    // this.product={name:'asdasd',price:20,active:true,productId:1,quantity:5}
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(query: string = null) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
    // EDIT MODE

    // fetch the client from the server
    this.productService.get<IProduct>(this.id).subscribe(result => {
            this.product = result;
            console.log(this.product);
            this.isProductAvailable = true;
        }, error => console.error(error));
    }
  }

}
