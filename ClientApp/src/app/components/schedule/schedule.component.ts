import { Component, OnInit } from "@angular/core";
import { ScheduleDate } from "./schedule-date";

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
  })
  export class ScheduleComponent implements OnInit {

    dates:ScheduleDate[];
    hours:any;

    constructor(){
      // this.dates.push({date:'05.01'},{date:'06.01'},{date:'07.01'},{date:'08.01'},);
    }

    ngOnInit():void {
      this.dates = [ {date:'05.01'},{date:'06.01'},{date:'07.01'},{date:'08.01'},{date:'09.01'}]
      this.hours = [{time:'9:00'},{time:'10:00'},{time:'11:00'},{time:'12:00'},{time:'13:00'}]
    }

    users = [
      { firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
      { firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', role: 'Admin' },
      { firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', role: 'Admin' },
      { firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', role: 'User' },
      { firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', role: 'User' }
  ];
  }
  