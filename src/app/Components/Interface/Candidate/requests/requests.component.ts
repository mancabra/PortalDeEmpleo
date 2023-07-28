import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  usuario:any;
  postulaciones = [
    {
      id_vacante:1,
      nombreVacante: "Diseñador web",
      especialista: "Diseñador",
      sueldo: 10000,
      horario: "9:00 am - 6:00 pm",
      domicilio:"C.Pinos N.447 Col.Nuevo Mundo",
      municipio:{id_municipio:1,nombreMunicipio:"Acolman",id_estado:1},
      estatus: false,
      id_postulacion:45,
      descripcion: 
      "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
      +"ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
      +"Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
      +"ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
      +"Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui",
      empresa:{id_empresa:1,vacantes:null,nombreEmpresa:"Infotec",descripcion:"holaMundo Infotec"},
      empleador:{
                  id_usuario:1,
                  nombre:"Saumuel",
                  correoElectronico:"mail@gmail.com",
                  consena:"1234hola",
                  tipoUsuario:3,
                  apellidoP:"Aispuro",
                  apellidoM:"Wilson",
                  estatusUsuario:true,
                },
      candidatos:null, // lista de candidatos
      tipoHorario:{id_tipoHorario:1,dias:"Tiempo Completo"},
      tipoContratacion:{id_tipoContratacion:1,horario:"Tiempo Indefinido"},
      modalidadTrabajo:{id_modalidadTrabajo:1,modalidad:"Presencial"},
    },
  ];


  constructor(private _UserRequest:InterfaceService, private _CandidateRequest:CandidateService){
    this.subscription = this._UserRequest.getUser().subscribe(data =>{
      this.usuario = data;
      console.log(this.usuario);
    });
  }
  
  ngOnInit(): void {
    this.obetenerPostulaciones();
  }

  cargarPantalla(){
    if(this.postulaciones.length == 0){ 
      return false;
    } else {
      //this.obetenerPostulaciones();
      return true;
      

    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obetenerPostulaciones(){
    this._CandidateRequest.obtenerPostulaciones(this.usuario.id_candidato).then((data:any) =>{
      this.postulaciones = data;
    });
  }


  quitarTodas(){
    for (let i = 0; i < this.postulaciones.length; i++) {
      const element = this.postulaciones[i].id_postulacion;
      this._CandidateRequest.eliminarPostulacion(element).then((data:any) =>{
        if(data.estaus==true){
  
          const ALERTA = {

            nombreAlerta:"Postulacion Eliminada",
            textoAlerta:"La postulación a vacante "+this.postulaciones[i].nombreVacante+" de la empresa "+this.postulaciones[i].empresa.nombreEmpresa+" ha sido eliminada, si usted no ha realizado esta acció puede que el empleador eliminara la publicación."
          }
    
          this._UserRequest.agregarAlerta(ALERTA);
  
          alert("La vacante fue eliminada correctamente");
          this.obetenerPostulaciones();
        } else{

        const ALERTA = {

          nombreAlerta:"Eliminacion Fallida",
          textoAlerta:"La postulación a vacante "+this.postulaciones[i].nombreVacante+" de la empresa "+this.postulaciones[i].empresa.nombreEmpresa+" no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"

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

  eliminarPostulacion(postulacion:any){
    console.log(postulacion.id_postulacion);
    this._CandidateRequest.eliminarPostulacion(postulacion.id_postulacion).then((data:any) =>{
      if(data.estaus==true){

        const ALERTA = {

          nombreAlerta:"Postulacion Eliminada",
          textoAlerta:"La postulación a vacante "+postulacion.nombreVacante+" de la empresa "+postulacion.empresa.nombreEmpresa+" ha sido eliminada, si usted no ha realizado esta acció puede que el empleador eliminara la publicación."
        }

        this._UserRequest.agregarAlerta(ALERTA);

        alert("La vacante fue eliminada correctamente");
        this.obetenerPostulaciones();
      } else{
        alert("Algo fallo");
        alert("Algo Fallo");

        const ALERTA = {

          nombreAlerta:"Eliminacion Fallida",
          textoAlerta:"La postulación a vacante "+postulacion.nombreVacante+" de la empresa "+postulacion.empresa.nombreEmpresa+" no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
        }

        this._UserRequest.agregarAlerta(ALERTA);
      }
    });
  }
}
