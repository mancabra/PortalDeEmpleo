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

  // VARIABLE PARA LA SUSCRIPCION A UN OBSERVABLE
  subscription:Subscription;

  // VARIABLE PARA ALMACENAR UNA VACANTE
  // LA VACANTE ES TOMADA DEL OBSERVABLE
  vacante: Vacante = new Vacante;

  // VARIABLES QUE GESTIONAN UN ELMENTO HTML EN UN COMPONENTE EXTERNO
  vistaModificacion: boolean = true;
  programarP: boolean = true;

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(private _EmployerRequest: EmployerService){

  // SUSCRIPCION AL OBSERVABLE DE UN SERVICIO PARA OBTENER UNA VACANTE
  this.subscription = this._EmployerRequest.getVacante().subscribe(data => {
    this.vacante = data
      this.actualizarVacante(this.vacante);
    });
  }
 
  ngOnInit(): void {
    this._EmployerRequest.cargarVacante();
  }

  // FUNCION QUE GUARDA LOS DATOS RECIBIDOS DE UN OBSERVABLE EN UNA VARIABLE
  actualizarVacante(data: Vacante){
    this.vacante = data;
  }

  // FUNCION PARA ELIMINAR LA SUSCRIPCION A UN OBSERVABLE
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
