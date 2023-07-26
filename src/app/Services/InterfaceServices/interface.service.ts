import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  usuario:any = "";
  private usuario$ = new Subject<any>();
  online:boolean = true;

  constructor(private _http: HttpClient) { }

  ngOnInit(){
    //this.esVisitante();
    this.cargarUsuario("a");
  }

  esVisitante(){
    const USUARIO ={
      tipoUsuario:0,
    }
      this.usuario = USUARIO;
      console.log(this.usuario);
  }

  //INICIO DE SESION
  login(userRequest: any) {
    return this._http.post("http://localhost:8080/Login", userRequest).toPromise();
  }

  // OBTENER INFORMACION POR CORREO
  userData(userRequest: string) {
    let cadena = "http://localhost:8080/obtenerUsuario/" + userRequest;
    return this._http.get(cadena).toPromise();
  }

  cargarUsuario(mail:string){
    this.userData(mail).then((data:any) =>{
      this.usuario = data;
    });
  
    this.usuario$.next(this.usuario);
  }

  esparcirUsuario(){
    if (this.usuario == ""){
      
      const USUARIO ={
        id_usuario: 15,
        nombre:"Ramon",
        //------
        edad:26,
        profesion:"Desarrollador",
        id_candidato:1,
        //------
        correoElectronico:"ramon2@gmail.com",
        contraseña:"password",
        tipoUsuario:2,
        apellidoP:"Serrano",
        apellidoM:"Gamez",
        telefono:"(+52)48-95-67-34-12",
        estatusUsuario:true,
           //------
           domicilio:"C.Pinos N.447 Col.Nuevo Mundo",
           estado:{id_estado:1,nombreEstado:"México"},
           municipio:{id_municipio:1,nombreMunicipio:"Acolman",id_estado:1},
           //------
        descripcion:"Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
        +"ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
        +"Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
        +"ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
        +"Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui",
        
      }
      this.usuario = USUARIO;
      }
      this.usuario$.next(this.usuario);
  }

  getUser():Observable<any>{
    return this.usuario$.asObservable();
  }



}
