import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  usuario: any = "";
  correo:string ="";

  private usuario$ = new Subject<any>();
  private alerts$ = new Subject<any>();
  alertas: any = [];
  online: boolean = true;

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    //this.esVisitante();
    this.cargarUsuario("a");
  }

  esVisitante() {
    const USUARIO = {
      tipoUsuario: 0,
    }
    this.usuario = USUARIO;
    console.log(this.usuario);
  }

  //INICIO DE SESION
  login(userRequest: any) {
    //prueba de funcionamiento
    console.log("Proceso ligin");
    console.log("Info Enviada");
    console.log(userRequest);

    return this._http.post("http://localhost:8080/Login", userRequest).toPromise();
  }

  // OBTENER INFORMACION POR CORREO
  userData(userRequest: string) {
    //prueba de funcionamiento
    console.log("Proceso obtenerUsuario");
    console.log("Info Enviada");
    console.log(userRequest);

    let cadena = "http://localhost:8080/obtenerUsuario/" + userRequest;
    return this._http.get(cadena).toPromise();
  }

  cargarUsuario(mail: string) {
    //prueba de funcionamiento
    console.log("Proceso cargarUsuario");
    console.log("Info Enviada");
    console.log(mail);

    this.userData(mail).then((data: any) => {
      this.usuario = data;
      console.log("Estatus de usuario");
      console.log(this.usuario);

    });

    this.usuario$.next(this.usuario);
  }

  esparcirUsuario() {
    console.log("Esparcir usuario");
    if (this.usuario == "") {

      const USUARIO = {
        id_usuario: 15,
        nombre: "Ramon",
        //------
        edad: 26,
        profesion: "Desarrollador",
        id_candidato: 1,
        //------
        correoElectronico: "ramon2@gmail.com",
        contraseña: "password",
        tipoUsuario: 2,
        apellidoP: "Serrano",
        apellidoM: "Gamez",
        telefono: "(+52)48-95-67-34-12",
        estatusUsuario: true,
        //------
        domicilio: "C.Pinos N.447 Col.Nuevo Mundo",
        estado: { id_estado: 1, nombreEstado: "México" },
        municipio: { id_municipio: 1, nombreMunicipio: "Acolman", id_estado: 1 },

        centroEducativo: "UAM Azcapotzalco",
        puestoActual: "Programador Jr",
        //------
        descripcion: "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
          + "ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
          + "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
          + "ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
          + "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui",

      }
      this.usuario = USUARIO;

    } else if(this.usuario == null){

    } else{

    }

    this.usuario$.next(this.usuario);
  }

  guaradarCorreo(correo:any){
    this.correo = correo;
    console.log(this.correo);
  }

  getUser(): Observable<any> {
    return this.usuario$.asObservable();
  }

  buscarUsuario(){
    console.log("Proceso buscarUsuario");
    console.log("Info Enviada");
    console.log(this.correo);

    let cadena = "http://localhost:8080/obtenerUsuario/" + this.correo;
    return this._http.get(cadena).toPromise();
  }

  actualizarUsuario(usuario:any){
    this.usuario = usuario;
    console.log(this.usuario);
    this.usuario$.next(this.usuario);
  }

  obtenerEstados() {
    //prueba de funcionamiento
    console.log("Proceso obtenerEstados");
    
    return this._http.get("http://localhost:8080/obtenerListaEstados").toPromise();
  }

  obtenerMunicipios(idRequest: number):Observable<any> {
    console.log("Proceso obtenerMunicipios");
    console.log("Info Enviada");
    console.log(idRequest);
    let cadena = "http://localhost:8080/botenerMunicipiosDeEstado/" + idRequest;
    return this._http.get<any>(cadena);
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
