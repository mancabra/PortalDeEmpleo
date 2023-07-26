import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  id_administrador:any=0;
  
  constructor(private _http:HttpClient) { }

 

  registrar( AdminRequest : any ){
    //return this._http.put("http://localhost:8080/", EmployerRequest).toPromise();
    this._http.put("http://localhost:8080/", AdminRequest)
    .subscribe(      
      resultado => { this.id_administrador = resultado }
    );
    return this.id_administrador;
  }
}
