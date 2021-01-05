import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAppointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { BaseFormComponent } from 'src/app/shared/helpers/base.form.component';
import { IClient } from '../../clients/client';
import { ILocation } from '../../locations/location';
import { ITreatment } from '../../treatments/treatment';
import { ClientService } from '../../clients/client.service';
import { ApiResult } from 'src/app/shared/services/base.service';



@Component({
    selector: 'app-appointment-edit',
    templateUrl: './appointment-edit.component.html',
    styleUrls:['./appointment-edit.component.css']
})
export class AppointmentEditComponent 
    extends BaseFormComponent {

    // the view title
    title: string;

    // the form model
    form: FormGroup;

    // the city object to edit or create
    appointment: IAppointment;
    clients: IClient[];
    locations: ILocation[];
    treatments: ITreatment[];

    // the city object id, as fetched from the active route:
    // It's NULL when we're adding a new appointment,
    // and not NULL when we're editing an existing one.
    id?: number;

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,
        private appointmentService: AppointmentService,
        private clientService: ClientService) {
            super();
            this.loadData();
    }

    ngOnInit() {
      this.form = new FormGroup({
            locationId: new FormControl('', Validators.required),
            clientId: new FormControl('', Validators.required),

            // address: new FormControl('', Validators.required),
            // city: new FormControl('', Validators.required),
            // cityCode: new FormControl('', [Validators.required]) 
        }, null,null);

        // this.loadTreatments();
         this.loadLocations();
        this.loadClients();
        this.loadData();
    }

    loadData() {

        // retrieve the ID from the 'id'
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        console.log('ID:')
        console.log(this.id);
        if (this.id) {
        // EDIT MODE

        // fetch the appointment from the server
        var url = this.baseUrl + "api/appointments/" + this.id;
        this.http.get<IAppointment>(url).subscribe(result => {
            this.appointment = result;
            this.title = "Edit - " + this.appointment.date + ' - ' + this.appointment.client;

            // update the form with the appointment value
            this.form.patchValue(this.appointment);
        }, error => console.error(error));
        }
        else {
        // ADD NEW MODE

        this.title = "Create a new Appointment";
        }
    }

    loadLocations() {
        // fetch all the locations from the server
        this.clientService.getLocations<ApiResult<ILocation>>(
        0,
        9999,
        "name",
        null,
        null,
        null,
        ).subscribe(result => {
            console.log(result)
            this.locations = result.data;
            }, error => console.error(error));
    }

    loadClients() {
        // fetch all the locations from the server
        this.clientService.getData<ApiResult<IClient>>(
        0,
        9999,
        "lastName",
        null,
        null,
        null,
        ).subscribe(result => {
            console.log(result)
            this.clients = result.data;
            }, error => console.error(error));
    }

    onSubmit() {

        // var appointment = (this.id) ? this.appointment : <IAppointment>{};

        // appointment.name = this.form.get("name").value;
        // appointment.address = this.form.get("address").value;
        // appointment.city = this.form.get("city").value;
        // appointment.cityCode = this.form.get("cityCode").value;

        // if (this.id) {
        // // EDIT mode

        // var url = this.baseUrl + "api/appointments/" + this.appointment.appointmentId;
        // this.http
        //     .put<IAppointment>(url, appointment)
        //     .subscribe(result => {

        //     console.log("Appointment " + appointment.appointmentId + " has been updated.");

        //     // go back to cities view
        //     this.router.navigate(['/appointments']);
        //     }, error => console.log(error));
        // }
        // else {
        // // ADD NEW mode
        // var url = this.baseUrl + "api/appointments";
        // this.http
        //     .post<IAppointment>(url, appointment)
        //     .subscribe(result => {

        //     console.log("Appointment " + result.appointmentId + " has been created.");

        //     // go back to cities view
        //     this.router.navigate(['/appointments']);
        //     }, error => console.log(error));
        // }
    }

    isAppointmentEdited(): boolean {
        // if(this.form && this.appointment)
        //     return this.appointment.name !== this.form.get("name").value
        //                 || this.appointment.city !== this.form.get("city").value
        //                 || this.appointment.cityCode !== this.form.get("cityCode").value 
        //                 || this.appointment.address !== this.form.get("address").value 
        // else return false;
        return false;

    }

    isDupeAppointment(): AsyncValidatorFn {
        console.log(this.isAppointmentEdited());

        if(this.isAppointmentEdited)
        {
            return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

                var appointment = <IAppointment>{};
                appointment.appointmentId = (this.id) ? this.id : 0; 
                // appointment.name = this.form.get("name").value;
                // appointment.address = this.form.get("address").value;
                // appointment.city = this.form.get("city").value;
                // appointment.cityCode = this.form.get("cityCode").value;
    
                return this.appointmentService.isDupeAppointment(appointment)
                    .pipe(map(result => {
                        return (result ? { isDupeAppointment: true } : null);
                    }));
            }
        }
        else 
            return null;
       
    }
}
