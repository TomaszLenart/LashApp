import { Component, Inject } from '@angular/core';
// import { HttpTreatment, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/helpers/base.form.component';
import { ITreatment } from '../treatment';
import { ApiResult } from 'src/app/shared/services/base.service';


@Component({
  selector: 'app-treatment-details',
  templateUrl: './treatment-details.component.html',
  styleUrls: ['./treatment-details.component.css']

})
export class TreatmentDetailsComponent {

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

    
}

