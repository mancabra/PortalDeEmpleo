import { Component, OnDestroy, OnInit } from '@angular/core';
import { InterfaceService } from './Services/InterfaceServices/interface.service';
import { Subscription } from 'rxjs';
import { Alert } from './Services/Entity/alert';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PortalDeEmpleo';
  tipoUsuario: number = 0;

  // VARIABLE PARA MOSTRAR LA PANTALLA DE ALERTA
  estadoAlerta:Subscription;
  ocultarAlerta: boolean = true;

  alertaActiva:Subscription;
  alerta: Alert = new Alert ;
  ruta: String = "";
  color: String = ""

  subscription:Subscription;
  ocultarNavbar: boolean = true;


  constructor( private _UserRequest: InterfaceService){
    this.estadoAlerta = this._UserRequest.getEstadoAlerta().subscribe(data => {
      this.ocultarAlerta = data;
    });

    this.alertaActiva = this._UserRequest.getAlerta().subscribe(data => {
      this.alerta = data;
      this.ruta = this.alerta.ruta;
      this.color = this.alerta.color;
    });


    // SUSCRIPCION AL OBSERVABLE DE UN SERVICIO PARA OBTENER UNA VARIABLE BOOLEANA
    this.subscription = this._UserRequest.getNavBar().subscribe(data => {
      this.ocultarNavbar = data;
    });
  }

  ngOnInit(): void {
  this._UserRequest.desactivarAlerta();
  }

  ngOnDestroy(): void {
    this.estadoAlerta.unsubscribe();
    this.alertaActiva.unsubscribe();
    this.subscription.unsubscribe();
  }

  cerrar(){
    this._UserRequest.desactivarAlerta();
  }
}
