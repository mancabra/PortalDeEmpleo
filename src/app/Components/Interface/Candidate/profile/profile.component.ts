import { Component, OnDestroy, OnInit } from '@angular/core';
import { Storage ,getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Administrador } from 'src/app/Services/Entity/administrador';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { Habilidad } from 'src/app/Services/Entity/habilidad';
import { Idioma } from 'src/app/Services/Entity/idioma';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { TipoContratacion } from 'src/app/Services/Entity/tipo-contratacion';
import { TipoHorario } from 'src/app/Services/Entity/tipo-horario';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  candidato: Candidato = new Candidato;
  empleador: Empleador = new Empleador;
  administrador: Administrador = new Administrador;
  empresa: Empresa = new Empresa;

  id_tipoUsuario: number = 0;
  empresas: Vacante[] = [];

  //varibale de input administrar
  vistaAdministrar: boolean = false;
  perfilTipoAdministrador: boolean = true;
  perfilTipoCandidato: boolean = true;
  perfilTipoEmpleador: boolean = true;
  perfilTipoEmpresa: boolean = true;

  imgPerfil:string[] = [];
  imgPortada:string[] = [];
  rutaCv: string  = "https://firebasestorage.googleapis.com/v0/b/gdi-portalempleo.appspot.com/o/documentos%2Fcv%2Fcuadernillo_MarcoAntonioCruz.pdf?alt=media&token=830f5a01-eb69-4d5e-8022-46f82fe929fe";
  rutaEspecialidad: string = "";

  idiomasUsuario: Idioma [] = [];
  habilidadesUsuario: Habilidad [] = [];
  

  constructor(private _CandidateRequest: CandidateService, private _UserRequest: InterfaceService, 
    private router: Router, private _EmployerRequest:EmployerService, private _firebaseII: Storage,) {

      //this.idiomasUsuario = [{ id_idioma: 0, nombreIdioma: "Ingles", candidatos: [] }, { id_idioma: 1, nombreIdioma: "aleman", candidatos: [] } ];
      //this.habilidadesUsuario = [{ id_habilidad: 0, nombreHabilidad: "nadar", candidatos: [] },{ id_habilidad: 1, nombreHabilidad: "volar", candidatos: [] }];
  }

  ngOnInit(): void {
   this.buscarUsuario();
    this.identificarTipoDePerfil();
  }

  ngOnDestroy(): void {
  }

  buscarUsuario() {
    this._UserRequest.obtener().then((data: any) => {
      if (data.usuario.tipoUsuario == 1) {
        this.administrador = data;
        this.id_tipoUsuario = 1
        console.log("admin");
      } else if (data.usuario.tipoUsuario == 2) {
        this.candidato = data;
        this.id_tipoUsuario = this.candidato.usuario.tipoUsuario;
        console.log("candidato");
      } else if (data.usuario.tipoUsuario == 3) {
        this.empleador = data;
        this.id_tipoUsuario = this.empleador.usuario.tipoUsuario;
        console.log("empleador");
      } else {
      
      }
      this.identificarTipoDePerfil();
    });
  }

  generarRuta(){
    if(this.id_tipoUsuario==1){
      const name = this.administrador.usuario.nombre +this.administrador.usuario.apellidoP+this.administrador.usuario.apellidoM;
      const ruta = `images${name}/perfil/`;
      const rutaII = `images${name}/portada/`;
      this.getImages(ruta,this.administrador.usuario.rutaImagenPerfil);
      this.getImagesPortada(rutaII,this.administrador.usuario.rutaImagenPortada);
    } else if (this.id_tipoUsuario==2){
      const name = this.candidato.usuario.nombre +this.candidato.usuario.apellidoP+this.candidato.usuario.apellidoM;
      const ruta = `images${name}/perfil/`;
      const rutaII = `images${name}/portada/`;
      this.getImages(ruta,this.candidato.usuario.rutaImagenPerfil);
      this.getImagesPortada(rutaII,this.candidato.usuario.rutaImagenPortada);
    } else if (this.id_tipoUsuario==3){
      const name = this.empleador.usuario.nombre +this.empleador.usuario.apellidoP+this.empleador.usuario.apellidoM;
      const ruta = `images${name}/perfil/`;
      const rutaII = `images${name}/portada/`;
      this.getImages(ruta,this.empleador.usuario.rutaImagenPerfil);
      this.getImagesPortada(rutaII,this.empleador.usuario.rutaImagenPortada);
    } else {
      const ruta = `images/perfil/`;
      const rutaII = `images/portada/`;
      this.getImages(ruta,"default.png");
      this.getImagesPortada(rutaII,"default.png");
    }
  }

  obtenerPublicaciones(){
    this._EmployerRequest.obtenerPublicaciones(this.empleador.id_empleador).subscribe(data => {
      //this.empresas = data;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var numero = 0;

        for (let index = 0; index < this.empresas.length; index++) {
          const element2 = this.empresas[index];
          
          if(element2.empresa.nombre == element.empresa.nombre){
            numero = numero +1;
          } else{

          }
        }

        if(numero == 0){
          this.empresas.push(element);
        } else {

        }  
      }
      console.log(this.empresas);
    });
  }

  modificarDatosPerfil() {
    this.router.navigate(['interface/perfil/modificar']);
  }

  identificarTipoDePerfil() {
    if (this.id_tipoUsuario == 1) {

      this.perfilTipoAdministrador = false;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = true;

    } else if (this.id_tipoUsuario == 2) {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = false;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = true;
      
      //this.obtenerEdad();
      this.rutaCv = this.candidato.rutaCv;
      this.habilidadesUsuario = this.candidato.habiliadades;
      this.idiomasUsuario = this.candidato.idiomas;

    } else if (this.id_tipoUsuario == 3) {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = false;
      this.perfilTipoEmpresa = true;

      this.obtenerPublicaciones();

    } else {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = false;
    }
    this.generarRuta();
  }

//FUNCION EDAD
  calcularEdad(fecha_nacimiento:Date) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}

obtenerEdad(){
  var edad = this.calcularEdad(this.candidato.fechaNacimiento);
  this.candidato.edad = edad;
}

  cerrarSesion() {
    this._UserRequest.hacerVisitante();
    this._UserRequest.guaradarCorreo("");
    this._UserRequest.LimpiarAlertas();
  }

  suspenderCuenta(){
    let id = 0;

    if(this.id_tipoUsuario == 1){
      id = this.administrador.usuario.id_usuario;
    } else if (this.id_tipoUsuario == 2){
      id = this.candidato.usuario.id_usuario;
    } else if (this.id_tipoUsuario == 3){
      id = this.empleador.usuario.id_usuario;
    } else {

    }

    const DTO = {
      id_usuario:id
    }
    
    this._CandidateRequest.suspenderCuenta(DTO).then((data: any) => {
      if (data.estatus == true) {
        alert("La cuenta ha sido suspendida");

      } else {
        alert("Algo Fallo");
      }
    });

  }

  getImages(ruta : any, nombre: string){
    const imageRef = ref(this._firebaseII,ruta);
    listAll(imageRef)
    .then( async response =>{
      console.log(response);
      this.imgPerfil = [];
      for( let item of response.items){
        const url = await getDownloadURL(item);
        if(item.name == nombre){
          this.imgPerfil.push(url);
        }
      }
    })
    .catch(error => console.log(error));
  }
  

  getImagesPortada(ruta : any, nombre: string){
    const imageRef = ref(this._firebaseII,ruta);
    listAll(imageRef)
    .then( async response =>{
      console.log(response);
      this.imgPortada = [];
      for( let item of response.items){
        const url = await getDownloadURL(item);
        if(item.name == nombre){
          this.imgPortada.push(url);
        }
      }
    })
    .catch(error => console.log(error));
  }

  

}
