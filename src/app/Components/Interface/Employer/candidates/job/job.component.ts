import { Component, Input } from '@angular/core';
import { Vacante } from 'src/app/Services/Entity/vacante';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
@Input () vacante : Vacante = new Vacante;

constructor(){

}

ngOnInit(){

}

}
