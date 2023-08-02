import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  usuario: Candidato = new Candidato;
  id_tipoUsuario: number = 0;
  modificarPerfil:boolean=false;

  //varibale de input administrar
  vistaAdministrar: boolean = false;

  perfilTipoAdministrador: boolean = true;
  perfilTipoCandidato: boolean = true;
  perfilTipoEmpleador: boolean = true;
  perfilTipoEmpresa: boolean = true;


  constructor(private _CandidateRequest:CandidateService) {

  }

  ngOnInit(): void {
    this.buscarUsuario();
    this.id_tipoUsuario = this.usuario.usuario.tipoUsuario;
    this.identificarTipoDePerfil();
  }

  ngOnDestroy(): void {
  }

  buscarUsuario(){
    this._CandidateRequest.obtener().then((data:any) =>{
      this.usuario = data
      console.log(this.usuario)
    });
  }

  modificarDatosPerfil(){
    
    if(this.modificarPerfil == false){
      this.modificarPerfil = true;
    }else {
      this.modificarPerfil = false;
    }
  
  }

  identificarTipoDePerfil() {
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
