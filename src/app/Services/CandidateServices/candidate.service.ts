import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidato } from '../Entity/candidato';
import { Postulacion } from '../Entity/postulacion';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {


  id_candidato: any = 0;
  correo: string = "";
  candidato: Candidato = new Candidato;

  constructor(private _http: HttpClient) { 

  }

  guaradarUsuario(usuario:Candidato){
    this.candidato = usuario;
  }

  guaradarCorreo(correo:any){
    this.correo = correo;
    console.log(this.correo);
  }

  obtener() {
    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(this.correo);

    let cadena = "http://localhost:8080/obtenerUsuarioCompleto/" + this.correo;
    return this._http.get<Candidato>(cadena).toPromise();
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

  obtenerPostulaciones(idRequest: number):Observable<Postulacion[]>  {
    //prueba de funcionamiento
    console.log("Proceso ObtenerPostulaciones");
    console.log("Info Enviada id_candidato" + idRequest);

    let cadena = "http://localhost:8080/obtenerPostulacionesPorIdDeCandidato/" + idRequest;
    return this._http.get<Postulacion[]>(cadena);
  }

  eliminarPostulacion(idRequest: number) {
    //prueba de funcionamiento
    console.log("Proceso EliminarPostulacion");
    console.log("Info Enviada id_postulacion" + idRequest);

    let cadena = "http://localhost:8080/eliminarPostulacion/" + idRequest;
    return this._http.delete(cadena).toPromise();

  }

}

