import { Component, Inject, Input } from '@angular/core';
// import { HttpProduct, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/helpers/base.form.component';
import { ApiResult } from 'src/app/shared/services/base.service';
import { IProduct } from '../../product';
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent
  extends BaseFormComponent {

    // the view title
    title: string;

    // the form model
    form: FormGroup;

    // the product object to edit or create
   @Input() product: IProduct;

    // the product object id, as fetched from the active route:
    // It's NULL when we're adding a new product,
    // and not NULL when we're editing an existing one.
    id?: number;

    // the locations array for the select
    locations: Location[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private productService: ProductService) {
        super();
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            quantity: new FormControl('', Validators.required),
            price: new FormControl('', [Validators.required])
        }, null,);

        this.form.patchValue(this.product);
    }

    loadData() {

        // load locations
        // retrieve the ID from the 'id'
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        if (this.id) {
        // EDIT MODE

        // fetch the product from the server
        this.productService.get<IProduct>(this.id).subscribe(result => {
            this.product = result;
            this.title = "Edit - " + this.product.name;

            // update the form with the product value
            this.form.patchValue(this.product);
        }, error => console.error(error));
        }
        else {
        // ADD NEW MODE

        this.title = "Create a new Product";
        }
    }

    onSubmit() {

        var product = (this.product) ? this.product : <IProduct>{};

        product.name = this.form.get("name").value;
        console.log(product);
        if (this.id) {
        // EDIT mode
        this.productService
            .put<IProduct>(product)
            .subscribe(result => {

                console.log("Product " + product.productId + " has been updated.");

                // go back to products view
                this.router.navigate(['/products']);
            }, error => console.log(error));
        }
        else {
        // ADD NEW mode
        this.productService
            .post<IProduct>(product)
            .subscribe(result => {

                console.log("Product " + result.productId + " has been created.");

                // go back to products view
                this.router.navigate(['/products']);
            }, error => console.log(error));
        }
    }

}

