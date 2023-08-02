import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() viewLogin  = new EventEmitter<boolean>();
  @Output () viewCreate = new EventEmitter<boolean>();

  imagenLog:string ="../assets/imagenPre.jpg";

  correoExistente :boolean =true;
  contrasenaCorrecta: boolean = true;

  verErrorContrasena : boolean = true;
  verErrorCorreo : boolean = true;
 

  correoIngresado: string ="";
  contrasenaIngresada: string ="";

  constructor(private router:Router, private _UserRequest:InterfaceService) {

  }

  ngOnInit() {

  }

  evaluarCampos(){

    this.correoExistente = true;
    this.contrasenaCorrecta = true;

    this.verErrorCorreo = true;
    this.verErrorContrasena = true;

    if(this.correoIngresado =="" && this.contrasenaIngresada==""){
      this.verErrorCorreo= false;
      this.verErrorContrasena=false;
    } else if(this.correoIngresado==""){
      this.verErrorCorreo= false;
    }else if(this.contrasenaIngresada==""){
      this.verErrorContrasena= false;
    }else{
      this.evaluarCorreo();
    }
  }

  evaluarCorreo(){

    const USUARIO = {
      correoElectronico:this.correoIngresado,
      contrasena:this.contrasenaIngresada,
    }
    this._UserRequest.guaradarCorreo(USUARIO.correoElectronico);
    this._UserRequest.cambiartipo();
    this._UserRequest.mostarNav();
    this.router.navigate(['vacantes']);
    this._UserRequest.login(USUARIO).then((data:any) =>{
      if(data.estatus == false){

        // CODIGO PARA MOSTRAR LOS ERRORES DE LOGIN

        /*
        if(data.massaje =="correo no registrado"){
          this.correoExistente == false;
        }else if (data.massaje =="contraseñaIncorrecta"){
          this.contrasenaCorrecta = false;
        }else {

        }
       */

      alert("Datos Incorrectos");

      }else{
        this._UserRequest.guaradarCorreo(USUARIO.correoElectronico);
        this._UserRequest.cambiartipo();
        this._UserRequest.mostarNav();
        this.router.navigate(['vacantes']);
      }
    });


  }

  linkCreate() {
    this.viewLogin.emit(true);
    this.viewCreate.emit(false);
  }

}
