import { Component, Inject } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/helpers/base.form.component';

import { ApiResult } from 'src/app/shared/services/base.service';


@Component({
  selector: 'app-treatment-statistics',
  templateUrl: './treatment-statistics.component.html'
})
export class TreatmentStatisticsComponent {

    // the view title
    title: string;

    // the form model
    form: FormGroup;

    // the client object to edit or create

    // the client object id, as fetched from the active route:
    // It's NULL when we're adding a new client,
    // and not NULL when we're editing an existing one.
    id?: number;

    
}

