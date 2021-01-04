import { Component, Inject } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/helpers/base.form.component';
import { IClient } from '../../client';
import { ClientService } from '../../client.service';
import { ApiResult } from 'src/app/shared/services/base.service';


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent
  extends BaseFormComponent {

    // the view title
    title: string;

    // the form model
    form: FormGroup;

    // the client object to edit or create
    client: IClient;

    // the client object id, as fetched from the active route:
    // It's NULL when we're adding a new client,
    // and not NULL when we're editing an existing one.
    id?: number;

    // the locations array for the select
    locations: Location[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private clientService: ClientService) {
        super();
    }

    ngOnInit() {
        this.form = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            phone: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]{9,13}$')]),
            dateOfBirth: new FormControl(''),
            locationId: new FormControl('', Validators.required)
        }, null, [
            // this.isDupeEmail(),this.isDupePhone()
        ]);

        this.loadData();
    }

    loadData() {

        // load locations
        this.loadLocations();

        // retrieve the ID from the 'id'
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        if (this.id) {
        // EDIT MODE

        // fetch the client from the server
        this.clientService.get<IClient>(this.id).subscribe(result => {
            this.client = result;
            this.title = "Edit - " + this.client.firstName + ' ' + this.client.lastName;

            // update the form with the client value
            this.form.patchValue(this.client);
        }, error => console.error(error));
        }
        else {
        // ADD NEW MODE

        this.title = "Create a new Client";
        }
    }

    loadLocations() {
        // fetch all the locations from the server
        this.clientService.getLocations<ApiResult<Location>>(
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

        var client = (this.id) ? this.client : <IClient>{};

        client.firstName = this.form.get("firstName").value;
        client.lastName = this.form.get("lastName").value;
        client.email = this.form.get("email").value;
        client.phone = this.form.get("phone").value;
        client.dateOfBirth = this.form.get("dateOfBirth").value;
        client.locationId = this.form.get("locationId").value;
        client.assignDate = new Date();
        console.log(client);
        if (this.id) {
        // EDIT mode
        this.clientService
            .put<IClient>(client)
            .subscribe(result => {

                console.log("Client " + client.clientId + " has been updated.");

                // go back to clients view
                this.router.navigate(['/clients']);
            }, error => console.log(error));
        }
        else {
        // ADD NEW mode
        this.clientService
            .post<IClient>(client)
            .subscribe(result => {

                console.log("Client " + result.clientId + " has been created.");

                // go back to clients view
                this.router.navigate(['/clients']);
            }, error => console.log(error));
        }
    }

    isDupeEmail(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            let email = this.form.get('email').value;
            return this.clientService.isDupeEmail(email)
                .pipe(map(result => {
                    return (result ? { isDupeEmail: true } : null);
                }));
        }
    }

    isDupePhone(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            let email = this.form.get('phone').value;
            return this.clientService.isDupePhone(email)
                .pipe(map(result => {
                    return (result ? { isDupePhone: true } : null);
                }));
        }
    }
}

