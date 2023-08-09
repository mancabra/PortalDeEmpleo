import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Candidato } from '../Entity/candidato';
import { Postulacion } from '../Entity/postulacion';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  correo: string = "";

  private postulaciones$ = new Subject<Postulacion[]>();
  postulaciones: Postulacion[] = [];

  //private candidato$ = new Subject<Candidato>();
  //candidato: Candidato = new Candidato;

  constructor(private _http: HttpClient) {

  }

  guaradarCorreo(correo: any) {
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

    return this._http.put("http://localhost:8080/registroCandidato", CandidateRequest).toPromise();
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

  obtenerVacantesCercanas(CandidateRequest: number) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesCercanas");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    let cadena = "http://localhost:8080/obtenerVacantesCerca/" + CandidateRequest;
    return this._http.get(cadena).toPromise();
  }

  obtenerVacantesMejorPagadas() {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesMejorPagadas");
    return this._http.get("http://localhost:8080/obtenerVacantesPorSueldo").toPromise();
  }

  obtenerVacantesPorPalabra(CandidateRequest: string) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorPalabra");
    console.log("Info Enviada");
    console.log(CandidateRequest);
    let cadena = "http://localhost:8080/obtenerVacantesPorPalabraClave/" + CandidateRequest;
    return this._http.get(cadena).toPromise();
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

  obtenerPostulaciones(idRequest: number): Observable<Postulacion[]> {
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

  //OBSERVABLE USUARIO
  /*
  getCandidate(): Observable<Candidato> {
    return this.candidato$.asObservable();
  }

  updateCandidate() {
    this.obtener().then((data: any) => {
      this.candidato = data;
      this.esparcir(this.candidato);
    });
  }

  esparcir(candidato: Candidato) {
    this.candidato$.next(candidato);
  }

  guaradarUsuario(usuario: Candidato) {
    this.candidato = usuario;
    this.candidato$.next(this.candidato);
  }
*/

  //OBSERVABLE POSTULACIONES

  getRequest(): Observable<Postulacion[]> {
    return this.postulaciones$.asObservable();
  }

  updateRequest(id_candidato: number) {
    this.obtenerPostulaciones(id_candidato).subscribe(data => {
      this.postulaciones = data;
      this.esparcirRequest(this.postulaciones);
    });
  }

  esparcirRequest(postulaciones: Postulacion[]) {
    this.postulaciones = postulaciones;
    this.postulaciones$.next(this.postulaciones);
  }
}

