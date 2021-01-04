import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AngularMaterialModule } from './shared/helpers/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientEditComponent } from './components/clients/client-details/client-edit/client-edit.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationEditComponent } from './components/locations/location-edit/location-edit.component';
import { LocationService } from './components/locations/location.service';
import { ClientService } from './components/clients/client.service';
import { ClientDetailsComponent } from './components/clients/client-details/client-details.component';
import { ClientGalleryComponent } from './components/clients/client-details/client-gallery/client-gallery.component';
import { ClientAppointmentsComponent } from './components/clients/client-details/client-appointments/client-appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ClientsComponent,
    ClientEditComponent,
    ClientGalleryComponent,
    ClientAppointmentsComponent,
    ClientDetailsComponent,
    LocationsComponent,
    LocationEditComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'clients', component: ClientsComponent},
      // { path: 'client/:id', component: ClientEditComponent },
      { path: 'client/:id', component: ClientDetailsComponent },
      { path: 'client', component: ClientEditComponent },
      { path: 'locations', component: LocationsComponent},
      { path: 'location/:id', component: LocationEditComponent },
      { path: 'location', component: LocationEditComponent },


    ]),
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [LocationService,ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
