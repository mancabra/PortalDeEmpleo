import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Postulacion } from 'src/app/Services/Entity/postulacion';

import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  usuario: Candidato = new Candidato;
  postulaciones:Postulacion[]=[];

  constructor(private _UserRequest:InterfaceService, private _CandidateRequest:CandidateService){
  
  }
  
  ngOnInit(): void {
    this.buscarUsuario();
  }

  ngOnDestroy(): void {

  }

  cargarPantalla(){
    if(this.postulaciones.length == 0){ 
      return false;
    } else {
      return true;
    }
  }

  buscarUsuario(){
    this._CandidateRequest.obtener().then((data:any) =>{
      this.usuario = data
      console.log(this.usuario)
      this.obetenerPostulaciones(this.usuario)
    });
  }

  obetenerPostulaciones(usuario:Candidato){
    this._CandidateRequest.obtenerPostulaciones(usuario.id_candidato).subscribe(data => {
      this.postulaciones = data;
      console.log(this.postulaciones);
    });

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

        } else{

        const ALERTA = {

          nombreAlerta:"Eliminacion Fallida",
          textoAlerta:"La postulación a vacante "+this.postulaciones[i].vacante.nombreVacante+" de la empresa "+this.postulaciones[i].vacante.empresa.nombreEmpresa+" no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"

        }
        this._UserRequest.agregarAlerta(ALERTA);
        }

      });
    }



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
