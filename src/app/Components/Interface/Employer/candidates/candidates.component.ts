import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { Estado } from 'src/app/Services/Entity/estado';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { Postulacion } from 'src/app/Services/Entity/postulacion';
import { TipoContratacion } from 'src/app/Services/Entity/tipo-contratacion';
import { TipoHorario } from 'src/app/Services/Entity/tipo-horario';
import { Usuario } from 'src/app/Services/Entity/usuario';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  empleador: Empleador = new Empleador;
  publicaciones: Vacante[] = [];
  publicacionesSin: Vacante[] = [];
  candidatos: Candidato[] = [];
  postulaciones: Postulacion[] = [];
  vacanteActual: Vacante = new Vacante;
  /*usuario: Usuario = {
    id_usuario: 0,
    nombre: "Saul",
    correoElectronico: "",
    contrasena: "",
    tipoUsuario: 0,
    apellidoP: "Salazar",
    apellidoM: "Hernandez",
    telefono: "",
    estatusUsuario: false,
    rutaImagenPerfil: "",
    rutaImagenPortada: "",
  }*/

  constructor(private _EmployerRequest: EmployerService,
    private router: Router,
    private _CandidateRequest: CandidateService,
    private _UserRequest: InterfaceService) {
/*
    this.publicaciones = [{
      id_vacante: 0,
      nombreVacante: "Taquero",
      especialista: "Taquero",
      sueldo: 10000,
      horario: "9:00 am - 10:00 pm",
      domicilio: "Av.Primavera",
      municipio: new Municipio,
      estatus: false,
      descripcion: "hola",
      empresa: new Empresa,
      empleador: new Empleador,
      candidatos: [],
      tipoHorario: new TipoHorario,
      tipoContratacion: new TipoContratacion,
      modalidadTrabajo: new ModalidadTrabajo,
      id_postulacion: 0
    }]

    this.candidatos = [{
      id_candidato: 0,
      edad: 0,
      domicilio: "Av.Primavera",
      puestoActual: "",
      descripcion: "",
      centroEducativo: "",
      rutaCv: "",
      usuario: this.usuario,
      vacantes: [],
      idiomas: [],
      municipio: new Municipio,
      estado: new Estado,
      profesion: "Desarrollador",
      fechaNacimiento: new Date
    }];*/
  }

  ngOnInit(): void {
    this.buscarUsuario();
  }

  buscarUsuario() {
    this._EmployerRequest.obtener().then((data: any) => {
      this.empleador = data;
      console.log(this.empleador);
      this.obtenerPublicaciones();
    });
  }

  obtenerPublicaciones() {
    this._EmployerRequest.obtenerPublicaciones(this.empleador.id_empleador).subscribe(data => {
      this.publicacionesSin = data;
      this.ordenarPublicaciones(this.publicacionesSin);
      console.log(this.publicaciones);
    });
  }

  ordenarPublicaciones(publicaciones:Vacante[]){
    this.publicaciones = publicaciones.sort(function (v1, v2) {
      if (v1.diasPublicada > v2.diasPublicada) {
        return 1;
      }
      if (v1.diasPublicada < v2.diasPublicada) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  cargarPantalla() {
    if (this.publicaciones.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  cargarPantallaI() {
    if (this.candidatos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  modificarVacante(vacante: Vacante) {
    this._EmployerRequest.guardarVacante(vacante);
    this.router.navigate(['interface/publicaciones/modificar']);
  }

  eliminarVacante(vacante: Vacante) {
    this._EmployerRequest.eliminarVacante(vacante.id_vacante).then((data: any) => {
      if (data.estatus == true) {
        alert("la vacante se ha eliminado correctamente");
        this.obtenerPublicaciones();
        this.cargarPantalla();
      } else {
        alert("ha ocurrido un error");
      }
    });
  }

  mostrarCandidatos(vacante: Vacante) {
    this.vacanteActual = vacante;
    this._EmployerRequest.ontenerCandidatosVacante(vacante.id_vacante).subscribe(data => {
      this.candidatos = data;
      console.log(this.candidatos);
    });
  }

  obtenerPostulacion(candidato: Candidato) {
    this._CandidateRequest.obtenerPostulaciones(candidato.id_candidato).subscribe(data => {
      this.postulaciones = data;
      for (let i = 0; i < this.postulaciones.length; i++) {
        const element = this.postulaciones[i];

        if (this.postulaciones[i].vacante.id_vacante == this.vacanteActual.id_vacante) {
          this.eliminarPostulacion(element, candidato);
          break;
        } else {
        }
      }
    });
  }

  aceptarCandidato(candidato: Candidato){
    this._CandidateRequest.obtenerPostulaciones(candidato.id_candidato).subscribe(data => {
      this.postulaciones = data;
      for (let i = 0; i < this.postulaciones.length; i++) {
        const element = this.postulaciones[i];

        if (this.postulaciones[i].vacante.id_vacante == this.vacanteActual.id_vacante) {
          this.aceptar(element,candidato);
          break;
        } else {

        }
      }
    });
  }

  aceptar(postulacion: Postulacion,candidato:Candidato){
    const DTO ={
      id_postulacion:postulacion.id_postulacion,
    }
    this._EmployerRequest.aceptarCandidato(DTO).then((data: any) => {

      if (data.estatus == true) {
        alert("Candidato Aceptado");
        this.enviarAlertaExitoGC(candidato);
        this.mostrarCandidatos(this.vacanteActual);
      } else {
        alert("Algo Fallo");
        this.enviarAlertaErrorGC(candidato);
      }
    });
  }

  eliminarPostulacion(postulacion: Postulacion, candidato: Candidato) {

    this._CandidateRequest.eliminarPostulacion(postulacion.id_postulacion).then((data: any) => {

      if (data.estatus == true) {
        alert("La postulacion fue eliminada correctamente");
        this.enviarAlertaExito(candidato);
        this.mostrarCandidatos(this.vacanteActual);
      } else {
        alert("Algo Fallo");
        this.enviarAlertaError(candidato);
      }

    });
  }

  enviarAlertaExito(candidato: Candidato) {

    const ALERTA = {
      nombreAlerta: "Postulacion Eliminada",
      textoAlerta: "La postulación a la vacante " + this.vacanteActual.nombreVacante + " del candidato " + candidato.usuario.nombre + " " + candidato.usuario.apellidoP + " ha sido eliminada, si usted no ha realizado esta acción puede que el candidato eliminara la postulacion."
    }
    // SE AGREGO ESTAA LINEA PARA EL OBSERVABLE
    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaError(candidato: Candidato) {

    const ALERTA = {
      nombreAlerta: "Eliminacion Fallida",
      textoAlerta: "La postulación a la vacante " + this.vacanteActual.nombreVacante + " del candidato " + candidato.usuario.nombre + " " + candidato.usuario.apellidoP + " no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaExitoGC(candidato: Candidato) {

    const ALERTA = {
      nombreAlerta: "Postulacion Aceptada",
      textoAlerta: "La postulación a la vacante " + this.vacanteActual.nombreVacante + " del candidato " + candidato.usuario.nombre + " " + candidato.usuario.apellidoP + " ha sido aceptada, le sugerimos contactar al candidato el correo "+ candidato.usuario.correoElectronico+ " o bien comunicarse al número: "+candidato.usuario.telefono+"."
    }
    // SE AGREGO ESTAA LINEA PARA EL OBSERVABLE
    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaErrorGC(candidato: Candidato) {

    const ALERTA = {
      nombreAlerta: "Proceso Fallido",
      textoAlerta: "La postulación a la vacante " + this.vacanteActual.nombreVacante + " del candidato " + candidato.usuario.nombre + " " + candidato.usuario.apellidoP + " no pudo ser aceptada, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }


}
