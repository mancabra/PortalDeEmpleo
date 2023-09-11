import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // VARIABLE PARA LA SUSCRIPCION A UN OBSERVABLE
  subscription: Subscription;
  // VARIABLE QUE PERMITE GESTIONAR UN ELMENTOS HTML
  ocultarNavbar: boolean = false;

  // VARIABLE PARA LA SUSCRIPCION A UN OBSERVABLE
  subscription2: Subscription;
  // VARIABLE QUE ALMACENA UN TIPO DE USUARIO
  id_tipoUsuario: number = 0;

  // DETERMINA EL USUARIO ACTIVO SEGUN EL ID DEL TIPO USUARIO
  administradorActivo: boolean = true;
  candidatoActivo: boolean = true;
  visitanteActivo: boolean = true;
  empleadorActivo: boolean = true;

  // VARIABLES PARA GESTIONAR UN ELEMNTO HTML
  // CADA VARIABLE HACE REFERENCIA A UNA VISTA DISPONIBLE EN LA APP
  vacantes: boolean = true;
  postulaciones: boolean = true;
  notificaciones: boolean = true;
  perfil: boolean = true;
  administrar: boolean = true;
  peticiones: boolean = true;
  publicaciones: boolean = true;
  publicarNueva: boolean = true;

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private router: Router,
    private _UserRequest: InterfaceService) {

    // SUSCRIPCION AL OBSERVABLE DE UN SERVICIO PARA OBTENER UNA VARIABLE BOOLEANA
    this.subscription = this._UserRequest.getNavBar().subscribe(data => {
      this.ocultarNavbar = data;
    });
    // SUSCRIPCION AL OBSERVABLE DE UN SERVICIO PARA OBTENER EL TIPO DE USUARIO QUE IUNICIO SESION
    this.subscription2 = this._UserRequest.getTipoUsuario().subscribe(data => {
      this.id_tipoUsuario = data;
      this.actualizarUsuario();
    });
  }

  ngOnInit() {
    this._UserRequest.mostarNav();
    this._UserRequest.hacerVisitante();
    this.actualizarUsuario();
  }

  // FUNCION PARA ELIMINAR LA SUSCRIPCION A UN OBSERVABLE
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  // FUNCION QUE EVALUA UNA VARIABLE 
  // SI LA VARIABLE ES NULA MUESTRA UNA PANTALLA ALTERNATIVA
  cargarPantalla() {
    if (this.id_tipoUsuario == null) {
      return false;
    } else {
      return true;
    }
  }

  actualizarUsuario() {
    this.validarUsuario();
  }

  // FUNCION QUE VALIDA EL TIPO DE USUARIO ACTIVO Y LE ASIGNA UNA VISTA PREDETERMINADA
  // ADMINISTRADOR : VENTANA PREDETERMINADA (Adminsitrar)
  // CANDIDATO : VENTANA PREDETERMINADA (Vacantes)
  // EMPLEADOR : VENTANA PREDETERMINADA (Publicar Nueva)
  // visitante : VENTANA PREDETERMINADA (Vacantes)
  validarUsuario() {
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

  // FUNCION QUE EVALUA LA VENTANA ASIGNADA Y DETERMINA UN FLUJO
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

  // FUNCION DEL BOTON LOGIN DE LA NAVBAR
  login() {
    this._UserRequest.ocultarNavB();
    this.router.navigate(['start']);
  }

  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  verVacantes() {
    this.vacantes = false;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['interface/vacantes']);
  }

  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  verPostulaciones() {
    this.vacantes = true;
    this.postulaciones = false;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['interface/postulaciones']);
  }

  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  Notificaciones() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = false;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['interface/notificaciones']);
  }

  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  verPerfil() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = false;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['interface/perfil']);
  }

  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  verAdministrar() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = false;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['interface/administrar']);
  }

  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  verPeticiones() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = false;
    this.publicaciones = true;
    this.publicarNueva = true;
    this.router.navigate(['interface/peticiones']);
  }

  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  verPublicaciones() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = false;
    this.publicarNueva = true;
    this.router.navigate(['interface/publicaciones']);
  }

  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  verNueva() {
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = false;
    this.router.navigate(['interface/publicar']);
  }

}


