import { Component } from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {

  viewJobs: boolean = true;
  viewRequests: boolean = true;
  newJob: boolean = true;
  candidates: boolean = true;
  manage: boolean = true;
  viewRequestsAdmin:boolean = true;
  alerts: boolean = true;
  profile: boolean = true;


}
