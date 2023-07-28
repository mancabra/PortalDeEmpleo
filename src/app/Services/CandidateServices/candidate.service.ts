import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  id_candidato:any=0;
  
  constructor(private _http:HttpClient) { }

 

  registrar( CandidateRequest : any ){
    //return this._http.put("http://localhost:8080/", EmployerRequest).toPromise();
    this._http.put("http://localhost:8080/registroCandidato", CandidateRequest)
    .subscribe(      
      resultado => { this.id_candidato = resultado }
    );
    return this.id_candidato;
  }

  modificar(CandidatoDTO:any){
    return this._http.put("http://localhost:8080/modificarCandidato",CandidatoDTO).toPromise();
  }


  obtenerVacantes(){
    return this._http.get("http://localhost:8080/obtenerListaVacantes").toPromise();
  }

  buscarporFiltro(BusquedaDTO:any){
    // VER COMO MANEJA SAMUEL LOS FILTROS
    return this._http.get("http://localhost:8080/",BusquedaDTO).toPromise();
  }

  postularse(PostDTO:any){
    return this._http.put("http://localhost:8080/postulacion",PostDTO).toPromise();
  }

  obtenerPostulaciones(idRequest:number){
    let cadena = "http://localhost:8080/obtenerPostulacionesPorIdDeCandidato/"+idRequest;
    return this._http.get(cadena).toPromise();
  }

  eliminarPostulacion(idRequest:number){
    let cadena = "http://localhost:8080/eliminarPostulacion/"+idRequest;
    return this._http.delete(cadena).toPromise();

  }



}

