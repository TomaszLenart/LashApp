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
import { TreatmentsComponent } from './components/treatments/treatments.component';
import { TreatmentDetailsComponent } from './components/treatments/treatment-details/treatment-details.component';
import { TreatmentEditComponent } from './components/treatments/treatment-details/treatment-edit/treatment-edit.component';
import { TreatmentStatisticsComponent } from './components/treatments/treatment-details/treatment-statistics/treatment-statistics.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from './components/schedule/schedule.module';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AppointmentEditComponent } from './components/appointments/appointment-edit/appointment-edit.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductEditComponent } from './components/products/product-details/product-edit/product-edit.component';
import { ProductHistoryComponent } from './components/products/product-details/product-history/product-history.component';
import { ProductQuantityChangeComponent } from './components/products/product-details/product-quantity-change/product-quantity-change.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ChooseReportComponent } from './components/reports/choose-report/choose-report.component';
import { FinancesReportComponent } from './components/reports/report-content/finances-report/finances-report.component';
import { FinancesReportDetailsTableComponent } from './components/reports/report-content/finances-report/finances-report-details-table.component';
import { ReportContentComponent } from './components/reports/report-content/report-content.component';
import { TableHelpers } from './shared/helpers/table-helpers';
import { ClientsReportComponent } from './components/reports/report-content/clients-report/clients-report.component';
import { ClientsReportDetailsTableComponent } from './components/reports/report-content/clients-report/clients-report-details-table.component';
import { ReportService } from './components/reports/report.service';


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
    TreatmentDetailsComponent,
    TreatmentEditComponent,
    TreatmentsComponent,
    TreatmentStatisticsComponent,
    AppointmentEditComponent,
    AppointmentsComponent,
    ProductDetailsComponent,
    ProductsComponent,
    ProductEditComponent,
    ProductHistoryComponent,
    ProductQuantityChangeComponent,
    ChooseReportComponent,
    ReportsComponent,
    FinancesReportComponent,
    FinancesReportDetailsTableComponent,
    ReportContentComponent,
    ClientsReportComponent,
    ClientsReportDetailsTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserModule,
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
      { path: 'treatments', component: TreatmentsComponent},
      // { path: 'client/:id', component: ClientEditComponent },
      { path: 'treatment/:id', component: TreatmentDetailsComponent },
      { path: 'treatment', component: TreatmentEditComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'appointment/:id', component: AppointmentEditComponent },
      { path: 'appointment', component: AppointmentEditComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'product', component: AppointmentEditComponent },
      { path: 'reports', component: ReportsComponent },




    ]),
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    ScheduleModule
  ],
  providers: [LocationService,ClientService,TableHelpers,ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
