import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() viewLogin = new EventEmitter<boolean>();
  @Output() viewCreate = new EventEmitter<boolean>();

  imagenLog: string = "../assets/imagenPre.jpg";

  // VARIABLE PARA VERIFICAR QUE EL CORREO NO ESTE REGISTRADO EN BD
  correoExistente: boolean = true;
  // VARIABLE PARA VERIFICAR QUE LA CONTRASEÑA INGRESADA SEA CORRECTA
  contrasenaCorrecta: boolean = true;

  // VARIABLES PARA CONTROLAR LAS CLASES DE LOS ERRORES EN LA VISTA HTML
  verErrorContrasena: boolean = true;
  verErrorCorreo: boolean = true;
  obligatorios: boolean = true;

  // VARIABLES PARA LA CAPTURA DE DATOS
  correoIngresado: string = "";
  contrasenaIngresada: string = "";

  constructor(private _UserRequest: InterfaceService) {
  }

  ngOnInit() {
  }

  // FUNCION PARA EVALUAR LOS FORMULARIOS 
  evaluarCampos() {
    this.correoExistente = true;
    this.contrasenaCorrecta = true;
    this.verErrorCorreo = true;
    this.verErrorContrasena = true;
    this.obligatorios = true;
    // Código para evaluar que los campos del formulario no esten vacios
    if (this.correoIngresado == "" && this.contrasenaIngresada == "") {
      this.verErrorCorreo = false;
      this.verErrorContrasena = false;
      this.obligatorios = false;
    } else if (this.correoIngresado == "") {
      this.verErrorCorreo = false;
      this.obligatorios = false;
    } else if (this.contrasenaIngresada == "") {
      this.verErrorContrasena = false;
      this.obligatorios = false;
    } else {
    }
    this.evaluarCorreo();
  }

  // FUNCION DE LOGIN
  evaluarCorreo() {
    if (this.obligatorios == true) {

      const USUARIO = {
        correoElectronico: this.correoIngresado,
        contrasena: this.contrasenaIngresada,
      }

      this._UserRequest.login(USUARIO).then((data: any) => {
        if (data.estatus == false) {

          // CODIGO PARA MOSTRAR LOS ERRORES DE LOGIN

          /*
          if(data.massaje =="correo no registrado"){
            this.correoExistente == false;
          }else if (data.massaje =="contraseñaIncorrecta"){
            this.contrasenaCorrecta = false;
          }else {
  
          }
         */

          this.enviarAlerta("No hemos podido encontrar una cuenta que este asociada a estos datos.", true);

        } else {
          this._UserRequest.guaradarCorreo(USUARIO.correoElectronico);
          this._UserRequest.cambiartipo();
          this._UserRequest.mostarNav();
          //this.router.navigate(['vacantes']);
        }
      });
    } else {
      this.enviarAlerta("Algunos de los campos obligatorios para el inicio de sesión no se han capturado.", true);
    }
  }

  // FUNCION PARA OCULTAR COMPONENTE LOGIN O CREATE
  linkCreate() {
    this.viewLogin.emit(true);
    this.viewCreate.emit(false);
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
