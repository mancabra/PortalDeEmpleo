import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  usuario: Candidato = new Candidato;
  id_tipoUsuario: any;
  modificarPerfil:boolean=false;

  //varibale de input administrar
  vistaAdministrar: boolean = false;

  perfilTipoAdministrador: boolean = true;
  perfilTipoCandidato: boolean = true;
  perfilTipoEmpleador: boolean = true;
  perfilTipoEmpresa: boolean = true;


  constructor(private _UserRequest: InterfaceService) {
    this.subscription = this._UserRequest.getUser().subscribe(data => {
      this.usuario = data;
      console.log(this.usuario);
    });

    
  }

  ngOnInit(): void {
    this.id_tipoUsuario = this.usuario.usuario.tipoUsuario;
    this.identificarTipoDePerfil();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  modificarDatosPerfil(){
    if(this.modificarPerfil == false){
      this.modificarPerfil = true;
    }else {
      this.modificarPerfil = false;
    }
  
  }

  identificarTipoDePerfil() {
    this.id_tipoUsuario = 2;
    if (this.id_tipoUsuario == 0) {

      this.perfilTipoAdministrador = false;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = true;

    } else if (this.id_tipoUsuario == 2) {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = false;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = true;

    } else if (this.id_tipoUsuario == 3) {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = false;
      this.perfilTipoEmpresa = true;

    } else {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = false;
    }
  }

  cerrarSesion(){
    //falta cerrar sesion
  }


}
