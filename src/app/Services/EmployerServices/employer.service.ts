import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../Entity/empresa';
import { TipoHorario } from '../Entity/tipo-horario';
import { TipoContratacion } from '../Entity/tipo-contratacion';
import { ModalidadTrabajo } from '../Entity/modalidad-trabajo';
import { Empleador } from '../Entity/empleador';
import { Vacante } from '../Entity/vacante';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  id_empleador: any = 0;
  correo: string = "";

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

  obtenerPublicaciones(EmployerRequest: any): Observable<Vacante[]> {
    console.log("Proceso obtener publicaciones");
    console.log("Info Enviada");
    console.log(EmployerRequest);

    let cadena ="http://localhost:8080/obtenerVacantesPorIdEmpleador/" + EmployerRequest;

    return this._http.get<Vacante[]>(cadena);
  }

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

}
