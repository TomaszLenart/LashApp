import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ILocation } from '../location';
import { LocationService } from '../location.service';
import { BaseFormComponent } from 'src/app/shared/helpers/base.form.component';



@Component({
    selector: 'app-location-edit',
    templateUrl: './location-edit.component.html',
    styleUrls:['./location-edit.component.css']
})
export class LocationEditComponent 
    extends BaseFormComponent {

    // the view title
    title: string;

    // the form model
    form: FormGroup;

    // the city object to edit or create
    location: ILocation;

    // the city object id, as fetched from the active route:
    // It's NULL when we're adding a new location,
    // and not NULL when we're editing an existing one.
    id?: number;

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,
        private locationService: LocationService) {
            super();
            this.loadData();
    }

    ngOnInit() {
      this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            cityCode: new FormControl('', [Validators.required]) 
        }, null, this.isDupeLocation());

        this.loadData();
    }

    loadData() {

        // retrieve the ID from the 'id'
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        console.log('ID:')
        console.log(this.id);
        if (this.id) {
        // EDIT MODE

        // fetch the location from the server
        var url = this.baseUrl + "api/locations/" + this.id;
        this.http.get<ILocation>(url).subscribe(result => {
            this.location = result;
            this.title = "Edit - " + this.location.name;

            // update the form with the location value
            this.form.patchValue(this.location);
        }, error => console.error(error));
        }
        else {
        // ADD NEW MODE

        this.title = "Create a new Location";
        }
    }

    onSubmit() {

        var location = (this.id) ? this.location : <ILocation>{};

        location.name = this.form.get("name").value;
        location.address = this.form.get("address").value;
        location.city = this.form.get("city").value;
        location.cityCode = this.form.get("cityCode").value;

        if (this.id) {
        // EDIT mode

        var url = this.baseUrl + "api/locations/" + this.location.locationId;
        this.http
            .put<Location>(url, location)
            .subscribe(result => {

            console.log("Location " + location.locationId + " has been updated.");

            // go back to cities view
            this.router.navigate(['/locations']);
            }, error => console.log(error));
        }
        else {
        // ADD NEW mode
        var url = this.baseUrl + "api/locations";
        this.http
            .post<ILocation>(url, location)
            .subscribe(result => {

            console.log("Location " + result.locationId + " has been created.");

            // go back to cities view
            this.router.navigate(['/locations']);
            }, error => console.log(error));
        }
    }

    isLocationEdited(): boolean {
        if(this.form && this.location)
            return this.location.name !== this.form.get("name").value
                        || this.location.city !== this.form.get("city").value
                        || this.location.cityCode !== this.form.get("cityCode").value 
                        || this.location.address !== this.form.get("address").value 
        else return false;

    }

    isDupeLocation(): AsyncValidatorFn {
        console.log(this.isLocationEdited());

        if(this.isLocationEdited)
        {
            return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

                var location = <ILocation>{};
                location.locationId = (this.id) ? this.id : 0; 
                location.name = this.form.get("name").value;
                location.address = this.form.get("address").value;
                location.city = this.form.get("city").value;
                location.cityCode = this.form.get("cityCode").value;
    
                return this.locationService.isDupeLocation(location)
                    .pipe(map(result => {
                        return (result ? { isDupeLocation: true } : null);
                    }));
            }
        }
        else 
            return null;
       
    }
}
