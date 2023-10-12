import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {

  // VARIABLE PARA LA SUSCRIPCION A UN OBSERVABLE
  subscription: Subscription;
  // VARIABLE QUE PERMITE GESTIONAR UN ELMENTOS HTML
  ocultarNavbar: boolean = false;

  // VARIABLE PARA LA SUSCRIPCION A UN OBSERVABLE
  subscription2: Subscription;
  // VARIABLE QUE ALMACENA UN TIPO DE USUARIO
  id_tipoUsuario: number = 0;

  // VARIABLES PARA GESTIONAR UN ELEMNTO HTML
  // CADA VARIABLE HACE REFERENCIA A UNA VISTA DISPONIBLE EN LA APP
  start: boolean = true;
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
      this.ocultarTodas();
      this.validarUsuario();
    });
  }
  ngAfterViewInit(): void {
    if (this.id_tipoUsuario == 0) {
      this.activarVacantes();
    } else if (this.id_tipoUsuario == 1) {
      this.activarAdministrar();
    } else if (this.id_tipoUsuario == 2) {
      this.activarVacantes();
    } else {
      this.activarNueva();
    }
  }

  ngOnInit() {
    this._UserRequest.mostarNav();
    this._UserRequest.hacerVisitante();
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

  ocultarTodas() {
    this.start = false;
    this.vacantes = false;
    this.postulaciones = false;
    this.notificaciones = false;
    this.perfil = false;
    this.administrar = false;
    this.peticiones = false;
    this.publicaciones = false;
    this.publicarNueva = false;
  }

  // FUNCION QUE VALIDA EL TIPO DE USUARIO ACTIVO Y LE ASIGNA UNA VISTA PREDETERMINADA
  // ADMINISTRADOR : VENTANA PREDETERMINADA (Adminsitrar)
  // CANDIDATO : VENTANA PREDETERMINADA (Vacantes)
  // EMPLEADOR : VENTANA PREDETERMINADA (Publicar Nueva)
  // visitante : VENTANA PREDETERMINADA (Vacantes)
  validarUsuario() {
    if (this.id_tipoUsuario == 0) {
      this.start = true;
      this.vacantes = true;
      this.seleccionar("Vacantes");
    } else if (this.id_tipoUsuario == 2) {
      this.vacantes = true;
      this.postulaciones = true;
      this.notificaciones = true;
      this.perfil = true;
      this.seleccionar("Vacantes");
    } else if (this.id_tipoUsuario == 3) {
      this.publicarNueva = true;
      this.publicaciones = true;
      this.notificaciones = true;
      this.perfil = true;
      this.seleccionar("Publicar Nueva");
    } else if (this.id_tipoUsuario == 1) {
      this.administrar = true;
      this.peticiones = true;
      this.perfil = true;
      this.seleccionar("Administrar");
    } else {

    }
  }

  // FUNCION QUE EVALUA LA VENTANA ASIGNADA Y DETERMINA UN FLUJO
  // FUNCION QUE CAMBIA LA RUTA ACTUAL A LA DE LA VISTA SELECCIONADA
  // LA VARIABLE BOOLEANA EN FALSE DA UN ESTILO A LA VISTA SELECCIONADA 
  seleccionar(ventana: string) {
    if (ventana == "Vacantes") {
     // this.activarLogin();
     this.router.navigate(['interface/vacantes']);
      this.activarVacantes();
    } else if (ventana == "Postulaciones") {
      this.router.navigate(['interface/postulaciones']);
      this.activarPostulaciones();
    } else if (ventana == "Notificaciones") {
      this.router.navigate(['interface/notificaciones']);
      this.activarNotificaciones();
    } else if (ventana == "Perfil") {
      this.router.navigate(['interface/perfil']);
      this.activarPerfil();
    } else if (ventana == "Administrar") {
      this.router.navigate(['interface/administrar']);
      this.activarAdministrar();
    } else if (ventana == "Peticiones") {
      this.router.navigate(['interface/peticiones']);
      this.activarProcesos();
    } else if (ventana == "Publicaciones") {
      this.router.navigate(['interface/publicaciones']);
      this.activarPublicaciones();
    } else if (ventana == "Publicar Nueva") {
      this.router.navigate(['interface/publicar']);
      this.activarNueva();
    } else {
      this.login();
    }
  }

  // FUNCION DEL BOTON LOGIN DE LA NAVBAR
  login() {
    this._UserRequest.ocultarNavB();
    this.router.navigate(['start']);
  }

  desactivarLogin() {
    const boton = document.getElementsByName("login")[0];
    boton.classList.remove("seleccionada");
  }

  desactivarVacantes() {
    const boton = document.getElementsByName("vacantes")[0];
    boton.classList.remove("seleccionada");
  }

  desactivarPostulaciones() {
    const boton = document.getElementsByName("postulaciones")[0];
    boton.classList.remove("seleccionada");
  }

  desactivarNotificaciones() {
    const boton = document.getElementsByName("notificaciones")[0];
    boton.classList.remove("seleccionada");
  }

  desactivarPerfil() {
    const boton = document.getElementsByName("perfil")[0];
    boton.classList.remove("seleccionada");
  }

  desactivarNueva() {
    const boton = document.getElementsByName("nueva")[0];
    boton.classList.remove("seleccionada");
  }

  desactivarPublicaciones() {
    const boton = document.getElementsByName("publicaciones")[0];
    boton.classList.remove("seleccionada");
  }

  desactivarAdministrar() {
    const boton = document.getElementsByName("administrar")[0];
    boton.classList.remove("seleccionada");
  }

  desactivarProcesos() {
    const boton = document.getElementsByName("proceso")[0];
    boton.classList.remove("seleccionada");
  }

  /*
  activarLogin() {
    const boton = document.getElementsByName("login")[0];
    boton.classList.add("seleccionada");
  }
  */
  activarVacantes() {
    if (this.id_tipoUsuario == 2) {
      this.desactivarPostulaciones();
      this.desactivarNotificaciones();
      this.desactivarPerfil();
    }
    const boton = document.getElementsByName("vacantes")[0];
    boton.classList.add("seleccionada");
  }

  activarPostulaciones() {
    this.desactivarVacantes();
    this.desactivarNotificaciones();
    this.desactivarPerfil();
    const boton = document.getElementsByName("postulaciones")[0];
    boton.classList.add("seleccionada");
  }

  activarNotificaciones() {
    if (this.id_tipoUsuario == 2) {
      this.desactivarVacantes();
      this.desactivarPostulaciones();
      this.desactivarPerfil();
    } else {
      this.desactivarNueva();
      this.desactivarPublicaciones();
    }
    const boton = document.getElementsByName("notificaciones")[0];
    boton.classList.add("seleccionada");
  }

  activarPerfil() {
    if (this.id_tipoUsuario == 1) {
      this.desactivarAdministrar();
      this.desactivarProcesos();
    } else if (this.id_tipoUsuario == 2) {
      this.desactivarVacantes();
      this.desactivarPostulaciones();
      this.desactivarNotificaciones();
    } else{
      this.desactivarNueva();
      this.desactivarPublicaciones();
      this.desactivarNotificaciones();
    }
    const boton = document.getElementsByName("perfil")[0];
    boton.classList.add("seleccionada");
  }

  activarNueva() {
    this.desactivarPublicaciones();
    this.desactivarNotificaciones();
    this.desactivarPerfil();
    const boton = document.getElementsByName("nueva")[0];
    boton.classList.add("seleccionada");
  }


  activarPublicaciones() {
    this.desactivarNueva();
    this.desactivarNotificaciones();
    this.desactivarPerfil();
    const boton = document.getElementsByName("publicaciones")[0];
    boton.classList.add("seleccionada");
  }

  activarAdministrar() {
;
    this.desactivarProcesos();
    this.desactivarPerfil();
    const boton = document.getElementsByName("administrar")[0];
    boton.classList.add("seleccionada");
  }

  activarProcesos() {
    this.desactivarAdministrar();
    this.desactivarPerfil();
    const boton = document.getElementsByName("proceso")[0];
    boton.classList.add("seleccionada");
  }

}


