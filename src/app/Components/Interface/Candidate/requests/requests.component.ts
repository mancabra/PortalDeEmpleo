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
  subscription:Subscription;
  usuario: Candidato = new Candidato;
  postulaciones:Postulacion[]=[];

  constructor(private _UserRequest:InterfaceService, private _CandidateRequest:CandidateService){
    // SE AGREGO ESTE CODIGO PARA EL OBSERVABLE
    this.subscription = this._CandidateRequest.getRequest().subscribe(data => {
      this.postulaciones = data;
      this.cargarPantalla();
    });
  }
  
  ngOnInit(): void {
    this.buscarUsuario();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    /*
    this._CandidateRequest.obtenerPostulaciones(usuario.id_candidato).subscribe(data => {
      this.postulaciones = data;
      console.log(this.postulaciones);
    });*/

    // SE AGREGO ESTAA LINEA PARA EL OBSERVABLE
    this._CandidateRequest.updateRequest(usuario.id_candidato);
  }

  quitarTodas(){
    for (let i = 0; i < this.postulaciones.length; i++) {
  
      const element = this.postulaciones[i].id_postulacion;
      const postulacion = this.postulaciones[i];
      console.log(postulacion);

      this._CandidateRequest.eliminarPostulacion(element).then((data:any) =>{
        if(data.estatus==true){
          this.enviarAlertaExito(postulacion);
        } else{
          this.enviarAlertaError(postulacion);
        }
      });

    }
    this.verificarBorrar();
  }

  verificarBorrar(){

    //this._CandidateRequest.updateRequest(this.usuario.id_candidato);
    this.postulaciones = [];
    this.cargarPantalla();
    if(this.postulaciones.length == 0){
      alert("la acción se completo correctamente");
      // SE AGREGO ESTAA LINEA PARA EL OBSERVABLE
     
    } else {
      alert("Algo fallo");
    }
  }


  // FUNCION ELIMINAR VACANTE 
  eliminarPostulacion(postulacion:Postulacion){
    // SE ANALIZA EL ESTATUS BOOLEAN QUE RETORNA BASE DE DATOS
    this._CandidateRequest.eliminarPostulacion(postulacion.id_postulacion).then((data:any) =>{

      if(data.estatus==true){
        alert("La postulacion fue eliminada correctamente");
        this.enviarAlertaExito(postulacion);
        this._CandidateRequest.updateRequest(this.usuario.id_candidato);
      } else{
        alert("Algo Fallo");
        this.enviarAlertaError(postulacion);
      }

    });
  }


  enviarAlertaExito(postulacion:Postulacion) {

    const ALERTA = {
      nombreAlerta:"Postulacion Eliminada",
      textoAlerta:"La postulación a vacante "+postulacion.vacante.nombreVacante+" de la empresa "+postulacion.vacante.empresa.nombre+" ha sido eliminada, si usted no ha realizado esta acció puede que el empleador eliminara la publicación."
    }
    // SE AGREGO ESTAA LINEA PARA EL OBSERVABLE
    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaError(postulacion:Postulacion ) {
 
    const ALERTA = {
      nombreAlerta:"Eliminacion Fallida",
      textoAlerta:"La postulación a vacante "+postulacion.vacante.nombreVacante+" de la empresa "+postulacion.vacante.empresa.nombre+" no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }
  
}
