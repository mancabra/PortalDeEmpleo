import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit{

  passI: string = "password";
  rutaI: string = "../assets/eye-off.png";

  passII: string = "password";
  rutaII: string = "../assets/eye-off.png";

  mail: any = "";
  passwordI: String = "";
  passwordII: String = "";

  errorPassI: boolean = false;
  errorPassII: boolean = false;

  msErrorPassI: String = "campo obligatorio*";
  msErrorPassII: String = "campo obligatorio*";

  constructor(private rutaActiva: ActivatedRoute, private _UserRequest: InterfaceService){

  }

  ngOnInit(): void {
    this.mail = this.rutaActiva.snapshot.params;
    console.log(this.mail);
  }

  validar(){
    this.errorPassI = false;
    this.errorPassII = false;

    this.msErrorPassI = "Campo obligatorio*";
    this.msErrorPassII = "campo obligatorio*";

    if(this.passwordI == "" && this.passwordII == ""){
      this.errorPassI = true;
      this.errorPassII = true;
    } else {
      this.validarII();
    }
  }

  validarII(){
    if (this.passwordI == ""){
      this.errorPassI = true;
      this.msErrorPassI = "campo obligatorio*";
    } else if (this.passwordI.length < 8){
      this.errorPassI = true;
      this.msErrorPassI = "valor invalido";
    } 
    this.validarIII();
  }

  validarIII(){
    if (this.passwordII == ""){
      this.errorPassII = true;
      this.msErrorPassII = "campo obligatorio*";
    } else if (this.passwordII != this.passwordI){
      this.errorPassII = true;
      this.msErrorPassII = "valor invalido";
    } 
    this.validarIV();
  }

  validarIV(){
    if(this.errorPassI == false && this.errorPassII == false ){

      const OBJETO = {
        correoElectronico: this.mail.correo,
        contrasena:this.passwordI
      }

      this._UserRequest.cambiarContra(OBJETO).then((data:any)=>{
        const error = data.mensaje;
        if(data.estatus == true){
          this.enviarAlerta(error,false);
        } else {
          this.enviarAlerta(error,true);
        }
      });
    } else {

    }
  }

  mostrarI(){
    if (this.passI == "password") {
      this.rutaI = "../assets/eye.png";
      this.passI = "text";
    } else {
      this.rutaI = "../assets/eye-off.png";
      this.passI = "password";
    }
  }


  mostrarII(){
    if (this.passII == "password") {
      this.rutaII = "../assets/eye.png";
      this.passII = "text";
    } else {
      this.rutaII = "../assets/eye-off.png";
      this.passII = "password";
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
