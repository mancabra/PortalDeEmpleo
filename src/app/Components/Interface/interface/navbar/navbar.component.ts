import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() tipoUsuario: number = 0;

  id_tipoUsuario: number = 0;

  administradorActivo: boolean = true;
  candidatoActivo: boolean = true;
  visitanteActivo: boolean = true;
  empleadorActivo: boolean = true;

  vacantes: boolean = true;
  postulaciones: boolean = true;
  notificaciones: boolean = true;
  perfil: boolean = true;
  administrar: boolean = true;
  peticiones: boolean = true;
  publicaciones: boolean = true;
  publicarNueva: boolean = true;

  constructor(private router: Router) {
   
  }

  ngOnInit() {
    this.actualizarUsuario();
  }

  ngOnDestroy(): void {
 
  }

  cargarPantalla() {
    // this.asignarUsuario();
    if (this.id_tipoUsuario == null) {
      return false;
    } else {
      return true;
    }
  }

  actualizarUsuario() {
    this.asignarUsuario();
    this.validarUsuario();
  }

  asignarUsuario() {
      this.id_tipoUsuario = 2;
  }

  validarUsuario() {

    //SE TIENE QUE VALIDAR CUALES SON LOS USUARIOS
    if (this.id_tipoUsuario == 0) {

      this.administradorActivo = true;
      this.candidatoActivo = true;
      this.visitanteActivo = false;
      this.empleadorActivo = true;
      this.seleccionar("Vacantes");


    } else if (this.id_tipoUsuario == 2) {

      this.administradorActivo = true;
      this.candidatoActivo = false;
      this.visitanteActivo = true;
      this.empleadorActivo = true;
      this.seleccionar("Vacantes");

    } else if (this.id_tipoUsuario == 3) {

      this.administradorActivo = true;
      this.candidatoActivo = true;
      this.visitanteActivo = true;
      this.empleadorActivo = false;
      this.seleccionar("Publicar Nueva");

    } else if (this.id_tipoUsuario == 1) {

      this.administradorActivo = false;
      this.candidatoActivo = true;
      this.visitanteActivo = true;
      this.empleadorActivo = true;
      this.seleccionar("Administrar");

    } else {

    }
  }

  seleccionar(ventana: string) {
    if (ventana == "Vacantes") {

      this.verVacantes();
    } else if (ventana == "Postulaciones") {
      this.verPostulaciones();
    } else if (ventana == "Notificaciones") {
      this.Notificaciones();
    } else if (ventana == "Perfil") {
      this.verPerfil();
    } else if (ventana == "Administrar") {
      this.verAdministrar();
    } else if (ventana == "Peticiones") {
      this.verPeticiones();
    } else if (ventana == "Publicaciones") {
      this.verPublicaciones();
    } else if (ventana == "Publicar Nueva") {
      this.verNueva();
    } else {
      this.login();
    }
  }

  login() {
    this.visitanteActivo = true;
    this.router.navigate(['start']);
  }

  verVacantes() {
    this.vacantes = false;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['vacantes']);
  }

  verPostulaciones() {
    this.vacantes = true;
    this.postulaciones = false;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['postulaciones']);
  }

  Notificaciones() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = false;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['notificaciones']);
  }

  verPerfil() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = false;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['perfil']);
  }

  verAdministrar() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = false;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['start']);
  }

  verPeticiones() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = false;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['start']);
  }

  verPublicaciones() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = false;
    this.publicarNueva = true;
    this.router.navigate(['start']);
  }

  verNueva() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = false;
    this.router.navigate(['start']);
  }




}


