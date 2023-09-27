import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Log } from '../Entity/log';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  id_administrador: any = 0;
  correo: string = "";

  // VARIABLE QUE ALMACENA UN USUARIO GENERAL
  usuario: any;
  // VARIABLE PARA EL OBSERVABLE DE TIPO USUARIO
  private usuario$ = new Subject<any>();

  // VARIABLE PARA OBSERVABLE DE TIPO STRING
  lista: string = ""
  // VARIABLE PARA EL OBSERVABLE DE TIPO STRING
  private lista$ = new Subject<string>();

  // VARIABLE PARA EL OBSERVABLE DE TIPO STRING
  private objeto$ = new Subject<any>();

  constructor(private _http: HttpClient) { }

  // FUNCION QUE PERMITE GUARDAR EL CORREO INGRESADO EN EL LOGIN EN UNA VARIABLE LOCAL
  guaradarCorreo(correo: any) {
    this.correo = correo;
    console.log(this.correo);
  }

  // FUNCION QUE PERMITE REGISTRAR UN ADMINISTRADOR
  registrar(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarAdministrador");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/registroAdministrador", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE REGISTRAR UN IDIOMA
  registrarIdioma(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarIdioma");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/crearIdioma", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE MODIFICAR UN IDIOMA
  modificarIdioma(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso modificarIdioma");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/modificarIdioma", AdminRequest).toPromise();
  }


  // FUNCION QUE PERMITE ELIMINAR UN IDIOMA
  eliminarIdioma(id: number) {
    let cadena = "app/eliminarIdioma/" + id;
    return this._http.delete(cadena).toPromise();
  }

  // FUNCION QUE PERMITE REGISTRAR UNA HABILIDAD
  registrarHabilidad(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarHabilidad");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/crearHabilidad", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE MODIFICAR UNA HABILIDAD
  modificarHabilidad(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso modificarHabilidad");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/modificarHabilidad", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE ELIMINAR UNA HABILIDAD
  eliminarHabilidad(id: number) {
    let cadena = "app/eliminarHabilidad/" + id;
    return this._http.delete(cadena).toPromise();
  }

  // FUNCION QUE PERMITE REGISTRAR UN HORARIO
  registrarHorario(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarHorario");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/crearTipoHorario", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE MODIFICAR UN HORARIO
  modificarHorario(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso modificarHorario");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/modificarTipoHorario", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE ELIMINAR UN HORARIO
  eliminarHorario(id: number) {
    let cadena = "app/eliminarTipoHorario/" + id;
    return this._http.delete(cadena).toPromise();
  }

  // FUNCION QUE PERMITE REGISTRAR UNA CONTRATACION
  registrarContratacion(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarContratacion");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/crearTipoContratacion", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE MODIFICAR UNA CONTRATACION
  modificarContratacion(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso modificarContratacion");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/modificarTipoContratacion", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE ELIMINAR UNA CONTRATACION
  eliminarContratacion(id: number) {
    let cadena = "app/eliminarTipoContratacion/" + id;
    return this._http.delete(cadena).toPromise();
  }

  // FUNCION QUE PERMITE REGISTRAR UNA MODALIDAD
  registrarModalidad(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso RegistrarModalidad");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/crearModalidadTrabajo", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE MODIFICAR UNA MODALIDAD
  modificarModalidad(AdminRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso modificarModalidad");
    console.log("Info Enviada");
    console.log(AdminRequest);

    return this._http.put("app/modificarModalidadTrabajo", AdminRequest).toPromise();
  }

  // FUNCION QUE PERMITE ELIMINAR UNA MODALIDAD
  eliminarModalidad(id: number) {
    let cadena = "app/eliminarModalidadTrabajo/" + id;
    return this._http.delete(cadena).toPromise();
  }

  // FUNCION QUE PERMITE ELIMINAR UN USUARIO
  eliminarUsuario(id_Usuario: number) {
    let cadena = "app/eliminarUsuario/" + id_Usuario;
    return this._http.delete(cadena).toPromise();
  }

  // FUNCION QUE PERMITE OBTENER UNA LISTA DE CANDIDATOS
  obtenerCandidatos(){
    console.log("Proceso obtener lista de candidatos");
    return this._http.get("app/obtenerListaCandidatos").toPromise();
  }

  // FUNCION QUE PERMITE OBTENER UNA LISTA DE CANDIDATOS ACTIVOS
  obtenerCandidatosFActivos(){
    console.log("Proceso obtener lista de candidatos activos");
    return this._http.get("app/obtenerListaCandidatosActivos").toPromise();
  }

  // FUNCION QUE PERMITE OBTENER UNA LISTA DE CANDIDATOS INACTIVOS
  obtenerCandidatosFInactivos(){
    console.log("Proceso obtener lista de candidatos inactivos");
    return this._http.get("app/obtenerListaCandidatosInactivos").toPromise();
  }

  // FUNCION PARA OBTENER LA LISTA DE EMPLEADORES
  obtenerEmpleadores(){
    console.log("Proceso obtenerEmpleadores");
    return this._http.get("app/obtenerListaEmpleadores").toPromise();
  }

   // FUNCION PARA OBTENER LA LISTA DE EMPLEADORES ACTIVOS
   obtenerEmpleadoresFActivos(){
    console.log("Proceso obtenerEmpleadoresActivos");
    return this._http.get("app/obtenerListaEmpleadoresActivos").toPromise();
  }
   // FUNCION PARA OBTENER LA LISTA DE EMPLEADORES INACTIVOS
   obtenerEmpleadoresFInactivos(){
    console.log("Proceso obtenerEmpleadoresInactivos");
    return this._http.get("app/obtenerListaEmpleadoresInactivos").toPromise();
  }

  // FUNCION OBTENER LOG
  obtenerLog():Observable<Log[]>{
    console.log("Proceso obtenerLog") 
    return this._http.get<Log[]>("app/obtenerListaProcesos");
  }
  // FUNCION PARA BUSCAR UN USUARIO A GESTIONAR
  obtenerPorCorreo(mail: string) {
    console.log("Proceso buscarUsuarioPorCorreo");
    console.log("Info Enviada");
    console.log(mail);

    let cadena = "app/obtenerUsuarioCompleto/" + mail;
    return this._http.get(cadena).toPromise();
  }

  // FUNCION PARA OBSERVABLE DE USUARIO
  getUsuario(): Observable<any> {
    return this.usuario$.asObservable();
  }

  // FUNCNION QUE ENVIA UNA ACTUALIZACION A LOS ELEMENTOS QUE SE SUSCRIBIERON AL OBSERVABLE 
  usuarioActivo(usuario: any) {
    this.usuario$.next(usuario);
  }

  // FUNCION PARA OBSERVABLE DE STRING
  getLista(): Observable<string> {
    return this.lista$.asObservable();
  }

  // FUNCNION QUE ENVIA UNA ACTUALIZACION A LOS ELEMENTOS QUE SE SUSCRIBIERON AL OBSERVABLE 
  listaActiva(listaActiva: string) {
    this.lista = listaActiva
    this.lista$.next(this.lista);
  }


  // FUNCION PARA OBSERVABLE DE ADMin
  getObjeto(): Observable<any> {
    return this.objeto$.asObservable();
  }

  cambiarVista(objeto: any){
    this.objeto$.next(objeto);
  }

}
