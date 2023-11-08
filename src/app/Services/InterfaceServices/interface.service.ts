import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Municipio } from '../Entity/municipio';
import { Estado } from '../Entity/estado';
import { CandidateService } from '../CandidateServices/candidate.service';
import { AdminService } from '../AdminServices/admin.service';
import { EmployerService } from '../EmployerServices/employer.service';
import { Candidato } from '../Entity/candidato';
import { Alert } from '../Entity/alert';
import { Vacante } from '../Entity/vacante';

@Injectable({
  providedIn: 'root'
})

export class InterfaceService {

  // RUTA UTILIZADA PARA LOS POPUPS DE ERROR
  rutaTriste: String = "../assets/triste.png";
  // RUTA UTILIZADA PARA LOS POPUPS DE EXITO
  rutaFeliz: String = "../assets/feliz.png";

  usuario: Candidato = new Candidato;
  correo: string = "";

  // OBSERVABLE NOTIFICACIONES
  private alerts$ = new Subject<any>();
  alertas: any = [];

  private nav$ = new Subject<boolean>();
  ocultarNav: boolean = false;

  private vacante$ = new Subject<Vacante>();

  // OBSERVABLES ALERTAS
  private estatus$ = new Subject<boolean>();
  alertaOculta: boolean = true;

  private alerta$ = new Subject<Alert>();
  alerta: Alert = new Alert;

  private tipo$ = new Subject<number>();
  tipoUsuario: number = 0;


  private pantalla$ = new Subject<boolean>();
  pantalla: boolean = true;

   // INYECCION DE SERVICOS A USAR EN EL SERVICIO
  constructor(
    private _http: HttpClient,
    private _CandidateRequest: CandidateService,
    private _AdminRequest: AdminService,
    private _EmployerRequest: EmployerService) { 

    }

  ngOnInit() {

  }

  //INICIO DE SESION
  login(userRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso ligin");
    console.log("Info Enviada");
    console.log(userRequest);

    return this._http.post("app/Login", userRequest).toPromise();
  }

  // GUARDAR ATRIBUTOS
  modificar(usuarioDTO: any) {
    //prueba de funcionamiento
    console.log("Proceso ModificarUsuario");
    console.log("Info Enviada");
    console.log(usuarioDTO);

    return this._http.put("app/modificarUsuario", usuarioDTO).toPromise();
  }

  //FUNCION PARA OBTENER UN USUARIO POR OCRREO
  obtener() {
    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(this.correo);

    let cadena = "app/obtenerUsuarioCompleto/" + this.correo;
    return this._http.get(cadena).toPromise();
  }

  // FUNCION QUE PERMITE GUARDAR EL CORREO INGRESADO EN EL LOGIN EN UNA VARIABLE LOCAL
  // HACE UN LLAMADO A LA FUNCION QUE GUARDA LOS CORREOS EN LOS OTROS SERVICIOS 
  guaradarCorreo(correo: any) {
    this.correo = correo;
    this._AdminRequest.guaradarCorreo(correo);
    this._CandidateRequest.guaradarCorreo(correo);
    this._EmployerRequest.guaradarCorreo(correo);
  }

  // FUNCION QUE PERMITE OBTENER LOS ESTADOS DE BD
  obtenerEstados(): Observable<Estado[]> {
    //prueba de funcionamiento
    console.log("Proceso obtenerEstados");

    return this._http.get<Estado[]>("app/obtenerListaEstados");
  }

  // FUNCION QUE PERMITE OBTENER LOS MUNICIPIOS DE BD
  obtenerMunicipios(idRequest: number): Observable<Municipio[]> {
    console.log("Proceso obtenerMunicipios");
    console.log("Info Enviada");
    console.log(idRequest);
    let cadena = "app/obtenerMunicipiosDeEstado/" + idRequest;

    return this._http.get<Municipio[]>(cadena);
  }

  // OBSERVABLE TIPO NOTIFICACIONES
  getAlerts(): Observable<any> {
    return this.alerts$.asObservable();
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  esparcirAlertas() {
    //this.alertas.reverse();
    this.alerts$.next(this.alertas);
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  agregarAlerta(alert: any) {
    this.alertas.push(alert);
    this.alerts$.next(this.alertas);
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  LimpiarAlertas() {
    this.alertas = [];
    this.alerts$.next(this.alertas);
  }

  //OBSERVABLES TIPO BOOLEAN
  getNavBar(): Observable<boolean> {
    return this.nav$.asObservable();
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  ocultarNavB() {
    this.ocultarNav = true;
    this.nav$.next(this.ocultarNav);
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  mostarNav() {
    this.ocultarNav = false;
    this.nav$.next(this.ocultarNav);
  }

  //OBSERVABLES TIPO USUARIO
  getTipoUsuario(): Observable<number> {
    return this.tipo$.asObservable();
  }

  // FUNCION PARA SUSCRIBIRSE A UN OBSERVABLE
  cambiartipo() {
    this.obtener().then((data: any) => {
      this.tipoUsuario = data.usuario.tipoUsuario;
      this.usuarioActivo(this.tipoUsuario);
    });
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  usuarioActivo(tipo: number) {
    this.tipo$.next(tipo);
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  hacerVisitante() {
    this.tipoUsuario = 0;
    this.tipo$.next(this.tipoUsuario);
  }

  //OBSERVABLE ALERTAS PANTALLA
  getEstadoAlerta(): Observable<boolean> {
    return this.estatus$.asObservable();
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  activarAlerta() {
    this.alertaOculta = false;
    this.estatus$.next(this.alertaOculta);
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  desactivarAlerta() {
    this.alertaOculta = true;
    this.estatus$.next(this.alertaOculta);
  }

  // FUNCION PARA OBSERVABLE DE ALERTA
  getAlerta(): Observable<Alert> {
    return this.alerta$.asObservable();
  }

  //FUNCION QUE ENVIA UNA ACTUALIZACION A TODOS LOS COMPONENTES QUE SE SUSCRIBIERON A ESTE OBSERVABLE
  cargarAlerta(alerta: any) {
    this.alerta.error = alerta.error;
    this.alerta.mss = alerta.mss;
    if (this.alerta.error == true) {
      this.alerta.ruta = this.rutaTriste;
      this.alerta.color = "rgb(97, 34, 50)";
      this.alerta.name = "LO SENTIMOS"
    } else {
      this.alerta.ruta = this.rutaFeliz;
      this.alerta.color = "rgb(50, 90, 79)";
      this.alerta.name = "¡TODO LISTO!";
    }
    this.alerta$.next(this.alerta);
  }

   //OBSERVABLES TIPO VACANTE
   getVacante(): Observable<Vacante> {
    return this.vacante$.asObservable();
  }

  vacante: Vacante = new Vacante
  actualizarVacante(vacante:Vacante){
    this.vacante = vacante
    this.vacante$.next(this.vacante);
  }


  getBoolean():Observable<boolean> {
    return this.pantalla$.asObservable();
  }

  actualizarPantalla(pantalla:boolean){
    this.pantalla$.next(true);
  }
}
