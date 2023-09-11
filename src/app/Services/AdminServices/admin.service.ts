import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  // FUNCION QUE PERMITE ELIMINAR UN USUARIO
  eliminarUsuario(id_Usuario:number){
    let cadena = "app/eliminarUsuario/"+id_Usuario;
    return this._http.delete(cadena).toPromise();
  }

  // FUNCION PARA BUSCAR UN USUARIO A GESTIONAR
  obtenerPorCorreo(mail:string) {
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
  usuarioActivo(usuario:any){
    this.usuario$.next(usuario);
  }
}
