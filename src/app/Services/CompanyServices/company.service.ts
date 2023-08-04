import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  id_empresa: any = 0;

  constructor(private _http: HttpClient) { }



  registrar(CompanyRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarEmpresa");
    console.log("Info Enviada");
    console.log(CompanyRequest);

    return this._http.put("http://localhost:8080/", CompanyRequest).toPromise();
  }
}
