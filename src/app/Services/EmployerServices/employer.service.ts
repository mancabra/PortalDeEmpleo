import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Empresa } from '../Entity/empresa';
import { TipoHorario } from '../Entity/tipo-horario';
import { TipoContratacion } from '../Entity/tipo-contratacion';
import { ModalidadTrabajo } from '../Entity/modalidad-trabajo';
import { Empleador } from '../Entity/empleador';
import { Vacante } from '../Entity/vacante';
import { Candidato } from '../Entity/candidato';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  id_empleador: any = 0;
  correo: string = "";
  vacante: Vacante = new Vacante;
  private vacante$ = new Subject<Vacante>();

  constructor(private _http: HttpClient) { }

  guaradarCorreo(correo: any) {
    this.correo = correo;
    console.log(this.correo);
  }


  registrar(EmployerRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarEmpleador");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    return this._http.put("http://localhost:8080/registroEmpleador", EmployerRequest).toPromise();
  }

  obtener() {
    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(this.correo);

    let cadena = "http://localhost:8080/obtenerUsuarioCompleto/" + this.correo;
    return this._http.get<Empleador>(cadena).toPromise();
  }

  // OBTENER PUBLICACIONES DE CANDIDATO
  obtenerPublicaciones(EmployerRequest: any): Observable<Vacante[]> {
    console.log("Proceso obtener publicaciones");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    let cadena ="http://localhost:8080/obtenerVacantesPorIdEmpleador/" + EmployerRequest;

    return this._http.get<Vacante[]>(cadena);
  }

  // OBTENER CANDIDATOS DE LA VACANTE
  ontenerCandidatosVacante(EmployerRequest: number): Observable<Candidato[]>{
    console.log("Proceso obtener CandidatosVacante");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    let cadena ="http://localhost:8080/obtenerVacantesPorIdEmpleador/" + EmployerRequest;
    return this._http.get<Candidato[]>(cadena);
  }

  // ELIMINAR VACANTE
  eliminarVacante(EmployerRequest: number){
    console.log("Proceso eliminarVacante");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    let cadena = "http://localhost:8080/eliminarVacante/"+EmployerRequest;

    return this._http.delete(cadena).toPromise();
  }

  // OBTENER EMPRESAS
  obtenerEmpresas(): Observable<Empresa[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerEmpresas");

    return this._http.get<Empresa[]>("http://localhost:8080/obtenerListaEmpresas");
  }

  obtenerTiposDehorario(): Observable<TipoHorario[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerTiposHorario");

    return this._http.get<TipoHorario[]>("http://localhost:8080/obtenerTiposHorario");
  }

  obtenerTiposContratacion(): Observable<TipoContratacion[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerTiposContratacion");

    return this._http.get<TipoContratacion[]>("http://localhost:8080/obtenerTiposContratacion");
  }

  obtenerModalidades(): Observable<ModalidadTrabajo[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerModalidades");

    return this._http.get<ModalidadTrabajo[]>("http://localhost:8080/obtenerModalidadesTrabajo");
  }

  publicarVacante(EmployerRequest: any){
    console.log("Proceso publicarVcanate");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    return this._http.put("http://localhost:8080/crearVacante", EmployerRequest).toPromise();

  }

  modificarVacante(EmployerRequest: any){
    console.log("Proceso modificarVacante");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    return this._http.put("http://localhost:8080/modificarVacante", EmployerRequest).toPromise();
  }

  

  getVacante(): Observable<Vacante> {
    return this.vacante$.asObservable();
  }

  guardarVacante(EmployerRequest: Vacante){
    this.vacante = EmployerRequest;
    this.vacante$.next(this.vacante);
  }

  cargarVacante(){
    this.vacante = this.vacante;
    this.vacante$.next(this.vacante);
  }

}
