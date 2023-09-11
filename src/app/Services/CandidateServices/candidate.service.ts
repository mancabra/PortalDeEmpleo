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

  private postulaciones$ = new Subject<Postulacion[]>();
  postulaciones: Postulacion[] = [];
  correo: string = "";

  constructor(private _http: HttpClient) {

  }

  // FUNCION QUE PERMITE GUARDAR EL CORREO INGRESADO EN EL LOGIN EN UNA VARIABLE LOCAL
  guaradarCorreo(correo: any) {
    this.correo = correo;
    console.log(this.correo);
  }

  // FUNCIONES DE CREACION ---------------------------------
  registrar(CandidateRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarCandidato");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    return this._http.put("app/registroCandidato", CandidateRequest).toPromise();
  }

  // FUNCIONES DE MODIFICACION -----------------------------
  // GUARDAR ATRIBUTOS
  modificar(CandidatoDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso ModificarCandidato");
    console.log("Info Enviada");
    console.log(CandidatoDTO);

    return this._http.put("app/modificarCandidato", CandidatoDTO).toPromise();
  }

  // GUARDAR DOCUMENTOS
  modificarSecundarios(CandidatoDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso ModificarSecundarios");
    console.log("Info Enviada");
    console.log(CandidatoDTO);

    return this._http.put("app/guardarArchivo", CandidatoDTO).toPromise();
  }

   // GUARDAR IDIOMAS
   guardarIdiomas(idiomas:any) {
    //prueba de funcionamiento
    console.log("Proceso guardarIdiomas");
    console.log("Info Enviada");
    console.log(idiomas);

    return this._http.put("app/agregarIdiomas", idiomas).toPromise();
  }

  // GUARDAR HABILIDADES
  guardarHabilidades(habiliadades: any) {
    //prueba de funcionamiento
    console.log("Proceso guardarHabilidades");
    console.log("Info Enviada");
    console.log(habiliadades);

    return this._http.put("app/agregarHabilidades", habiliadades).toPromise();
  }

  // FUNCIONES PARA OBTENER DATOS --------------------------
  // OBTENER USUARIO COMPLETO
  obtener() {
    //prueba de funcionamiento
    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(this.correo);

    let cadena = "app/obtenerUsuarioCompleto/" + this.correo;
    return this._http.get<Candidato>(cadena).toPromise();
  }

  // OBTENER VACANTES DE BASE DE DATOS (TODAS)
  obtenerVacantes() {
    //prueba de funcionamiento
    console.log("Proceso ObternerVacantes");
    return this._http.get("app/obtenerListaVacantes").toPromise();
  }

  // OBTENER VACANTES DE BASE DE DATOS (POR MUNICIPIO)
  obtenerVacantesCercanas(CandidateRequest: number) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesCercanas");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    let cadena = "app/obtenerVacantesCerca/" + CandidateRequest;
    return this._http.get(cadena).toPromise();
  }

  // OBTENER VACANTES DE BASE DE DATOS (ORDENADAS POR SUELDO)
  obtenerVacantesMejorPagadas() {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesMejorPagadas");
    return this._http.get("app/obtenerVacantesPorSueldo").toPromise();
  }

  // OBTENER VACANTES DE BASE DE DATOS (POR TITULO DE VACANTE)
  obtenerVacantesPorPalabra(CandidateRequest: string) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorPalabra");
    console.log("Info Enviada");
    console.log(CandidateRequest);
    let cadena = "app/obtenerVacantesPorPalabraClave/" + CandidateRequest;
    return this._http.get(cadena).toPromise();
  }

  // OBTENER VACANTES DE BASE DE DATOS (POR NOMBRE Y MUNICIPIO)
  buscarporMunicipio_Nombre(id_municipio: number, filtroActivo: string) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorPalabraYMunicipio");
    console.log("Info Enviada");
    console.log(id_municipio);
    console.log(filtroActivo);

    let cadena = "app/obtenerVacantesCercaYPorPalabraClave?id_municipio=" + id_municipio + "&palabraClave=" + filtroActivo;
    return this._http.get(cadena).toPromise();
  }

  // OBTENER VACANTES DE BASE DE DATOS (POR ESTADO)
  buscarporEstado(id_estado: number) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorEstado");
    console.log("Info Enviada");
    console.log(id_estado);
    let cadena = "app/obtenerVacantesEstado/" + id_estado;
    return this._http.get(cadena).toPromise();
  }

  // OBTENER VACANTES DE BASE DE DATOS (POR ESTADO Y NOMBRE)
  buscarporEstado_Nombre(CandidateRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso obtenerVacantesPorPalabraYEstado");
    console.log("Info Enviada");
    console.log(CandidateRequest);
    return this._http.get("app/obtenerVacantesEstadoYPorPalabraCalve", CandidateRequest).toPromise();
  }

  // OBTENER POSTULACIUONES DEL CANDIDATO
  obtenerPostulaciones(idRequest: number): Observable<Postulacion[]> {
    //prueba de funcionamiento
    console.log("Proceso ObtenerPostulaciones");
    console.log("Info Enviada id_candidato" + idRequest);

    let cadena = "app/obtenerPostulacionesPorIdDeCandidato/" + idRequest;
    return this._http.get<Postulacion[]>(cadena);
  }

  // OBTENER HABILIADADES DISPONIBLES
  obtenerHabilidades(): Observable<Habilidad[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerHabilidades");
    return this._http.get<Habilidad[]>("app/obtenerListaHabilidades");
  }

   // OBTENER IDIOMAS DISPONIBLES
  obtenerIdiomas(): Observable<Idioma[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerIdiomas");
    return this._http.get<Idioma[]>("app/obtenerListaIdiomas");
  }

  // FUNCIONES DE INTERACCION CANDIDATOS -------------------

  // POSTULARSE A VACANTE
  postularse(PostDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso Postularse");
    console.log("Info Enviada");
    console.log(PostDTO);

    return this._http.put("app/postulacion", PostDTO).toPromise();
  }

  // ELIMINAR POSTULACION
  eliminarPostulacion(idRequest: number) {
    //prueba de funcionamiento
    console.log("Proceso EliminarPostulacion");
    console.log("Info Enviada id_postulacion" + idRequest);

    let cadena = "app/eliminarPostulacion/" + idRequest;
    return this._http.delete(cadena).toPromise();

  }

  // SUSPENDER CUENTA 
  suspenderCuenta(idRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso suspender");
    console.log("Info Enviada");
    console.log(idRequest);
    return this._http.put("app/suspenderUsuario", idRequest).toPromise();
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

