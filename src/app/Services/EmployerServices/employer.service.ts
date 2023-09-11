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

  // VARIABLE QUE ALMACENA UNA VACANTE
  vacante: Vacante = new Vacante;
  // VARIABLE PARA EL OBSERVABLE DE TIPO VACANTE
  private vacante$ = new Subject<Vacante>();

  // VARIABLE QUE ALMACENA UNA LISTA DE EMPRESAS
  empresas: Empresa[] = [];
  // VARIABLE PARA EL OBSERVABLE DE TIPO EMPRESAS
  private empresas$ = new Subject<Empresa[]>();

  constructor(private _http: HttpClient) { }

  // FUNCION QUE PERMITE GUARDAR EL CORREO INGRESADO EN EL LOGIN EN UNA VARIABLE LOCAL
  guaradarCorreo(correo: any) {
    this.correo = correo;
    console.log(this.correo);
  }

  // FUNCION QUE PERMITE REGISTRAR UN EMPLEADOR
  registrar(EmployerRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarEmpleador");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    return this._http.put("app/registroEmpleador", EmployerRequest).toPromise();
  }

  // FUNCION QUE PERMITE BUSCAR UN EMPLEADOR
  obtener() {
    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(this.correo);

    let cadena = "app/obtenerUsuarioCompleto/" + this.correo;
    return this._http.get<Empleador>(cadena).toPromise();
  }

  // OBTENER PUBLICACIONES DE EMPLEADOR
  obtenerPublicaciones(EmployerRequest: any): Observable<Vacante[]> {
    console.log("Proceso obtener publicaciones");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    let cadena = "app/obtenerVacantesPorIdEmpleador/" + EmployerRequest;

    return this._http.get<Vacante[]>(cadena);
  }

  // OBTENER CANDIDATOS DE LA VACANTE
  ontenerCandidatosVacante(EmployerRequest: number): Observable<Candidato[]> {
    console.log("Proceso obtener CandidatosVacante");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    let cadena = "app/obtenerCandidatosVacante/" + EmployerRequest;
    return this._http.get<Candidato[]>(cadena);
  }

   // FUNCION QUE PERMITE CAMBIAR EL ESTADO DE UN CANDIDATO EN UNA POSTULACION
  aceptarCandidato(EmployerRequest: any) {
    console.log("Proceso obtener Aceptarcandidato");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    return this._http.put("app/aceptarPostulacion", EmployerRequest).toPromise();
  }

  // ELIMINAR VACANTE
  eliminarVacante(EmployerRequest: number) {
    console.log("Proceso eliminarVacante");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    let cadena = "app/eliminarVacante/" + EmployerRequest;

    return this._http.delete(cadena).toPromise();
  }

  // OBTENER EMPRESAS
  obtenerEmpresas(): Observable<Empresa[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerEmpresas");

    return this._http.get<Empresa[]>("app/obtenerListaEmpresas");
  }

  // FUNCION QUE PERMITE OBTENER LOS TIPOS DE HORARIO REGISTRADOS EN BD
  obtenerTiposDehorario(): Observable<TipoHorario[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerTiposHorario");

    return this._http.get<TipoHorario[]>("app/obtenerTiposHorario");
  }

  // FUNCION QUE PERMITE OBTENER LOS TIPOS DE CONTRATACION REGISTRADOS EN BD
  obtenerTiposContratacion(): Observable<TipoContratacion[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerTiposContratacion");

    return this._http.get<TipoContratacion[]>("app/obtenerTiposContratacion");
  }

  // FUNCION QUE PERMITE OBTENER LOS TIPOS DE MODALIDAD REGISTRADOS EN BD
  obtenerModalidades(): Observable<ModalidadTrabajo[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerModalidades");

    return this._http.get<ModalidadTrabajo[]>("app/obtenerModalidadesTrabajo");
  }

  // FUNCION QUE PERMITE PUBLICAR UNA VACANTE 
  publicarVacante(EmployerRequest: any) {
    console.log("Proceso publicarVcanate");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    return this._http.put("app/crearVacante", EmployerRequest).toPromise();

  }

   // FUNCION QUE PERMITE MODIFICAR UNA VACANTE 
  modificarVacante(EmployerRequest: any) {
    console.log("Proceso modificarVacante");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    return this._http.put("app/modificarVacante", EmployerRequest).toPromise();
  }

  // FUNCION QUE PERMITE PROGRAMAR UNA VACANTE 
  programarVacante(EmployerRequest: any) {
    console.log("Proceso programarVacante");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    return this._http.put("app/crearVacante", EmployerRequest).toPromise();
  }

  // OBSERVABLE DE VACANTE
  getVacante(): Observable<Vacante> {
    return this.vacante$.asObservable();
  }

  guardarVacante(EmployerRequest: Vacante) {
    this.vacante = EmployerRequest;
    this.cargarVacante();
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  cargarVacante() {
    this.vacante = this.vacante;
    this.vacante$.next(this.vacante);
  }

  // OBSERVABLE DE EMPRESAS
  getEmpresas(): Observable<Empresa[]> {
    return this.empresas$.asObservable();
  }

  // FUINCION PARA OBTENER LAS EMPRESAS DE BASE DE DATOS
  obtenerEmpresasOb() {
    this.obtenerEmpresas().subscribe(data => {
      this.empresas = data;
      this.cargarEmpresas(this.empresas);
    });
  }
 
  //FUNCION QUE ENVIA UNA ACTUALIZACION A LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  cargarEmpresas(empresas:Empresa[]){
    this.empresas$.next(empresas);
  }
}
