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
    //return this._http.put("http://localhost:8080/", EmployerRequest).toPromise();
    this._http.put("http://localhost:8080/registroCandidato", EmployerRequest)
    .subscribe(      
      resultado => { this.id_empleador = resultado }
    );
    return this.id_empleador;
  }
}
