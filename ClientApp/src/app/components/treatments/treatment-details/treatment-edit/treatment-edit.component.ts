import { Component, Inject } from '@angular/core';
// import { HttpTreatment, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/helpers/base.form.component';
import { ITreatment } from '../../treatment';
import { ApiResult } from 'src/app/shared/services/base.service';
import { TreatmentService } from '../../treatments.service';


@Component({
  selector: 'app-treatment-edit',
  templateUrl: './treatment-edit.component.html',
  styleUrls: ['./treatment-edit.component.css']
})
export class TreatmentEditComponent
  extends BaseFormComponent {

    // the view title
    title: string;

    // the form model
    form: FormGroup;

    // the treatment object to edit or create
    treatment: ITreatment;

    // the treatment object id, as fetched from the active route:
    // It's NULL when we're adding a new treatment,
    // and not NULL when we're editing an existing one.
    id?: number;

    // the locations array for the select
    locations: Location[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private treatmentService: TreatmentService) {
        super();
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            duration: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,2}\:[0-9]{2}$')]),
            shortDescription: new FormControl(''),
            details: new FormControl('')
        }, null,);

        this.loadData();
    }

    loadData() {

        // load locations
        this.loadLocations();

        // retrieve the ID from the 'id'
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        if (this.id) {
        // EDIT MODE

        // fetch the treatment from the server
        this.treatmentService.get<ITreatment>(this.id).subscribe(result => {
            this.treatment = result;
            this.title = "Edit - " + this.treatment.name;

            // update the form with the treatment value
            this.form.patchValue(this.treatment);
        }, error => console.error(error));
        }
        else {
        // ADD NEW MODE

        this.title = "Create a new Treatment";
        }
    }

    loadLocations() {
        // fetch all the locations from the server
        this.treatmentService.getLocations<ApiResult<Location>>(
        0,
        9999,
        "name",
        null,
        null,
        null,
        ).subscribe(result => {
        this.locations = result.data;
        }, error => console.error(error));
    }

    onSubmit() {

        var treatment = (this.id) ? this.treatment : <ITreatment>{};

        treatment.name = this.form.get("name").value;
        treatment.price = this.form.get("price").value;
        treatment.duration = this.form.get("duration").value;
        treatment.shortDescription = this.form.get("shortDescription").value;
        treatment.details = this.form.get("details").value;
        treatment.activeFrom = new Date();
        console.log(treatment);
        if (this.id) {
        // EDIT mode
        this.treatmentService
            .put<ITreatment>(treatment)
            .subscribe(result => {

                console.log("Treatment " + treatment.treatmentId + " has been updated.");

                // go back to treatments view
                this.router.navigate(['/treatments']);
            }, error => console.log(error));
        }
        else {
        // ADD NEW mode
        this.treatmentService
            .post<ITreatment>(treatment)
            .subscribe(result => {

                console.log("Treatment " + result.treatmentId + " has been created.");

                // go back to treatments view
                this.router.navigate(['/treatments']);
            }, error => console.log(error));
        }
    }

}

