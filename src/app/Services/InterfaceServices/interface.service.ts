import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Municipio } from '../Entity/municipio';
import { Estado } from '../Entity/estado';
import { CandidateService } from '../CandidateServices/candidate.service';
import { AdminService } from '../AdminServices/admin.service';
import { EmployerService } from '../EmployerServices/employer.service';
import { Candidato } from '../Entity/candidato';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  usuario:Candidato = new Candidato;
  correo: string  = "ramon@gmail.com";

  private alerts$ = new Subject<any>();
  

  alertas: any = [];
  //online: boolean = true;

  constructor(private _http: HttpClient,
              private _CandidateRequest: CandidateService,
              private _AdminRequest: AdminService,
              private _EmployerRequest: EmployerService) { }

  ngOnInit() {

  }

  //INICIO DE SESION
  login(userRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso ligin");
    console.log("Info Enviada");
    console.log(userRequest);

    return this._http.post("http://localhost:8080/Login", userRequest).toPromise();
  }

  guaradarCorreo(correo:any){
    this.correo = correo ;
    this._AdminRequest.guaradarCorreo(correo);
    this._CandidateRequest.guaradarCorreo(correo);
    this._EmployerRequest.guaradarCorreo(correo);
  }

  obtenerEstados():Observable<Estado[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerEstados");

    return this._http.get<Estado[]>("http://localhost:8080/obtenerListaEstados");
  }

  obtenerMunicipios(idRequest: number):Observable<Municipio[]> {
    console.log("Proceso obtenerMunicipios");
    console.log("Info Enviada");
    console.log(idRequest);
    let cadena = "http://localhost:8080/obtenerMunicipiosDeEstado/" + idRequest;
    return this._http.get<Municipio[]>(cadena);
  }

  // arreglo alertas
  getAlerts(): Observable<any> {
    return this.alerts$.asObservable();
  }

  esparcirAlertas() {
    this.alerts$.next(this.alertas);
  }

  agregarAlerta(alert: any) {

    this.alertas.push(alert);
    this.alerts$.next(this.alertas);
  }

}
