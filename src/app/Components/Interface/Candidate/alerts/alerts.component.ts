import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy{
  // VARIABLE PARA LA SUSCRIPCION A UN SERVICIO QUE DEVUELVE UN VECTOR DE NOTIFICACIONES
  subscription: Subscription;
  // VECTOR QUE ALMACENA UN VECTOR DE NOTIFICACIONES 
  alertas: any = [];

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _UserRequest:InterfaceService){
    this.subscription = this._UserRequest.getAlerts().subscribe(data => {
      this.alertas = data;
    });
  }


  ngOnInit(): void {
    this._UserRequest.esparcirAlertas();
    
  }

  // FUNCION PARA ELIMINAR LA SUSCRIPCION DE UN SERVICIO
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // FUNCION PARA DETERMINAR LA PANTALLA QUE SE MOSTRARA EN COMPONENTE
  // SI EL VECTOR ALERTAS ESTA VAIO MOSTRAR EL CONTENIDO DEL VECTOR
  // SIUE L VECTOR ESTA VACIO MOSTRARA UNA PANTALLA ALTERNATIVA
  cargarPantalla(){
    if(this.alertas.lenght==0){
      return false;
    } else{
      return true;
    }
  }

}
