import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  id_empleador:any=0;
  correo: string = "";

  constructor(private _http:HttpClient) { }

  guaradarCorreo(correo:any){
    this.correo = correo;
    console.log(this.correo);
  }


  registrar( EmployerRequest : any ){
     //prueba de funcionamiento
     console.log("Proceso RegistrarEmpleador");
     console.log("Info Enviada");
     console.log(EmployerRequest);

  return this._http.put("http://localhost:8080/registroEmpleador", EmployerRequest).toPromise();
  }
  
}
