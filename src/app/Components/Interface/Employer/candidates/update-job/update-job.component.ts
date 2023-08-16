import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Vacante } from 'src/app/Services/Entity/vacante';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit , OnDestroy{

  subscription:Subscription;
  vacante: Vacante = new Vacante;
  vistaModificacion: boolean = true;

  constructor(private _EmployerRequest: EmployerService){
  this.subscription = this._EmployerRequest.getVacante().subscribe(data => {
      this.actualizarVacante(data);
    });
  }
 
  ngOnInit(): void {
    
  }

  actualizarVacante(data: Vacante){
    this.vacante = data;
    console.log("update");
    console.log(this.vacante);
    console.log(data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
