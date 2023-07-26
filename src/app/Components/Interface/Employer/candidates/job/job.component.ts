import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
@Input () vacante : any;

constructor(){

}

ngOnInit(){

}

}
