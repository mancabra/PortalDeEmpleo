import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  id_empresa:any=0;
  
  constructor(private _http:HttpClient) { }

 

  registrar( CompanyRequest : any ){
  
    this._http.put("http://localhost:8080/", CompanyRequest)
    .subscribe(      
      resultado => { this.id_empresa = resultado }
    );
    return this.id_empresa;
  }
}
