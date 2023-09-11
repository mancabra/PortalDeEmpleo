import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  // VARIABLE QUE ALMACENA UN USUARO GENERAL 
  usuario: any ;
  // VARIABLE QUE ALMACENA EL ID DEL USUARIO PARA FUTURAS ACCIONES
  id_usuario: number = 0;
  // VARIABLE QUE ALMACENA EL TIPO DE USUARIO PARA FUTURAS ACCIONES
  id_tipoUsuario: number = 0;
  // VARAIBLE QUE LE INDICA AL COMONENTE HIJO QUE LA VISTA ES DESDE UN ADMINISTRADOR
  usuarioAdmin: boolean = true;
  vistaAdministrar: boolean = true;
  // VARIABLE QUE PERMITE OCULTAR LOS BOTONES DEL DOCUMETO HTML
  ocultarBotonesDeUsusario: boolean = true;
  // VARIABLES PARA OCULTAR UNA INTERFAZ ESPECIFICA
  ocultarUsuarios: boolean = true;
  verCrearCuenta: boolean = true;
  verBorrarVacante: boolean = true;
  // VARIABLE PARA ALMACENAR EL CORREO DE BUSQUEDA
  correoDeUsuario: string = "";

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _AdminRequest: AdminService, 
    private _CandidateRequest: CandidateService,
    private _UserRequest: InterfaceService) {

    }

  ngOnInit(): void {

  }

  // FUNCION PARA OCULTAR LOS ELEMENTOS DEL DOCUMENTO HTML QUE NO FORMEN PARTE DE LA SECCION SELECCIONADA
  verCrear() {
    this.verBorrarVacante = true;
    this.verCrearCuenta = false;
    this.ocultarUsuarios = true;
  }

  // FUNCION PARA OCULTAR LOS ELEMENTOS DEL DOCUMENTO HTML QUE NO FORMEN PARTE DE LA SECCION SELECCIONADA
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
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio realizar la busqueda.", true);
      }
    });
  }

  // FUNCION PARA BORRAR UN USUARIO POR ID
  Borrar() {
    if (this.id_tipoUsuario != 0) {
      this._AdminRequest.eliminarUsuario(this.id_usuario).then((data: any) => {
        if (data.estatus == true) {
          this.enviarAlerta("La cuenta del usuario ha sido eliminada y ya no esta dispinible el la aplicacion.", false);
          this.id_tipoUsuario = 0;
          this.id_usuario = 0;
          this.correoDeUsuario = "";
        } else {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio borrar la cuenta.", true);
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
          this.enviarAlerta("La cuenta ha sido suspendida de manera exitosa. Al reaizar esta acción la cuenta dejara de ser visible para otros usuarios.", false);
        } else {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio suspender la cuenta.", true);
        }
      });
    } else {
      this.enviarAlerta("No se ha podido identificar el tipo de usuario.", true);
    }
  }

  modificar() {
    if (this.id_tipoUsuario != 0) {

    } else {
      this.enviarAlerta("No se ha podido identificar el tipo de usuario.", true);
    }
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
