import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Administrador } from 'src/app/Services/Entity/administrador';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { Estado } from 'src/app/Services/Entity/estado';
import { Habilidad } from 'src/app/Services/Entity/habilidad';
import { Idioma } from 'src/app/Services/Entity/idioma';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  // VARIABLES QUE LAMACENAN EL USUARIO QUE ABRIO EL PERFIL
  candidato: Candidato = new Candidato;
  administrador: Administrador = new Administrador;
  empresa: Empresa = new Empresa;
  empleador: Empleador = new Empleador;
  // VARIABLE QUE ALMACENA LAS EMPRESA PARA LAS QUE TRABAJA UN EMPLEADOR
  empresas: Vacante[] = [];

  // VARIABLE DE USUARIO GENERAL
  usuario: any;

  // VARIABLE QUE PERMITE IDIENTIFICAR DESDE QUE VISTA SE ABRE EL COMPONENTE
  @Input() vistaAdministrar: boolean = false;

  // VARIABLE QUE PERMITE AL COMPONENTE IDENTIFICAR QUE TIPO DE USUARIO ABRE EL PERFIL
  //  id_tipoUsuario 0 INDEFINIDO
  //  id_tipoUsuario 1 ADMINISTRADORES
  //  id_tipoUsuario 2 CANDIDATOS
  //  id_tipoUsuario 3 EMPLEADORES
  id_tipoUsuario: number = 0;

  // VARIABLES QUE PERMITEN OCULTAR ELEMENTOS DE LA VISTA HTML DEPENDIENDO DEL TIPO DE PERFIL
  perfilTipoAdministrador: boolean = true;
  perfilTipoCandidato: boolean = true;
  perfilTipoEmpleador: boolean = true;
  perfilTipoEmpresa: boolean = true;
  usuarioActivo: boolean = true;

  // VECTOR PARA ALMACENAR LAS IMAGENES DE PERFIL DEL USUARIO
  imgPerfil: string[] = [];
  // VECTOR PARA ALMACENAR LAS IMAGENES DE PORTADA DEL USUARIO
  imgPortada: string[] = [];
  // VARIABLE PARA ALMACENAR LA RUTA DEL CV DEL CANDIDATO
  rutaCv: string = "";
  // VARIABLE PARA ALMACENAR LA RUTA DEL ARCHIVO DE ESPECIALIDAD DEL CANDIDATO
  rutaEspecialidad: string = "";
  rutaEspecialidadII: string = "";
  rutaEspecialidadIII: string = "";

  // VECTOR QUE ALMACENA LOS IDIOMAS REGISTRADOS DE UN CANDIDATO
  idiomasUsuario: Idioma[] = [];
  // VECTOR QUE ALMACENAS LAS HABILIDADES REGISTRADAS DE UN CANDIDATO
  habilidadesUsuario: Habilidad[] = [];

  // VARIABLE PARA LA SUSCRIPCION A UN OBSERVABLE
  subscription: Subscription;

  // VECTORES PARA ARCHIVOS
  documentosCV: string[] = [];
  documentosEsp: any [] = [];

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _CandidateRequest: CandidateService,
    private _UserRequest: InterfaceService,
    private _AdminRequest: AdminService,
    private _EmployerRequest: EmployerService,
    private _firebaseII: Storage,
    private router: Router) {

    // SUSCRIPCION AL OBSERVABLE DE UN SERVICIO PARA OBTENER UN USUARIO
    this.subscription = this._AdminRequest.getUsuario().subscribe(data => {
      console.log(this.usuario)
      this.usuario = data;
      this.identificarVista();
    });
  }

  ngOnInit(): void {
    
    this.documentosEsp = [];
    this.documentosCV = [];
    this.identificarVista();
    /*
    this.cargarPrueba();
    this.id_tipoUsuario = 2;
    this.identificarTipoDePerfil();
    this.predeterminadas();
    */
  }

  cargarPrueba() {
    this.candidato = {
    //this.empleador = {
      id_candidato:0,
      //id_empleador:0,
    edad:25,
      domicilio:"C. Alcatraz",
      puestoActual:"Diseñador",
      descripcion:"Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web",
      centroEducativo:"UAM: Azcapotzalco",
      rutaCv:"Untitled-2.pdf",
    usuario:{
        id_usuario: 0,
        nombre: "Ramiro",
        correoElectronico: "mancabra97@gmail.com",
        contrasena: "1234556",
        tipoUsuario: 2,
        apellidoP: "Lopez",
        apellidoM: "Gastelum",
        telefono: "+52 5514098249",
        estatusUsuario: true,
        rutaImagenPerfil: "pR3d3tErm1n4d4IMGP3rf1l.jpg",
        rutaImagenPortada: "pR3d3tErm1n4d4IMGP0rt4dA.jpg",
      },
      vacantes:[],
      idiomas:[
        {id_idioma:0,nombreIdioma:"ingles",candidatos:[]},
        {id_idioma:0,nombreIdioma:"ingles",candidatos:[]},
        {id_idioma:0,nombreIdioma:"ingles",candidatos:[]},
        {id_idioma:0,nombreIdioma:"ingles",candidatos:[]},
        {id_idioma:0,nombreIdioma:"ingles",candidatos:[]},
      ],
      municipio:{id_municipio:0,nombreMunicipio:"talxacala",estado:new Estado},
      estado:{id_estado:1,nombreEstado:"tlaxcala",municipios:[]},
      profesion:"DISEÑADOR",
      fechaNacimiento:new Date,
      habilidades:[
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
        {id_habilidad:0,nombreHabilidad:"trabajo en equipo", candidatos:[]},
      ],
      rutaEspecialidad:"Untitled-2.pdf",
      descripcionEspecialidad1: "Especialidad en NanoCiencia",
      rutaEspecialidad2:"Untitled-2.pdf",
      descripcionEspecialidad2: "Especialidad en CyberSerguridad",
      rutaEspecialidad3:"Untitled-2.pdf",
      descripcionEspecialidad3: "Especialidad en marketing digital",
    }
  }

  // FUNCION PARA DESACTIVAR UNA SUSCRIPCION
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // FUNCION PARA IDENTIFICAR EL FLUJO A SEGUIR SEGUN EL COMPONENTE QUE HAGA USO DE ESTE COMPONENTE
  identificarVista() {
    if (this.vistaAdministrar == true) {
      this.busquedaDeAdmin();
    } else {
      this.buscarUsuario();
    }
  }

  // FUNCION PARA IDENTIFICAR EL TIPO DE PERFIL SEGUN EL OBSERVABLE DE USUARIO 
  busquedaDeAdmin() {
    this.documentosCV = [];
    this.documentosEsp  =[]; 
    if (this.usuario.usuario.tipoUsuario == 1) {
      this.administrador = this.usuario;
      this.id_tipoUsuario = this.administrador.usuario.tipoUsuario
      this.usuarioActivo = this.administrador.usuario.estatusUsuario;
      console.log("admin");
    } else if (this.usuario.usuario.tipoUsuario == 2) {
      this.candidato = this.usuario;
      this.id_tipoUsuario = this.candidato.usuario.tipoUsuario;
      this.usuarioActivo = this.candidato.usuario.estatusUsuario;
      console.log("candidato");
    } else if (this.usuario.usuario.tipoUsuario == 3) {
      this.empleador = this.usuario;
      this.id_tipoUsuario = this.empleador.usuario.tipoUsuario;
      this.usuarioActivo = this.empleador.usuario.estatusUsuario;
      console.log("empleador");
    } else {

    }
    this.identificarTipoDePerfil();
    this.predeterminadas();
  }


  // FUNCION PARA OBTENER EL USUARIO DESCE BASE DE DATOS
  buscarUsuario() {
    this._UserRequest.obtener().then((data: any) => {
      if (data.usuario.tipoUsuario == 1) {
        this.administrador = data;
        this.id_tipoUsuario = this.administrador.usuario.tipoUsuario
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
      this.predeterminadas();
    });
  }

  predeterminadas(){
    if(this.id_tipoUsuario == 1){
      this.evaluarAdmin();
    } else if(this.id_tipoUsuario == 2){
      this.evaluarCandidato();
    } else if(this.id_tipoUsuario == 3){
      this.evaluarEmpleador();
    } else {

    }
    this.generarRuta();
  }

  evaluarCandidato(){
    const usuario = this.candidato.usuario.nombre + this.candidato.usuario.apellidoP + this.candidato.usuario.apellidoM;
    const ruta = `images${usuario}/perfil/`;
    const imagenPerfil = this.candidato.usuario.rutaImagenPerfil;
    //const imagenPerfil = "pR3d3tErm1n4d4IMGP3rf1l.jpg"
    this.obtenerPerfil(imagenPerfil,ruta);
    const rutaII = `images${usuario}/portada/`;
    const imagenPortada =  this.candidato.usuario.rutaImagenPortada;
    //const imagenPortada = "pR3d3tErm1n4d4IMGP0rt4dA.jpg"
    this.obtenerPortada(imagenPortada,rutaII);
  }

  evaluarEmpleador(){
    const usuario = this.empleador.usuario.nombre + this.empleador.usuario.apellidoP + this.empleador.usuario.apellidoM;
    const ruta = `images${usuario}/perfil/`;
    const imagenPerfil = this.empleador.usuario.rutaImagenPerfil;
    this.obtenerPerfil(imagenPerfil,ruta);
    const rutaII = `images${usuario}/portada/`;
    const imagenPortada =  this.empleador.usuario.rutaImagenPortada;
    this.obtenerPortada(imagenPortada,rutaII);
  }

  evaluarAdmin(){
    const usuario = this.administrador.usuario.nombre + this.administrador.usuario.apellidoP + this.administrador.usuario.apellidoM;
    const ruta = `images${usuario}/perfil/`;
    const imagenPerfil = this.administrador.usuario.rutaImagenPerfil;
    this.obtenerPerfil(imagenPerfil,ruta);
    const rutaII = `images${usuario}/portada/`;
    const imagenPortada =  this.administrador.usuario.rutaImagenPortada;
    this.obtenerPortada(imagenPortada,rutaII);
  }

  obtenerPortada(name:string, ruta: string){
    if(name == "pR3d3tErm1n4d4IMGP0rt4dA.jpg"){
      const predeterminada = `images/portada/`;
      this.getImagesPortada(predeterminada, name);
    } else {
      this.getImagesPortada(ruta, name);
    }
  }

  obtenerPerfil(name:string, ruta: string){
    if(name == "pR3d3tErm1n4d4IMGP3rf1l.jpg"){
      const predeterminada = `images/perfil/`;
      this.getImages(predeterminada, name);
    } else {
      this.getImages(ruta, name);
    }
  }

  // FUNCION PARA GENERAR LAS RUTAS DE DESCARGA PARA IMAGENES Y ARCHIVOS SEGUN LOS DATOS DEL USUARIO
  generarRuta() {
    if (this.id_tipoUsuario == 2) {
      const name = this.candidato.usuario.nombre + this.candidato.usuario.apellidoP + this.candidato.usuario.apellidoM;
      const rutaIII = `documentos${name}/cv/`;
      const rutaIV = `documentos${name}/especialidad/`;
      const rutaV = `documentos${name}/especialidadII/`;
      const rutaVI = `documentos${name}/especialidadIII/`;
      this.getCV(rutaIII, this.candidato.rutaCv);
      this.getEspecialidad(rutaIV, this.candidato.rutaEspecialidad);
      this.getEspecialidadII(rutaV, this.candidato.rutaEspecialidad2);
      this.getEspecialidadIII(rutaVI, this.candidato.rutaEspecialidad3);
    }
  }

  // FUNCION DEL BOTON MODIFICAR PERFIL 
  modificarDatosPerfil() {
    this.router.navigate(['interface/perfil/modificar']);
  }

  // FUNCION QUE IDENTIFICA EL TIPO DE PERFIL ACTIVO
  // OCULTA LOS ELEMENTOS HTLM QUE NO CORRESPONDEN AL TIPO DE PERFIL
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
      this.habilidadesUsuario = this.candidato.habilidades;
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
  }

  // FUNCION QUE EVALUA EL USUARIO PARA IDENTIFICAR EL TEXTO DE UN BOTON 
  cargarPantalla() {
    if (this.documentosCV.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  cargarPantallaII() {
    if (this.documentosEsp.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  // FUNCION PARA OBTENER LAS PUBLICACIONES DE UN EMPLEADOR DESDE BD
  obtenerPublicaciones() {
    this._EmployerRequest.obtenerPublicaciones(this.empleador.id_empleador).subscribe(data => {
      // Codigo que itera la lista enviada por base de datos
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var numero = 0;
        //cogigo que itera el vector empresas 
        for (let index = 0; index < this.empresas.length; index++) {
          const element2 = this.empresas[index];
          // Código que evalua el elemento i de la lista de base de datos con cada uno de los elemntos del array empresas
          if (element2.empresa.nombre == element.empresa.nombre) {
            // Variable que almacena el numero de igualdades de la evaluacion anterior
            numero = numero + 1;
          }
        }
        // Código que evalua el numero de igualdades y si no existe inserta la el elemnto i en el array empresas
        if (numero == 0) {
          this.empresas.push(element);
        }
      }
      console.log(this.empresas);
    });
  }

  //FUNCION QUE CALCULA UNA EDAD DESDE UN FECHA (NO ESTA ACTIVA)
  obtenerEdad() {
    var edad = this.calcularEdad(this.candidato.fechaNacimiento);
    this.candidato.edad = edad;
  }

  //FUNCION QUE CALCULA UNA EDAD DESDE UN FECHA (NO ESTA ACTIVA)
  calcularEdad(fecha_nacimiento: Date) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }

  // FUNCION PARA CERRAR LA SESION
  cerrarSesion() {
    this._UserRequest.hacerVisitante();
    this._UserRequest.guaradarCorreo("");
    this._UserRequest.LimpiarAlertas();
    // Hace falta agregar la funcion cunado se agregue spring
  }

  // FUNCION PARA SUSPENDER UNA CUENTA POR ID
  suspenderCuenta() {
    let id = 0;

    if (this.id_tipoUsuario == 1) {
      id = this.administrador.usuario.id_usuario;
    } else if (this.id_tipoUsuario == 2) {
      id = this.candidato.usuario.id_usuario;
    } else if (this.id_tipoUsuario == 3) {
      id = this.empleador.usuario.id_usuario;
    } else {

    }

    const DTO = {
      id_usuario: id
    }

    this._CandidateRequest.suspenderCuenta(DTO).then((data: any) => {
      if (data.estatus == true) {
        alert("La cuenta ha sido suspendida");
        this.enviarAlerta("La cuenta ha sido suspendida de manera exitosa. Al realizar esta acción tu cuenta no podra ser utilizada hasta revertir este cambio.", false);
        this.cerrarSesion();
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio suspender la cuenta.", true);
      }
    });
  }

  // FUNCION PARA DESCARGAR LA IMAGEN DE PERFIL DEL SERVIDOR
  getImages(ruta: any, nombre: string) {
    const imageRef = ref(this._firebaseII, ruta);
    listAll(imageRef)
      .then(async response => {
        console.log(response);
        this.imgPerfil = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          if (item.name == nombre) {
            this.imgPerfil.push(url);
          }
        }
      })
      .catch(error => console.log(error));
  }

  // FUNCION PARA DESCARGAR LA IMAGEN DE PORTADA DEL SERVIDOR
  getImagesPortada(ruta: any, nombre: string) {
    const imageRef = ref(this._firebaseII, ruta);
    listAll(imageRef)
      .then(async response => {
        console.log(response);
        this.imgPortada = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          if (item.name == nombre) {
            this.imgPortada.push(url);
          }
        }
      })
      .catch(error => console.log(error));
  }

  // FUNCION PARA DESCARGAR EL ARCHIVO CV DEL SERVIDOR
  getCV(ruta: any, nombre: string) {
    const cvRef = ref(this._firebaseII, ruta);
    listAll(cvRef)
      .then(async response => {
        console.log(response);
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          if (item.name == nombre) {
            this.rutaCv = url;
            this.agragarVectorCV(url);
          }
        }
      })
      .catch(error => console.log(error));
  }

  // FUNCION PARA DESCARGAR EL ARCHIVO DE ESPECIALIDAD DEL SERVIDOR
  getEspecialidad(ruta: any, nombre: string) {
    const espIRef = ref(this._firebaseII, ruta);
    listAll(espIRef)
      .then(async response => {
        console.log(response);
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          if (item.name == nombre) {
            this.rutaEspecialidad = url;
            this.agragarVectorEsp(this.rutaEspecialidad,this.candidato.descripcionEspecialidad1);
          }
        }
      })
      .catch(error => console.log(error));
  }

  // FUNCION PARA DESCARGAR EL ARCHIVO DE ESPECIALIDAD DEL SERVIDOR
  getEspecialidadII(ruta: any, nombre: string) {
    const espIIRef = ref(this._firebaseII, ruta);
    listAll(espIIRef)
      .then(async response => {
        console.log(response);
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          if (item.name == nombre) {
            this.rutaEspecialidadII = url;
            this.agragarVectorEsp(this.rutaEspecialidadII,this.candidato.descripcionEspecialidad2);
          }
        }
      })
      .catch(error => console.log(error));
  }

  // FUNCION PARA DESCARGAR EL ARCHIVO DE ESPECIALIDAD DEL SERVIDOR
  getEspecialidadIII(ruta: any, nombre: string) {
    const espIIIRef = ref(this._firebaseII, ruta);
    listAll(espIIIRef)
      .then(async response => {
        console.log(response);
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          if (item.name == nombre) {
            this.rutaEspecialidadIII = url;
            this.agragarVectorEsp(this.rutaEspecialidadIII,this.candidato.descripcionEspecialidad3);
          }
        }
      })
      .catch(error => console.log(error));
  }

  agragarVectorCV(rutaCv: string) {
    if (rutaCv != "") {
      this.documentosCV.push(rutaCv);
    }
  }

  agragarVectorEsp(rutaEsp: string, descripcion: any) {
    if (rutaEsp != "") {
      const OBJETO= {
        ruta: rutaEsp,
        desc:descripcion
      }
      this.documentosEsp.push(OBJETO);
    } 
  }

  // FUNCION PARA EL POPUP
  enviarAlerta(mss: String, error: boolean) {

    const ALERTA = {
      mss: mss,
      error: error,
    }

    this._UserRequest.activarAlerta();
    this._UserRequest.cargarAlerta(ALERTA);
  }

}
