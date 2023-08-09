import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  //varibale de input administrar
  vistaAdministrar: boolean = false;

  perfilTipoAdministrador: boolean = true;
  perfilTipoCandidato: boolean = true;
  perfilTipoEmpleador: boolean = true;
  perfilTipoEmpresa: boolean = true;


  constructor(private _CandidateRequest:CandidateService, private _UserRequest:InterfaceService, private router:Router) {

  }

  ngOnInit(): void {
    this.buscarUsuario();
  }

  ngOnDestroy(): void {
  }

  buscarUsuario(){
    this._UserRequest.obtener().then((data:any) =>{
      this.usuario = data
      console.log(this.usuario)
      this.id_tipoUsuario = this.usuario.usuario.tipoUsuario;
      this.identificarTipoDePerfil();
    });
  }

  modificarDatosPerfil(){
    this.router.navigate(['interface/perfil/modificar']);
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
    this._UserRequest.hacerVisitante();
    this._UserRequest.guaradarCorreo("");
  }


}
