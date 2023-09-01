import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Candidato } from '../Entity/candidato';
import { Postulacion } from '../Entity/postulacion';
import { Habilidad } from '../Entity/habilidad';
import { Idioma } from '../Entity/idioma';

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

    let cadena = "app/obtenerUsuarioCompleto/" + this.correo;
    return this._http.get<Candidato>(cadena).toPromise();
  }

  registrar(CandidateRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarCandidato");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    return this._http.put("app/registroCandidato", CandidateRequest).toPromise();
  }

  modificar(CandidatoDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso ModificarCandidato");
    console.log("Info Enviada");
    console.log(CandidatoDTO);

    return this._http.put("app/modificarCandidato", CandidatoDTO).toPromise();
  }

  modificarSecundarios(CandidatoDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso ModificarSecundarios");
    console.log("Info Enviada");
    console.log(CandidatoDTO);

    return this._http.put("app/guardarArchivo", CandidatoDTO).toPromise();
  }

  obtenerVacantes() {
    //prueba de funcionamiento
    console.log("Proceso ObternerVacantes");
    return this._http.get("app/obtenerListaVacantes").toPromise();
  }

  obtenerVacantesCercanas(CandidateRequest: number) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesCercanas");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    let cadena = "app/obtenerVacantesCerca/" + CandidateRequest;
    return this._http.get(cadena).toPromise();
  }

  obtenerVacantesMejorPagadas() {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesMejorPagadas");
    return this._http.get("app/obtenerVacantesPorSueldo").toPromise();
  }

  obtenerVacantesPorPalabra(CandidateRequest: string) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorPalabra");
    console.log("Info Enviada");
    console.log(CandidateRequest);
    let cadena = "app/obtenerVacantesPorPalabraClave/" + CandidateRequest;
    return this._http.get(cadena).toPromise();
  }

  buscarporMunicipio_Nombre(id_municipio: number, filtroActivo: string) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorPalabraYMunicipio");
    console.log("Info Enviada");
    console.log(id_municipio);
    console.log(filtroActivo);

    let cadena = "app/obtenerVacantesCercaYPorPalabraClave?id_municipio=" + id_municipio + "&palabraClave=" + filtroActivo;
    return this._http.get(cadena).toPromise();
  }

  buscarporEstado(id_estado: number) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorEstado");
    console.log("Info Enviada");
    console.log(id_estado);
    let cadena = "app/obtenerVacantesEstado/" + id_estado;
    return this._http.get(cadena).toPromise();
  }

  buscarporEstado_Nombre(CandidateRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorPalabraYEstado");
    console.log("Info Enviada");
    console.log(CandidateRequest);
    return this._http.get("app/obtenerVacantesEstadoYPorPalabraCalve", CandidateRequest).toPromise();
  }

  postularse(PostDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso Postularse");
    console.log("Info Enviada");
    console.log(PostDTO);

    return this._http.put("app/postulacion", PostDTO).toPromise();
  }

  obtenerPostulaciones(idRequest: number): Observable<Postulacion[]> {
    //prueba de funcionamiento
    console.log("Proceso ObtenerPostulaciones");
    console.log("Info Enviada id_candidato" + idRequest);

    let cadena = "app/obtenerPostulacionesPorIdDeCandidato/" + idRequest;
    return this._http.get<Postulacion[]>(cadena);
  }

  eliminarPostulacion(idRequest: number) {
    //prueba de funcionamiento
    console.log("Proceso EliminarPostulacion");
    console.log("Info Enviada id_postulacion" + idRequest);

    let cadena = "app/eliminarPostulacion/" + idRequest;
    return this._http.delete(cadena).toPromise();

  }

  obtenerHabilidades(): Observable<Habilidad[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerHabilidades");
    return this._http.get<Habilidad[]>("obtenerListaHabilidades");
  }

  guardarIdiomas(CandidateRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso guardarIdioma");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    return this._http.put("app/", CandidateRequest).toPromise();
  }

  guardarHabilidades(CandidateRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso guardarHabilidad");
    console.log("Info Enviada");
    console.log(CandidateRequest);
    
    return this._http.put("app/", CandidateRequest).toPromise();
  }

  obtenerIdiomas(): Observable<Idioma[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerIdiomas");
    return this._http.get<Idioma[]>("obtenerListaIdiomas");
  }

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

