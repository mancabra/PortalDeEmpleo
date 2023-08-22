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
  correo: string  = "";

  private alerts$ = new Subject<any>();
  alertas: any = [];

  private nav$ = new Subject<boolean>();
  ocultarNav: boolean = false;

  private tipo$ = new Subject<number>();
  tipoUsuario:number = 0;

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

  obtener() {
    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(this.correo);

    let cadena = "http://localhost:8080/obtenerUsuarioCompleto/" + this.correo;
    return this._http.get(cadena).toPromise();
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
    this.alertas.reverse();
    this.alerts$.next(this.alertas);
  }

  agregarAlerta(alert: any) {
    this.alertas.push(alert).reverse();
    this.alerts$.next(this.alertas);
  }

  LimpiarAlertas() {
    this.alertas = [];
    this.alerts$.next(this.alertas);
  }

  getNavBar(): Observable<boolean> {
    return this.nav$.asObservable();
  }

  ocultarNavB() {
    this.ocultarNav = true;
    this.nav$.next(this.ocultarNav);
  }

  mostarNav(){
    this.ocultarNav = false;
    this.nav$.next(this.ocultarNav);
  }

  //OBSERVABLES TIPO USUARIO

  getTipoUsuario(): Observable<number> {
    return this.tipo$.asObservable();
  }

  cambiartipo() {
    this.obtener().then((data:any) =>{
      this.tipoUsuario = data.usuario.tipoUsuario;
      this.usuarioActivo(this.tipoUsuario);
    });
 
  }

  usuarioActivo(tipo:number){
    this.tipo$.next(tipo);
  }

  hacerVisitante(){
    this.tipoUsuario = 1;
    this.tipo$.next(this.tipoUsuario);
  }

}
