import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  id_administrador: any = 0;
  correo: string = "";

  constructor(private _http: HttpClient) { }

  guaradarCorreo(correo: any) {
    this.correo = correo;
    console.log(this.correo);
  }

  registrar(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarAdministrador");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/", AdminRequest).toPromise();
  }


}
