import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Estado } from 'src/app/Services/Entity/estado';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Postulacion } from 'src/app/Services/Entity/postulacion';

import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  // VARIABLE PARA LA SUSCRIPCION A UN SERVICIO QUE DEVUELVE UN VECTOR DE POSTULACIONES
  subscription: Subscription;
  // VARAIBLE PARA ALMACENAR LA INFO DE UN CANDIDATO 
  usuario: Candidato = new Candidato;
  // VECTOR QUE ALMACENA LAS POSTULACIONES QUE TIENE UN CANDIDATO
  postulaciones: Postulacion[] = [];

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _UserRequest: InterfaceService,
    private _CandidateRequest: CandidateService) {
    this.subscription = this._CandidateRequest.getRequest().subscribe(data => {
      this.postulaciones = data;
      this.cargarPantalla();
    });
  }

  ngOnInit(): void {
    this.buscarUsuario();
    //this.cargarMuestra();
  }
/*

  ngAfterViewInit() {
    let postulacion = document.getElementsByName('postulacion')[0];
    postulacion.classList.add('mostrar');

    window.addEventListener('scroll', function(){
      let vacanteP = this.document.getElementsByName('postulacion');
      for (let i = 0; i < vacanteP.length; i++) {
        var alturaMin = window.innerHeight/1.8;
       // var alturaMax = window.innerHeight/.5;
        var distancia = vacanteP[i].getBoundingClientRect().top;
        vacanteP[i].classList.add('transform_up');

        if (distancia <= alturaMin){
           vacanteP[i].classList.add('mostrar');
         //  if( distancia < alturaMax){
          //  vacanteP[i].classList.remove('aparece') 
          // }
        } else {
           vacanteP[i].classList.remove('mostrar') 
        }
        
      }
      
    });
  }

  */
  cargarMuestra(){
    this.postulaciones =[
     { id_postulacion: 1,
      estatus: false,
      vacante:   {
        id_vacante: 1,
        nombreVacante: "Gerente",
        especialista: "ninguno",
        sueldo: 10000,
        horario: "9:00am - 6:00pm",
        domicilio: "Alcatraz n9",
        municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
        estatus: false,
        descripcion: "Carnicero de planta",
        empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
        empleador: new Empleador,
        candidatos: [],
        tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
        tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
        modalidadTrabajo: new ModalidadTrabajo,
        id_postulacion: 0,
        fechaPublicacionSrt: "",
        diasPublicada: 0,
        estado: new Estado
      },
      candidato: new Candidato, },
      { id_postulacion: 1,
        estatus: false,
        vacante:   {
          id_vacante: 1,
          nombreVacante: "Gerente",
          especialista: "ninguno",
          sueldo: 10000,
          horario: "9:00am - 6:00pm",
          domicilio: "Alcatraz n9",
          municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
          estatus: false,
          descripcion: "Carnicero de planta",
          empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
          empleador: new Empleador,
          candidatos: [],
          tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
          tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
          modalidadTrabajo: new ModalidadTrabajo,
          id_postulacion: 0,
          fechaPublicacionSrt: "",
          diasPublicada: 0,
          estado: new Estado
        },
        candidato: new Candidato, },
        { id_postulacion: 1,
          estatus: false,
          vacante:   {
            id_vacante: 1,
            nombreVacante: "Gerente",
            especialista: "ninguno",
            sueldo: 10000,
            horario: "9:00am - 6:00pm",
            domicilio: "Alcatraz n9",
            municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
            estatus: false,
            descripcion: "Carnicero de planta",
            empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
            empleador: new Empleador,
            candidatos: [],
            tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
            tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
            modalidadTrabajo: new ModalidadTrabajo,
            id_postulacion: 0,
            fechaPublicacionSrt: "",
            diasPublicada: 0,
            estado: new Estado
          },
          candidato: new Candidato, },
          { id_postulacion: 1,
            estatus: false,
            vacante:   {
              id_vacante: 1,
              nombreVacante: "Gerente",
              especialista: "ninguno",
              sueldo: 10000,
              horario: "9:00am - 6:00pm",
              domicilio: "Alcatraz n9",
              municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
              estatus: false,
              descripcion: "Carnicero de planta",
              empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
              empleador: new Empleador,
              candidatos: [],
              tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
              tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
              modalidadTrabajo: new ModalidadTrabajo,
              id_postulacion: 0,
              fechaPublicacionSrt: "",
              diasPublicada: 0,
              estado: new Estado
            },
            candidato: new Candidato, },
    ]
  }


 

  // FUNCION PARA ELIMINAR LA SUSCRIPCION A UN SERVICIO
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // FUNCION QUE EVALUA EL VECTOR DE POSTULACIONES
  // SI EL VECTOR ESTA VACIO MUESTRA UNA PANTALLA ALTERNATIVA
  cargarPantalla() {
    if (this.postulaciones.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  // FUNCION PARA BUSCAR UN USUARIO EN LA BASE DE DATOS
  buscarUsuario() {
    this._CandidateRequest.obtener().then((data: any) => {
      this.usuario = data
      console.log(this.usuario)
      this.obetenerPostulaciones(this.usuario)
    });
  }

  // FUNCION PARA OBTENER LAS POSTULACIONES REGISTRADAS EN BD DE UN CANDIDATO
  obetenerPostulaciones(usuario: Candidato) {
    this._CandidateRequest.updateRequest(usuario.id_candidato);
  }

  // FUNCION PARA ELIMINAR TODAS LAS VACANTES REGISTRADAS
  // SE EVALUA EL VECTOR DE POSTULACIONES Y SE REALIZA UN PETICION POR CADA UNA DE LAS POSTULACIONES
  quitarTodas() {
    for (let i = 0; i < this.postulaciones.length; i++) {
      const element = this.postulaciones[i].id_postulacion;
      const postulacion = this.postulaciones[i];
      console.log(postulacion);
      this._CandidateRequest.eliminarPostulacion(element).then((data: any) => {
        if (data.estatus == true) {
          this.enviarAlertaExito(postulacion);
        } else {
          this.enviarAlertaError(postulacion);
        }
      });
    }
    this.verificarBorrar();
  }

  // FUNCION QUE ANALIZA EL VECTOR DE POSTULACIONES
  //  IDENTIFICA SI LA ACCION ELIMINAR TODAS SE REALIZO CORRECTAMENTE
  verificarBorrar() {
    this.postulaciones = [];
    this.cargarPantalla();
    if (this.postulaciones.length == 0) {
      this.enviarAlerta("Las postulaciones han sido eliminadas correctamente.", false);
    } else {
      this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar alguna de las postulaciones.", true);
    }
  }

  // FUNCION ELIMINAR VACANTE 
  eliminarPostulacion(postulacion: Postulacion) {
    // SE ANALIZA EL ESTATUS BOOLEAN QUE RETORNA BASE DE DATOS
    this._CandidateRequest.eliminarPostulacion(postulacion.id_postulacion).then((data: any) => {
      if (data.estatus == true) {
        this.enviarAlerta("La postulación ha sido eliminada correctamente.", false);
        this.enviarAlertaExito(postulacion);
        this._CandidateRequest.updateRequest(this.usuario.id_candidato);
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar la postulación.", true);
        this.enviarAlertaError(postulacion);
      }
    });
  }

  // FUNCION PARA ENVIAR UNA NOTIFICACIÓN DE EXITO
  enviarAlertaExito(postulacion: Postulacion) {

    const ALERTA = {
      nombreAlerta: "Postulacion Eliminada",
      textoAlerta: "La postulación a vacante " + postulacion.vacante.nombreVacante + " de la empresa " + postulacion.vacante.empresa.nombre + " ha sido eliminada, si usted no ha realizado esta acción puede que el empleador eliminara la publicación."
    }
    // SE AGREGO ESTAA LINEA PARA EL OBSERVABLE
    this._UserRequest.agregarAlerta(ALERTA);
  }


  // FUNCION PARA ENVIAR UNA NOTIFICACIÓN DE ERROR
  enviarAlertaError(postulacion: Postulacion) {

    const ALERTA = {
      nombreAlerta: "Eliminacion Fallida",
      textoAlerta: "La postulación a vacante " + postulacion.vacante.nombreVacante + " de la empresa " + postulacion.vacante.empresa.nombre + " no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  // FUNCION PARA EL POPUP
  enviarAlerta(mss: String, error: boolean) {

    const ALERTA = {
      mss: mss,
      error: error,
    }

    this._UserRequest.activarAlerta();
    this._UserRequest.cargarAlerta(ALERTA);
  }

}
