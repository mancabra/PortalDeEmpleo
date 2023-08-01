import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidato } from '../Entity/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  id_candidato: any = 0;
  correo: string = "";

  constructor(private _http: HttpClient) { }

  guaradarCorreo(correo:any){
    this.correo = correo;
    console.log(this.correo);
  }

  obtener(CandidateRequest:string):Observable<Candidato>{

    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    let cadena = "http://localhost:8080/obtenerUsuario/" + CandidateRequest;
    return this._http.get<Candidato>(cadena);
  }

  registrar(CandidateRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarCandidato");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    this._http.put("http://localhost:8080/registroCandidato", CandidateRequest)
      .subscribe(
        resultado => { this.id_candidato = resultado }
      );
    return this.id_candidato;
  }

  modificar(CandidatoDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso ModificarCandidato");
    console.log("Info Enviada");
    console.log(CandidatoDTO);

    return this._http.put("http://localhost:8080/modificarCandidato", CandidatoDTO).toPromise();
  }


  obtenerVacantes() {
    //prueba de funcionamiento
    console.log("Proceso ObternerVacantes");

    return this._http.get("http://localhost:8080/obtenerListaVacantes").toPromise();
  }

  buscarporFiltro(BusquedaDTO: any) {
    // VER COMO MANEJA SAMUEL LOS FILTROS
    return this._http.get("http://localhost:8080/", BusquedaDTO).toPromise();
  }

  postularse(PostDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso Postularse");
    console.log("Info Enviada");
    console.log(PostDTO);

    return this._http.put("http://localhost:8080/postulacion", PostDTO).toPromise();
  }

  obtenerPostulaciones(idRequest: number) {
    //prueba de funcionamiento
    console.log("Proceso ObtenerPostulaciones");
    console.log("Info Enviada id_candidato" + idRequest);

    let cadena = "http://localhost:8080/obtenerPostulacionesPorIdDeCandidato/" + idRequest;
    return this._http.get(cadena).toPromise();
  }

  eliminarPostulacion(idRequest: number) {
    //prueba de funcionamiento
    console.log("Proceso EliminarPostulacion");
    console.log("Info Enviada id_postulacion" + idRequest);

    let cadena = "http://localhost:8080/eliminarPostulacion/" + idRequest;
    return this._http.delete(cadena).toPromise();

  }



}

