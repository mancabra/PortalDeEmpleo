import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
 subscription:Subscription;
  @Output() viewJobs = new EventEmitter<boolean>();
  @Output() viewRequests = new EventEmitter<boolean>();
  @Output() newJob = new EventEmitter<boolean>();
  @Output() candidates = new EventEmitter<boolean>();
  @Output() manage = new EventEmitter<boolean>();
  @Output() viewRequestsAdmin = new EventEmitter<boolean>();
  @Output() alerts = new EventEmitter<boolean>();
  @Output() profile = new EventEmitter<boolean>();

  usuario:Candidato = new Candidato;

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

  constructor(private router: Router, private _UserRequest: InterfaceService) {
    this.subscription = this._UserRequest.getUser().subscribe(data =>{
      this.usuario = data;
      console.log(this.usuario);
    });
  }

  ngOnInit() {
    this.actualizarUsuario();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarPantalla(){
    this.asignarUsuario();
    if (this.id_tipoUsuario == null) {
      return false;
    } else {
      return true;
    }
  }

  actualizarUsuario(){
    this.asignarUsuario();
    this.validarUsuario();
  }

  asignarUsuario(){
    if (this.usuario == null){
      this.id_tipoUsuario = 0;
    } else{
      this.id_tipoUsuario = this.usuario.usuario.tipoUsuario;
    }

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
    this.vacantes = true;
    this.postulaciones = true;
    this.notificaciones = true;
    this.perfil = true;
    this.administrar = true;
    this.peticiones = true;
    this.publicaciones = true;
    this.publicarNueva = true;
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
    this.enviarVacantes();
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
    this.enviarPostulaciones();
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
    this.enviarNotificaciones();
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
    this.enviarPerfil();
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
    this.enviarAdministrar();
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
    this.enviarPeticiones();
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
    this.enviarPublicaciones();
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
    this.enviarNueva();
  }

  enviarVacantes() {
    this.viewJobs.emit(false);
    this.viewRequests.emit(true);
    this.newJob.emit(true);
    this.candidates.emit(true);
    this.manage.emit(true);
    this.viewRequestsAdmin.emit(true);
    this.alerts.emit(true);
    this.profile.emit(true);

  }

  enviarPostulaciones() {
    this.viewJobs.emit(true);
    this.viewRequests.emit(false);
    this.newJob.emit(true);
    this.candidates.emit(true);
    this.manage.emit(true);
    this.viewRequestsAdmin.emit(true);
    this.alerts.emit(true);
    this.profile.emit(true);

  }

  enviarNotificaciones() {
    this.viewJobs.emit(true);
    this.viewRequests.emit(true);
    this.newJob.emit(true);
    this.candidates.emit(true);
    this.manage.emit(true);
    this.viewRequestsAdmin.emit(true);
    this.alerts.emit(false);
    this.profile.emit(true);

  }

  enviarPerfil() {
    this.viewJobs.emit(true);
    this.viewRequests.emit(true);
    this.newJob.emit(true);
    this.candidates.emit(true);
    this.manage.emit(true);
    this.viewRequestsAdmin.emit(true);
    this.alerts.emit(true);
    this.profile.emit(false);

  }

  enviarAdministrar() {
    this.viewJobs.emit(true);
    this.viewRequests.emit(true);
    this.newJob.emit(true);
    this.candidates.emit(true);
    this.manage.emit(false);
    this.viewRequestsAdmin.emit(true);
    this.alerts.emit(true);
    this.profile.emit(true);

  }


  enviarPeticiones() {
    this.viewJobs.emit(true);
    this.viewRequests.emit(true);
    this.newJob.emit(true);
    this.candidates.emit(true);
    this.manage.emit(true);
    this.viewRequestsAdmin.emit(false);
    this.alerts.emit(true);
    this.profile.emit(true);

  }

  enviarPublicaciones() {
    this.viewJobs.emit(true);
    this.viewRequests.emit(true);
    this.newJob.emit(true);
    this.candidates.emit(false);
    this.manage.emit(true);
    this.viewRequestsAdmin.emit(true);
    this.alerts.emit(true);
    this.profile.emit(true);

  }

  enviarNueva() {
    this.viewJobs.emit(true);
    this.viewRequests.emit(true);
    this.newJob.emit(false);
    this.candidates.emit(true);
    this.manage.emit(true);
    this.viewRequestsAdmin.emit(true);
    this.alerts.emit(true);
    this.profile.emit(true);

  }



}


