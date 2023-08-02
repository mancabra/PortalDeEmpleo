import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Candidato } from '../Entity/candidato';
import { Postulacion } from '../Entity/postulacion';
import { InterfaceService } from '../InterfaceServices/interface.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {


  id_candidato: any = 0;
  correo: string = "";
  candidato: Candidato = new Candidato;

  postulaciones: Postulacion[] = [];
  private postulaciones$ = new Subject<any>();


  constructor(private _http: HttpClient) { 

  }

  guaradarUsuario(usuario:Candidato){
    this.candidato = usuario;
  }

  guaradarCorreo(correo:any){
    this.correo = correo;
    console.log(this.correo);
  }

  obtener(CandidateRequest:string) {

    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(CandidateRequest);

    let cadena = "http://localhost:8080/obtenerUsuarioCompleto/" + CandidateRequest;
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

    this.esparcirPostulaciones();

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
    this.esparcirPostulaciones();

    let cadena = "http://localhost:8080/eliminarPostulacion/" + idRequest;
    return this._http.delete(cadena).toPromise();

  }

  getPostulaciones(): Observable<Postulacion[]> {
    return this.postulaciones$.asObservable();
  }

  esparcirPostulaciones() {
      this.obtenerPostulaciones(this.candidato.id_candidato).subscribe(data => {
        this.postulaciones = data;
        console.log(this.postulaciones);
      });
    this.postulaciones$.next(this.postulaciones);
  }




}

