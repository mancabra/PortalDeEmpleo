import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { Postulacion } from 'src/app/Services/Entity/postulacion';

import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  postulaciones:Postulacion[]=[];

  constructor(private _UserRequest:InterfaceService, private _CandidateRequest:CandidateService){
    this.subscription = this._CandidateRequest.getPostulaciones().subscribe(data =>{
      this.postulaciones = data;
    });
  }
  
  ngOnInit(): void {
    this.obetenerPostulaciones();
  }

  cargarPantalla(){
    if(this.postulaciones.length == 0){ 
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obetenerPostulaciones(){
    this._CandidateRequest.esparcirPostulaciones();
  }


  quitarTodas(){
    for (let i = 0; i < this.postulaciones.length; i++) {
      const element = this.postulaciones[i].id_postulacion;
      this._CandidateRequest.eliminarPostulacion(element).then((data:any) =>{
        if(data.estaus==true){
  
          const ALERTA = {

            nombreAlerta:"Postulacion Eliminada",
            textoAlerta:"La postulación a vacante "+this.postulaciones[i].vacante.nombreVacante+" de la empresa "+this.postulaciones[i].vacante.empresa.nombreEmpresa+" ha sido eliminada, si usted no ha realizado esta acció puede que el empleador eliminara la publicación."
          }
    
          this._UserRequest.agregarAlerta(ALERTA);
  
          alert("La vacante fue eliminada correctamente");
          this.obetenerPostulaciones();
        } else{

        const ALERTA = {

          nombreAlerta:"Eliminacion Fallida",
          textoAlerta:"La postulación a vacante "+this.postulaciones[i].vacante.nombreVacante+" de la empresa "+this.postulaciones[i].vacante.empresa.nombreEmpresa+" no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"

        }
        this._UserRequest.agregarAlerta(ALERTA);
        }

      });
    }

    this.obetenerPostulaciones();

    if(this.postulaciones.length == 0){
      alert("la accion se completo correctamente");
    } else {
      alert("Algo fallo");
    }
    
  }

  eliminarPostulacion(postulacion:Postulacion){
    console.log(postulacion.id_postulacion);
    this._CandidateRequest.eliminarPostulacion(postulacion.id_postulacion).then((data:any) =>{
      if(data.estaus==true){

        const ALERTA = {

          nombreAlerta:"Postulacion Eliminada",
          textoAlerta:"La postulación a vacante "+postulacion.vacante.nombreVacante+" de la empresa "+postulacion.vacante.empresa.nombreEmpresa+" ha sido eliminada, si usted no ha realizado esta acció puede que el empleador eliminara la publicación."
        }

        this._UserRequest.agregarAlerta(ALERTA);

        alert("La vacante fue eliminada correctamente");
        this.obetenerPostulaciones();
      } else{
        alert("Algo fallo");
        alert("Algo Fallo");

        const ALERTA = {

          nombreAlerta:"Eliminacion Fallida",
          textoAlerta:"La postulación a vacante "+postulacion.vacante.nombreVacante+" de la empresa "+postulacion.vacante.empresa.nombreEmpresa+" no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
        }

        this._UserRequest.agregarAlerta(ALERTA);
      }
    });
  }
}
