import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  verCrearCuenta: boolean = true;
  verBorrarVacante: boolean = true;
  usuarioAdmin: boolean = true;
  ocultarBotonesDeUsusario: boolean = true;
  vistaAdministrar: boolean = true;
  ocultarUsuarios: boolean = true;
  usuario: any ;
  correoDeUsuario: string = "";
  id_tipoUsuario: number = 0;
  id_usuario: number = 0;

  constructor(private _AdminRequest: AdminService, private _CandidateRequest: CandidateService) {

  }

  ngOnInit(): void {

  }

  verCrear() {
    this.verBorrarVacante = true;
    this.verCrearCuenta = false;
    this.ocultarUsuarios = true;
  }

  verBorrarV() {
    this.verCrearCuenta = true;
    this.verBorrarVacante = false;
    this.ocultarUsuarios = true;
  }

  // FUNCION PARA BUSCAR UN USUARIO
  buscar() {
    this.verBorrarVacante = true;
    this.verCrearCuenta = true;

    this._AdminRequest.obtenerPorCorreo(this.correoDeUsuario).then((data: any) => {
      if (data.usuario.tipoUsuario == 1 || data.usuario.tipoUsuario == 2 || data.usuario.tipoUsuario == 3) {
        this.usuario = data;
        this.id_tipoUsuario = this.usuario.usuario.tipoUsuario;
        this.id_usuario = this.usuario.usuario.id_usuario;
        this.ocultarBotonesDeUsusario = false;
        this.ocultarUsuarios = false;
        this._AdminRequest.usuarioActivo(this.usuario);
      } else {
        alert("Algo Fallo");
      }
    });
  }

  // FUNCION PARA BORRAR UN USUARIO POR ID
  Borrar() {
    if (this.id_tipoUsuario != 0) {
      this._AdminRequest.eliminarUsuario(this.id_usuario).then((data: any) => {
        if (data == "Usuario eliminado exitosamente") {
          alert("usuario borrado correctamente");
          this.id_tipoUsuario = 0;
          this.id_usuario = 0;
          this.correoDeUsuario = "";
        } else {
          alert("Algo Fallo");
        }
      });
    } else {
    }
  }

  // FUNCION PARA SUSPENDER UNA CUENTA
  suspender() {
    if (this.id_tipoUsuario != 0) {

      const DTO = {
        id_usuario: this.id_usuario,
      }

      this._CandidateRequest.suspenderCuenta(DTO).then((data: any) => {
        if (data.estatus == true) {
          alert("La cuenta ha sido suspendida");

        } else {
          alert("Algo Fallo");
        }
      });
    } else {
      alert("Algo fallo");
    }
  }

  modificar() {
    if (this.id_tipoUsuario != 0) {

    } else {
      alert("Algo fallo");
    }
  }

}
