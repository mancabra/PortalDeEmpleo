import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Estado } from 'src/app/Services/Entity/estado';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { Idioma } from 'src/app/Services/Entity/idioma';
import { Habilidad } from 'src/app/Services/Entity/habilidad';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Administrador } from 'src/app/Services/Entity/administrador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {

  // VARIABLES PARA CAPTURAR LOS DIFERENTES TIPOS DE USUARIO
  usuario: any;
  candidato: Candidato = new Candidato;
  empleador: Empleador = new Empleador;
  administrador: Administrador = new Administrador;
  empresa: Empresa = new Empresa;
  id_tipoUsuario: number = 0;

  // VARIABLES PARA OCULTAR LOS ELEMENTOS QUE NO PERTENECEN AL PERFIL EN USO
  perfilTipoAdministrador: boolean = true;
  perfilTipoCandidato: boolean = true;
  perfilTipoEmpresa: boolean = true;

  // VARIABLES PAR IDENTIFICAR QUE SECCION SE MODIFICARA
  datosPrincipales: boolean = true;
  datosSecundarios: boolean = false;

  // VARIABLES PARA CAPTURAR DATOS
  nuevoNombre: string = "";
  nuevoApellidoP: string = "";
  nuevoApellidoM: string = "";
  lada: string = "+52";
  nuevoTelefono: string = "";
  nuevaFecha: Date = new Date;
  nuevaProfesion: string = "";
  nuevoDomicilio: string = "";
  nuevoEstado: Estado = new Estado;
  nuevoMunicipio: Municipio = new Municipio;
  nuevoCentroEducativo: string = "";
  nuevoPuesto: string = "";
  nuevosIdiomas: Idioma[] = [];
  nuevasHabilidades: Habilidad[] = [];

  // VARIABLES PARA CAPTURAR DATOS SECUNDARIOS
  nuevoCurriculum: string = "";
  nuevaImagenPerfil: string = "default.jpg";
  nuevaImagenPortada: string = "default.jpg";
  nuevaDescripcion: string = "";
  nuevaEspecialidad: string = "";
  nuevaEspecialidadII: string = "";
  nuevaEspecialidadIII: string = "";

  // VARIABLE PARA BLOQUEAR LOS ELEVENTOS DE UN ELEMNTO HTML
  bloquearMunicipio: string = "all";

  // VARIABLES PARA LA CAPTURA DE FECHAS Y FORMATOS 
  nacimientoSrt: any = "";
  pipe = new DatePipe('en-US');

  ladasMexico = ["+51", "+52", "+53"]; // CAMBIAR POR UN OBSERBABLE

  // VECTOR PARA ALMACENAR LOS ESTADOS DE BD
  estadosMexico: Estado[] = [];
  // VECTOR PARA ALMACENAR LOS MUNICIPIOS DE BD
  municipiosMexico: Municipio[] = [];
  // VECTOR PARA ALMACENAR LOS IDIOMAS DE BD
  idiomas: Idioma[] = [];
  // VECTOR PARA ALMACENAR LAS HABILIDADES DE BD
  habilidades: Habilidad[] = [];

  // VECTOR QUE ALMACENA LOS IDIOMAS QUE TIENE REGISTRADOS EL CANDIDATO
  idiomasCandidato: Idioma[] = [];
  // VECTOR QUE ALMACENA LAS HABILIDADES QUE TIENE REGISTRADOS EL CANDIDATO
  habilidadesCandidato: Habilidad[] = [];

  // VARIABLES PARA LA CAPTURA DE ARCHIVOS 
  imgP: any;
  img: any;
  document: any;
  documentE: any;
  documentEII: any;
  documentEIII: any;

  // VARIABLES PARA LA REFERENCIA DE RUTAS A FIREBASE
  imgReff: any;
  imgReffP: any;
  documentRef: any;
  documentERef: any;
  documentIIERef: any;
  documentIIIERef: any;


  // VARIABLE PARA ALERTA
  // ALMACENA EL MENSAJE QUE SE ENVIARA AL MOMENTO DE VALIDAR LAS EXTENCIONES
  mensajeAlerta: string = "";

  // VARIABLES PARA VALIDAR LA EXTENCION DEL ARCIVO SUBIDO
  extencionPermitidaPerfil: boolean = true;
  extencionPermitidaPortada: boolean = true;
  extencionPermitidaCurriculum: boolean = true;
  extencionPermitidaEspecialidad: boolean = true;
  extencionPermitidaEspecialidadII: boolean = true;
  extencionPermitidaEspecialidadIII: boolean = true;

  // VARIABLE PARA LA SUSCRIPCION A UN OBSERVABLE
  subscription: Subscription;

  // VARIABLE QUE PERMITE IDIENTIFICAR DESDE QUE VISTA SE ABRE EL COMPONENTE
  @Input() vistaAdministrar: boolean = false;

  // VARIABLES PARA GUARDAR LOS ARCHIVOS ANTERIORES
  imagenPortada: string = "";
  imagenPerfil: string = "";
  rutaCV: string = "";
  rutaEspecialidad: string = "";
  rutaEspecialidadII: string = "";
  rutaEspecialidadIII: string = "";

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _UserRequest: InterfaceService,
    private _CandidateRequest: CandidateService,
    private _AdminRequest: AdminService,
    private router: Router,
    private _firebase: Storage) {

    // SUSCRIPCION AL OBSERVABLE DE UN SERVICIO PARA OBTENER UN USUARIO
    this.subscription = this._AdminRequest.getUsuario().subscribe(data => {
      this.usuario = data;
      this.identificarVista();
    });
  }

  ngOnInit(): void {
    this.obtenrIdiomas();
    this.obtenerHabilidades();
    this.identificarVista();
    this.buscarEstados();

    //this.id_tipoUsuario = 2
    //this.identificarTipoDePerfil();
  }

  ngAfterViewInit() {
    //this.asignarIdiomas();
    //this.asignarHabilidades();
    this.ocultarBotones('segundo')
    this.ocultarBotones('tercero');
  }

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
    if (this.usuario.usuario.tipoUsuario == 1) {
      this.administrador = this.usuario;
      this.id_tipoUsuario = this.administrador.usuario.tipoUsuario;
      this.imagenPortada = this.administrador.usuario.rutaImagenPortada;
      this.imagenPerfil = this.administrador.usuario.rutaImagenPerfil;
      this.asignarGenerales(this.administrador);
      console.log("admin");
    } else if (this.usuario.usuario.tipoUsuario == 2) {
      this.candidato = this.usuario;
      this.id_tipoUsuario = this.candidato.usuario.tipoUsuario;
      this.imagenPortada = this.candidato.usuario.rutaImagenPortada;
      this.imagenPerfil = this.candidato.usuario.rutaImagenPerfil;
      this.rutaCV = this.candidato.rutaCv;
      this.rutaEspecialidad = this.candidato.rutaEspecialidad;
      this.rutaEspecialidadII = this.candidato.rutaEspecialidad2;
      this.rutaEspecialidadIII = this.candidato.rutaEspecialidad3;
      this.asignarGenerales(this.candidato);
      console.log("candidato");
    } else if (this.usuario.usuario.tipoUsuario == 3) {
      this.empleador = this.usuario;
      this.id_tipoUsuario = this.empleador.usuario.tipoUsuario;
      this.imagenPortada = this.empleador.usuario.rutaImagenPortada;
      this.imagenPerfil = this.empleador.usuario.rutaImagenPerfil;
      this.asignarGenerales(this.empleador);
      console.log("empleador");
    } else {

    }
    this.identificarTipoDePerfil();
  }

  // FUNCION PARA OBTENER UN USUARIO E IDENTIFICAR DE QUE TIPO ES
  buscarUsuario() {
    this._UserRequest.obtener().then((data: any) => {
      if (data.usuario.tipoUsuario == 1) {
        this.administrador = data;
        this.usuario = this.administrador
        this.id_tipoUsuario = this.administrador.usuario.tipoUsuario;
        this.asignarGenerales(this.administrador);
        this.imagenPortada = this.administrador.usuario.rutaImagenPortada;
        this.imagenPerfil = this.administrador.usuario.rutaImagenPerfil;
        console.log("admin");
      } else if (data.usuario.tipoUsuario == 2) {
        this.candidato = data;
        this.usuario = this.candidato;
        this.id_tipoUsuario = this.candidato.usuario.tipoUsuario;
        this.asignarGenerales(this.candidato);
        this.imagenPortada = this.candidato.usuario.rutaImagenPortada;
        this.imagenPerfil = this.candidato.usuario.rutaImagenPerfil;
        this.rutaCV = this.candidato.rutaCv;
        this.rutaEspecialidad = this.candidato.rutaEspecialidad;
        this.rutaEspecialidadII = this.candidato.rutaEspecialidad2;
        this.rutaEspecialidadIII = this.candidato.rutaEspecialidad3;
        console.log("candidato");
      } else if (data.usuario.tipoUsuario == 3) {
        this.empleador = data;
        this.usuario = this.empleador;
        this.id_tipoUsuario = this.empleador.usuario.tipoUsuario;
        console.log("empleador");
        this.imagenPortada = this.empleador.usuario.rutaImagenPortada;
        this.imagenPerfil = this.empleador.usuario.rutaImagenPerfil;
        this.asignarGenerales(this.empleador);
      } else {

      }
      this.identificarTipoDePerfil();
    });
  }

  // FUNCION PARA ASIGNAR LOS DATOS EN COMUN QUE TIENEN TODOS LOS USUARIOS
  asignarGenerales(usuario: any) {
    this.nuevoNombre = usuario.usuario.nombre;
    this.nuevoApellidoP = usuario.usuario.apellidoP;
    this.nuevoApellidoM = usuario.usuario.apellidoM;
    this.nuevoTelefono = usuario.usuario.telefono;
    this.nuevaImagenPortada = usuario.usuario.rutaImagenPortada;
    this.nuevaImagenPerfil = usuario.usuario.rutaImagenPerfil;
    this.validarLongitud();
  }

  // FUNCION PARA AJUSTAR A VISTA AL TIPIO DE USUARIO
  identificarTipoDePerfil() {
    if (this.id_tipoUsuario == 1 || this.id_tipoUsuario == 3) {
      this.perfilTipoAdministrador = false;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpresa = true;
    } else if (this.id_tipoUsuario == 2) {
      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = false;
      this.perfilTipoEmpresa = true;
      this.asignarDatosEspecificos(this.candidato);
    } else {
      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpresa = false;
    }
  }

  // FUNCION PARA ASIGNAR LOS DATOS ESPECIFICOS DE CANDIDATO

  asignarDatosEspecificos(candidato: Candidato) {
    this.nuevaProfesion = candidato.profesion;
    this.nuevoDomicilio = candidato.domicilio;
    this.nuevoEstado = candidato.estado;
    this.buscarMunicipios(candidato.estado.id_estado);
    this.nuevoMunicipio = candidato.municipio;
    this.nuevoCentroEducativo = candidato.centroEducativo;
    this.nuevoPuesto = candidato.puestoActual;
    this.nuevaFecha = candidato.fechaNacimiento;
    this.idiomasCandidato = candidato.idiomas;
    this.habilidadesCandidato = candidato.habilidades;
    this.asignarIdiomas();
    this.asignarHabilidades();
    this.nuevoCurriculum = candidato.rutaCv;
    this.nuevaEspecialidad = candidato.rutaEspecialidad;
    this.nuevaEspecialidadII = candidato.rutaEspecialidad2;
    this.nuevaEspecialidadIII = candidato.rutaEspecialidad3;
  }

  // FUNCION PÀRA DAR FORMATO AL NUMERO DE TELEFONO
  validarLongitud() {
    if (this.nuevoTelefono.length == 10) {
    } else if (this.nuevoTelefono.length == 17) {
      this.nuevoTelefono = this.nuevoTelefono.slice(3, 17);
    } else if (this.nuevoTelefono.length == 18) {
      this.nuevoTelefono = this.nuevoTelefono.slice(4, 18);
    } else if (this.nuevoTelefono.length == 19) {
      this.nuevoTelefono = this.nuevoTelefono.slice(5, 19);
    } else {

    }
  }

  // FUNCION PARA OBTENER LOS IDIOMAS DISPONIBLES
  obtenrIdiomas() {
    this._CandidateRequest.obtenerIdiomas().subscribe(data => {
      this.idiomas = data;
      console.log(this.idiomas);
    });
  }

  // FUNCION PARA OBTENER LAS HABILIDADES DISPONIBLES
  obtenerHabilidades() {
    this._CandidateRequest.obtenerHabilidades().subscribe(data => {
      this.habilidades = data;
      console.log(this.habilidades);
    });
  }

  // FUNFION QUE COLOCA AL ESTADO POR DEFAULT
  cleanEstate() {
    this.nuevoEstado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
  }

  // FUNFION QUE COLOCA AL ESTADO POR DEFAULT
  cleanCountry() {
    this.nuevoMunicipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado }
  }

  // FUNCION PARA OBTENER TODOS LOS ESTADOS
  buscarEstados() {
    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estadosMexico = data;
      console.log(this.estadosMexico);
    });

  }

  // FUNCION PARA BUSCAR LOS MUNICIPIOS DE UN ESTADO
  buscarMunicipios(id_estado: number) {
    this._UserRequest.obtenerMunicipios(id_estado).subscribe(data => {
      this.municipiosMexico = data;
      console.log(this.municipiosMexico);
    });
  }

  // FUNCION PARA CAMBIAR EL ESTADO Y LIMPIAR EL MUNICIPIO ACTUAL
  actualizarEstado(estado: any) {
    this.nuevoEstado = estado;
    this.cleanCountry();
    this.buscarMunicipios(this.nuevoEstado.id_estado);
  }

  // FUNCION PARA OCULTAR BOTONES DE ESPECIALIDAD
  ocultarBotones(boton: string) {
    if (boton == "primero") {
      let postulacion = document.getElementsByName('primero')[0];
      postulacion.classList.add('view');
      this.nuevaEspecialidad == this.rutaEspecialidad;
    } else if (boton == "segundo") {
      let postulacion = document.getElementsByName('segundo')[0];
      postulacion.classList.add('view');
      this.nuevaEspecialidadII == this.rutaEspecialidadII;
    } else if (boton == "tercero") {
      let postulacion = document.getElementsByName('tercero')[0];
      postulacion.classList.add('view');
      this.nuevaEspecialidadIII == this.rutaEspecialidadIII;

    }
  }
  // FUNCION PARA MOSTRAR BOTONES DE ESPACIALIDAD
  mostarBotones(boton: string) {
    if (boton == "primero") {
      let postulacion = document.getElementsByName('segundo')[0];
      postulacion.classList.remove('view');
    } else if (boton == "segundo") {
      let postulacion = document.getElementsByName('tercero')[0];
      postulacion.classList.remove('view');
    } else if (boton == "tercero") {
      this.enviarAlerta("De momento solo se permiten 3 archivos de especialidad por candidato.", true);
    }
  }
  // FUNCION PARA CAMBIAR EL CODIGO DE REGION DEL NUMERO TELEFONICO
  actualizarLada(numero: string) {
    this.lada = numero;
  }

  // FUNCION PARA ACTUALIZAR EL NUNICIPIO
  actualizarMunicipio(municipio: any) {
    this.nuevoMunicipio = municipio;
  }

  // FUNCIONES PARA LA SELECCION DEL TIPO DE MODIFICACION
  modificarPrincipales() {
    if (this.datosPrincipales == true) {
      this.modificarSecundarios();
    } else {
      this.datosPrincipales = true;
      this.datosSecundarios = false;
    }
  }

  // FUNCIONES PARA LA SELECCION DEL TIPO DE MODIFICACION
  modificarSecundarios() {
    if (this.datosSecundarios == true) {
      this.modificarPrincipales();
    } else {
      this.datosPrincipales = false;
      this.datosSecundarios = true;
    }
  }

  // FUNCIONES PARA LA SELECCION DEL TIPO DE MODIFICACION
  capturarNuevosDatos() {
    if (this.datosPrincipales == true && this.datosSecundarios == false) {
      this.capturarPrincipales();
    } else if (this.datosPrincipales == false && this.datosSecundarios == true) {
      this.capturarSecundarios();
    } else {
      alert("No se selecciono una opcion");
    }
  }

  // FUNCION PARA LIMPIAR TODOS LOS CAMPOS DEL FORMULARIO
  limpiarTodo() {
    this.nuevoNombre = "";
    this.nuevoApellidoP = "";
    this.nuevoApellidoM = "";
    this.nuevoTelefono = "";
    this.nuevaProfesion = "";
    this.nuevoDomicilio = "";
    this.cleanEstate();
    this.cleanCountry();
    this.nuevoCurriculum = "";
    this.nuevaImagenPerfil = "";
    this.nuevaImagenPortada = "";
    this.nuevaDescripcion = "";
    this.nuevaFecha = new Date;
  }

  // FUNCIONES PARA SELECCIONAR LOS CHECK BOX DEL IDIOMA QUE TIENE ACTUALMENTE EL CANDIDATO
  // FUNCIONES PARA RECORRER LA LISTA DE LOS IDIOMAS DEL CANDIDATO
  asignarIdiomas() {
    for (let j = 0; j < this.idiomasCandidato.length; j++) {
      this.buscarIdioma(this.idiomasCandidato[j].nombreIdioma);
    }
  }

  // FUNCION PARA OBTENER LOS CHECKBOX DEL DOCUMENTO HTML Y ACTIVARLO
  buscarIdioma(idioma: string) {
    const elem = document.getElementById(idioma);
    elem?.click();
  }

  // FUNCIONES PARA SELECCIONAR LOS CHECK BOX DE LA HABILIDAD QUE TIENE ACTUALMENTE EL CANDIDATO
  // FUNCIONES PARA RECORRER LA LISTA DE LAS HABILIDADES DEL CANDIDATO
  asignarHabilidades() {
    for (let j = 0; j < this.habilidadesCandidato.length; j++) {
      this.buscarHabilidad(this.habilidadesCandidato[j].nombreHabilidad);
    }
  }

  // FUNCION PARA OBTENER LOS CHECKBOX DEL DOCUMENTO HTML Y ACTIVARLO
  buscarHabilidad(habilidad: string) {
    const elem = document.getElementById(habilidad);
    elem?.click();
  }

  // FUNCION PARA ENVIAR LA NUEVA LISTA DE IDIOMAS
  guardarIdiomas() {
    this.nuevosIdiomas = [];
    for (let j = 0; j < this.idiomas.length; j++) {
      const idiomaActual = this.idiomas[j];
      var idioma = <HTMLInputElement>document.getElementById(idiomaActual.nombreIdioma);
      var idiomaBoolean = idioma.checked;

      if (idiomaBoolean == true) {
        this.nuevosIdiomas.push(idiomaActual);
      }
    }

    const DTO = {
      id_candidato: this.candidato.id_candidato,
      idiomas: this.nuevosIdiomas
    }

    this._CandidateRequest.guardarIdiomas(DTO).then((data: any) => {
      if (data.estatus == true) {

      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar los idiomas.", true);
      }
    });
  }

  // FUNCION PARA ENVIAR LA NUEVA LISTA DE HABILIDADES
  guardarHabilidades() {
    this.nuevasHabilidades = [];
    for (let j = 0; j < this.habilidades.length; j++) {
      const habilidadActual = this.habilidades[j];
      var habilidad = <HTMLInputElement>document.getElementById(habilidadActual.nombreHabilidad);
      var habiliadadBoolean = habilidad.checked;

      if (habiliadadBoolean == true) {
        this.nuevasHabilidades.push(habilidadActual);
      }
    }

    const DTO = {
      id_candidato: this.candidato.id_candidato,
      habilidades: this.nuevasHabilidades,
    }

    this._CandidateRequest.guardarHabilidades(DTO).then((data: any) => {
      if (data.estatus == true) {
        //
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar las habilidades.", true);
      }
    });
  }

  // FUNCION PARA LA CAPTURA DE LOS DATOS PRINCIPALES
  capturarPrincipales() {
    if (this.id_tipoUsuario == 1) {
      this.usuario = this.administrador;

      const USUARIO_MODIFICADO = {
        id_usuario: this.administrador.usuario.id_usuario,
        nombre: this.nuevoNombre,
        apellidoP: this.nuevoApellidoP,
        apellidoM: this.nuevoApellidoM,
        telefono: this.nuevoTelefono,
      }

      this.validarDatosNombre(USUARIO_MODIFICADO);
    } else if (this.id_tipoUsuario == 2) {
      this.usuario = this.candidato;

      const USUARIO_MODIFICADO = {
        id_candidato: this.candidato.id_candidato,
        nombre: this.nuevoNombre,
        apellidoP: this.nuevoApellidoP,
        apellidoM: this.nuevoApellidoM,
        domicilio: this.nuevoDomicilio,
        descripcion: this.nuevaDescripcion,
        centroEducativo: this.nuevoCentroEducativo,
        puestoActual: this.nuevoPuesto,
        id_municipio: this.nuevoMunicipio.id_municipio,
        id_estado: this.nuevoEstado.id_estado,
        telefono: this.nuevoTelefono,
        profesion: this.nuevaProfesion,
        fechaNacimientoStr: this.nacimientoSrt,
      }

      this.validarDatosNombre(USUARIO_MODIFICADO);
    } else if (this.id_tipoUsuario == 3) {
      this.usuario = this.empleador;

      const USUARIO_MODIFICADO = {
        id_usuario: this.empleador.usuario.id_usuario,
        nombre: this.nuevoNombre,
        apellidoP: this.nuevoApellidoP,
        apellidoM: this.nuevoApellidoM,
        telefono: this.nuevoTelefono,
      }

      this.validarDatosNombre(USUARIO_MODIFICADO);
    } else {

    }
  }

  // FUNCION PARA LA CAPTURA DE NOMBRES
  validarDatosNombre(usuarioModificado: any) {
    if (usuarioModificado.nombre == "") {
      usuarioModificado.nombre = this.usuario.usuario.nombre;
    } else if (usuarioModificado.nombre.length < 3) {
      usuarioModificado.nombre = this.usuario.usuario.nombre;
    } else if (usuarioModificado.nombre.length > 25) {
      usuarioModificado.nombre = this.usuario.usuario.nombre;
    } else {
      //
    }
    this.cambiarFlujoI(usuarioModificado);
  }

  // FUNCION PARA EL CAMBIO DE FLUJO SEGUN EL TIPO DE USUARIO
  cambiarFlujoI(usuarioModificado: any) {
    if (this.id_tipoUsuario == 1) {
      this.validarDatosApellidoP(usuarioModificado);
    } else if (this.id_tipoUsuario == 2) {
      this.validarDatosApellidoP(usuarioModificado);
    } else if (this.id_tipoUsuario == 3) {
      this.validarDatosApellidoP(usuarioModificado);
    } else {
      this.validarDatosDescripcion(usuarioModificado);
    }
  }

  // FUNCION PARA LA CAPTURA DE APELLIDOS PATERNOS
  validarDatosApellidoP(usuarioModificado: any) {
    if (usuarioModificado.apellidoP == "") {
      usuarioModificado.apellidoP = this.usuario.usuario.apellidoP;
    } else if (usuarioModificado.apellidoP.length < 4) {
      usuarioModificado.apellidoP = this.usuario.usuario.apellidoP;
    } else if (usuarioModificado.apellidoP.length > 15) {
      usuarioModificado.apellidoP = this.usuario.usuario.apellidoP;
    } else {
      //
    }
    this.validarDatosApellidoM(usuarioModificado);
  }

  // FUNCION PARA LA CAPTURA DE APELLIDOS MATERNOS
  validarDatosApellidoM(usuarioModificado: any) {
    if (usuarioModificado.apellidoM == "") {
      usuarioModificado.apellidoM = this.usuario.usuario.apellidoM;
    } else if (usuarioModificado.apellidoM.length < 4) {
      usuarioModificado.apellidoM = this.usuario.usuario.apellidoM;
    } else if (usuarioModificado.apellidoM.length > 15) {
      usuarioModificado.apellidoM = this.usuario.usuario.apellidoM;
    } else {
      //
    }
    this.validarTelefono(usuarioModificado);
  }

  // FUNCION PARA LA CAPTURA DE TELEFONOS
  validarTelefono(usuarioModificado: any) {
    if (this.nuevoTelefono == "") {
      usuarioModificado.telefono = this.usuario.usuario.telefono
    } else {
      let numeroConLada = "";
      numeroConLada = this.lada + " " + this.nuevoTelefono;
      if (numeroConLada.length < 18) {
        usuarioModificado.telefono = this.usuario.usuario.telefono
      } else if (numeroConLada.length > 18) {
        usuarioModificado.telefono = this.usuario.usuario.telefono
      } else {
        usuarioModificado.telefono = numeroConLada
      }
    }
    this.cambiarFlujoII(usuarioModificado);
  }

  // FUNCION PARA EL CAMBIO DE FLUJO SEGUN EL TIPO DE USUARIO
  cambiarFlujoII(usuarioModificado: any) {
    if (this.id_tipoUsuario == 2) {
      this.validarEdad(usuarioModificado);
    } else {
      this.guardarModPrincipalesII(usuarioModificado);
    }
  }

  // FUNCION PARA LA CAPTURA DE FECHAS DE NACIMIENTO
  validarEdad(usuarioModificado: any) {
    var hoy = new Date();
    var cumpleanos = new Date(this.nuevaFecha);
    let ChangedFormat = this.pipe.transform(this.nuevaFecha, 'dd/MM/YYYY');
    this.nacimientoSrt = ChangedFormat;

    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    if (edad == 0) {
      usuarioModificado.fechaNacimientoStr = this.usuario.fechaNacimiento.toString();

    } else if (edad < 18) {
      usuarioModificado.fechaNacimientoStr = this.usuario.fechaNacimiento.toString();

    } else if (edad > 70) {
      usuarioModificado.fechaNacimientoStr = this.usuario.fechaNacimiento.toString();
    } else {
      usuarioModificado.fechaNacimientoStr = this.nacimientoSrt?.toString();
    }
    this.validarDatosDomicilio(usuarioModificado);
  }

  // FUNCION PARA LA CAPTURA DE DIRECCIONES
  validarDatosDomicilio(usuarioModificado: any) {
    if (usuarioModificado.domicilio == "") {
      usuarioModificado.domicilio = this.usuario.domicilio;
    } else if (usuarioModificado.domicilio.length < 5) {
      usuarioModificado.domicilio = this.usuario.domicilio;
    } else if (usuarioModificado.domicilio.length > 50) {
      usuarioModificado.domicilio = this.usuario.domicilio;
    } else {
      //
    }
    this.validarDatosDescripcion(usuarioModificado);
  }

  // FUNCION PARA LA CAPTURA DE DESCRIPCION
  validarDatosDescripcion(usuarioModificado: any) {
    if (usuarioModificado.descripcion == "") {
      usuarioModificado.descripcion = this.usuario.descripcion;
    } else if (usuarioModificado.descripcion == null) {
      usuarioModificado.descripcion = this.usuario.descripcion;
    } else if (usuarioModificado.descripcion.length < 5) {
      usuarioModificado.descripcion = this.usuario.descripcion;
    } else if (usuarioModificado.descripcion.length > 120) {
      usuarioModificado.descripcion = this.usuario.descripcion;
    } else {
      //
    }
    this.cambiarFlujoIII(usuarioModificado);
  }

  // FUNCION PARA EL CAMBIO DE FLUJO SEGUN EL TIPO DE USUARIO
  cambiarFlujoIII(usuarioModificado: any) {
    if (this.id_tipoUsuario == 2) {
      this.validarProfesion(usuarioModificado);
    } else {
      this.guardarModPrincipales(usuarioModificado);
    }
  }

  // FUNCION PARA LA CAPTURA DE PROFECIONES
  validarProfesion(usuarioModificado: any) {
    if (usuarioModificado.profesion == "") {
      usuarioModificado.profesion = this.usuario.profesion;
    } else if (usuarioModificado.profesion == null) {
      usuarioModificado.profesion = this.usuario.profesion;
    } else if (usuarioModificado.profesion.length < 4) {
      usuarioModificado.profesion = this.usuario.profesion;
    } else if (usuarioModificado.profesion.length > 25) {
      usuarioModificado.profesion = this.usuario.profesion;
    } else {
      //
    }
    this.validarDatosEscuela(usuarioModificado);
  }

  // FUNCION PARA LA CAPTURA DE ESCUELAS
  validarDatosEscuela(usuarioModificado: any) {
    if (usuarioModificado.centroEducativo == "") {
      usuarioModificado.centroEducativo = this.usuario.centroEducativo;
    } else if (usuarioModificado.centroEducativo == null) {
      usuarioModificado.centroEducativo = this.usuario.centroEducativo;
    } else if (usuarioModificado.centroEducativo.length < 3) {
      usuarioModificado.centroEducativo = this.usuario.centroEducativo;
    } else if (usuarioModificado.centroEducativo.length > 50) {
      usuarioModificado.centroEducativo = this.usuario.centroEducativo;
    } else {
      //
    }
    this.validarDatosPuesto(usuarioModificado);
  }

  // FUNCION PARA LA CAPTURA DE EMPLEO ACTUAL
  validarDatosPuesto(usuarioModificado: any) {
    if (usuarioModificado.puestoActual == "") {
      usuarioModificado.puestoActual = this.usuario.puestoActual;
    } else if (usuarioModificado.puestoActual == null) {
      usuarioModificado.puestoActual = this.usuario.puestoActual;
    } else if (usuarioModificado.puestoActual.length < 5) {
      usuarioModificado.puestoActual = this.usuario.puestoActual;
    } else if (usuarioModificado.puestoActual.length > 50) {
      usuarioModificado.puestoActual = this.usuario.puestoActual;
    } else {
      //
    }
    this.validarDatosEstado(usuarioModificado);
  }

  // FUNCION PARA LA CAPTURA DE ESTADOS
  validarDatosEstado(usuarioModificado: any) {
    if (usuarioModificado.id_estado == 0) {
      usuarioModificado.id_estado = this.usuario.estado.id_estado;
      usuarioModificado.id_municipio = this.usuario.municipio.id_municipio;
    } else if (usuarioModificado.id_estado != this.usuario.estado.id_estado) {
      this.validarMunicipio(usuarioModificado);
    }
    this.cambiarFlujoIV(usuarioModificado);
  }

  // FUNCION PARA LA CAPTURA DE FECHAS DE NACIMIENTO
  validarMunicipio(usuarioModificado: any) {
    if (usuarioModificado.id_municipio == 0) {
      usuarioModificado.id_estado = this.usuario.estado.id_estado;
      usuarioModificado.id_municipio = this.usuario.municipio.id_municipio;
    } else {
      //
    }
  }

  // FUNCION PARA EL CAMBIO DE FLUJO SEGUN EL TIPO DE USUARIO
  cambiarFlujoIV(usuarioModificado: any) {
    if (this.id_tipoUsuario == 2) {
      this.guardarIdiomas();
      this.guardarHabilidades();
    } else {
      //
    }
    this.guardarModPrincipales(usuarioModificado);
  }

  guardarModPrincipales(usuarioModificado: any) {
    this._CandidateRequest.modificar(usuarioModificado).then((data: any) => {
      if (data.estatus == true) {
        this.enviarAlerta("El perfil ha sido modificado correctamente.", false);
        if (this.vistaAdministrar == false) {
          this.router.navigate(['interface/perfil']);
        }
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar el perfil.", true);
      }
    });
  }

  guardarModPrincipalesII(usuarioModificado: any) {
    this._UserRequest.modificar(usuarioModificado).then((data: any) => {
      if (data.estatus == true) {

        this.enviarAlerta("El perfil ha sido modificado correctamente.", false);
        if (this.vistaAdministrar == false) {
          this.router.navigate(['interface/perfil']);
        } else {
          this.enviarAlerta("El perfil ha sido modificado correctamente.", false);
          const OBJETO = {
            vista: "revisarPerfil",
            correoElectronico:this.usuario.usuario.correoElectronico
          }
          this._AdminRequest.cambiarVista(OBJETO);
        }
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar el perfil.", true);
      }
    });
  }

  // FUNCION PARA LA CAPTURA DE UN ARCHIVO DE TIPO IMAGEN PERFIL
  uploadImage($event: any) {
    this.img = $event.target.files[0];
    const name = this.usuario.usuario.nombre + this.usuario.usuario.apellidoP + this.usuario.usuario.apellidoM;
    this.nuevaImagenPerfil = this.img.name;
    this.imgReff = ref(this._firebase, `images${name}/perfil/${this.img.name}`);

    const ARCHIVO = {
      tipo: "perfil",
      name: this.img.name,
    }

    this.evaluarExtencion(ARCHIVO);
  }

  // FUNCION PARA LA CAPTURA DE UN ARCHIVO DE TIPO IMAGEN PORTADA
  uploadImagePortada($event: any) {
    this.imgP = $event.target.files[0];
    const name = this.usuario.usuario.nombre + this.usuario.usuario.apellidoP + this.usuario.usuario.apellidoM;
    this.nuevaImagenPortada = this.imgP.name;
    this.imgReffP = ref(this._firebase, `images${name}/portada/${this.imgP.name}`);

    const ARCHIVO = {
      tipo: "portada",
      name: this.imgP.name,
    }

    this.evaluarExtencion(ARCHIVO);
  }

  // FUNCION PARA LA CAPTURA DE UN ARCHIVO DE TIPO CV
  uploadCV($event: any) {
    this.document = $event.target.files[0];
    const name = this.usuario.usuario.nombre + this.usuario.usuario.apellidoP + this.usuario.usuario.apellidoM;
    this.nuevoCurriculum = this.document.name;
    this.documentRef = ref(this._firebase, `documentos${name}/cv/${this.document.name}`);

    const ARCHIVO = {
      tipo: "curriculum",
      name: this.document.name,
    }

    this.evaluarExtencion(ARCHIVO);
  }

  // FUNCION PARA LA CAPTURA DE UN ARCHIVO DE TIPO ESPECIALIDAD
  uploadEspecialidad($event: any) {
    this.documentE = $event.target.files[0];
    const name = this.usuario.usuario.nombre + this.usuario.usuario.apellidoP + this.usuario.usuario.apellidoM;
    this.nuevaEspecialidad = this.documentE.name;
    this.documentERef = ref(this._firebase, `documentos${name}/especialidad/${this.documentE.name}`);

    const ARCHIVO = {
      tipo: "especialidad",
      name: this.documentE.name,
    }

    this.evaluarExtencion(ARCHIVO);
  }

  // FUNCION PARA LA CAPTURA DE UN ARCHIVO DE TIPO ESPECIALIDAD
  uploadEspecialidadII($event: any) {
    this.documentEII = $event.target.files[0];
    const name = this.usuario.usuario.nombre + this.usuario.usuario.apellidoP + this.usuario.usuario.apellidoM;
    this.nuevaEspecialidadII = this.documentEII.name;
    this.documentIIERef = ref(this._firebase, `documentos${name}/especialidadII/${this.documentEII.name}`);

    const ARCHIVO = {
      tipo: "segundo",
      name: this.documentEII.name,
    }

    this.evaluarExtencion(ARCHIVO);
  }

  // FUNCION PARA LA CAPTURA DE UN ARCHIVO DE TIPO ESPECIALIDAD
  uploadEspecialidadIII($event: any) {
    this.documentEIII = $event.target.files[0];
    const name = this.usuario.usuario.nombre + this.usuario.usuario.apellidoP + this.usuario.usuario.apellidoM;
    this.nuevaEspecialidadIII = this.documentEIII.name;
    this.documentIIIERef = ref(this._firebase, `documentos${name}/especialidadIII/${this.documentEIII.name}`);

    const ARCHIVO = {
      tipo: "tercero",
      name: this.documentEIII.name,
    }

    this.evaluarExtencion(ARCHIVO);
  }

  // FUNCION PARA VERIFICAR TERMINACION DE ARCHIVOS
  evaluarExtencion(archivo: any) {
    if (archivo.tipo == "perfil") {
      this.extencionPermitidaPerfil = true;
      this.extencionPermitidaPerfil = archivo.name.includes(".png");
      if (this.extencionPermitidaPerfil == false) {
        this.extencionPermitidaPerfil = archivo.name.includes(".jpg");
      }
    } else if (archivo.tipo == "portada") {
      this.extencionPermitidaPortada = true;
      this.extencionPermitidaPortada = archivo.name.includes(".png");
      if (this.extencionPermitidaPortada == false) {
        this.extencionPermitidaPortada = archivo.name.includes(".jpg");
      }
    } else if (archivo.tipo == "curriculum") {
      this.extencionPermitidaCurriculum = true;
      this.extencionPermitidaCurriculum = archivo.name.includes(".pdf");
    } else if (archivo.tipo == "especialidad") {
      this.extencionPermitidaEspecialidad = true;
      this.extencionPermitidaEspecialidad = archivo.name.includes(".pdf");
    } else if (archivo.tipo == "segundo") {
      this.extencionPermitidaEspecialidadII = true;
      this.extencionPermitidaEspecialidadII = archivo.name.includes(".pdf");
    }
    else if (archivo.tipo == "tercero") {
      this.extencionPermitidaEspecialidadIII = true;
      this.extencionPermitidaEspecialidadIII = archivo.name.includes(".pdf");
    } else {

    }
  }

  // FUNCION PARA SUBIR UN ARCHIVO SEGUN SU TERMINACION 
  evaluarArchivosSubidosPerfil() {
    if (this.extencionPermitidaPerfil == false) {
      this.mensajeAlerta = this.mensajeAlerta + "imagen de perfil"
    } else {
      // CARGAR PERFIL
      if (this.nuevaImagenPerfil != "default.jpg") {
        uploadBytes(this.imgReff, this.img)
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    }
  }

  // FUNCION PARA SUBIR UN ARCHIVO SEGUN SU TERMINACION 
  evaluarArchivosSubidosPortada() {
    if (this.extencionPermitidaPortada == false) {
      if (this.extencionPermitidaPerfil == false) {
        this.mensajeAlerta = this.mensajeAlerta + ", imagen de portada";
      } else {
        this.mensajeAlerta = this.mensajeAlerta + "imagen de portada";
      }
    } else {
      // CARGAR PORTADA
      if (this.nuevaImagenPortada != "default.jpg") {
        uploadBytes(this.imgReffP, this.imgP)
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    }
  }

  // FUNCION PARA SUBIR UN ARCHIVO SEGUN SU TERMINACION 
  evaluarArchivosSubidosCV() {
    if (this.extencionPermitidaCurriculum == false) {
      if (this.extencionPermitidaPerfil == false || this.extencionPermitidaPortada == false) {
        this.mensajeAlerta = this.mensajeAlerta + ", curriculum";
      } else {
        this.mensajeAlerta = this.mensajeAlerta + "curriculum";
      }
    } else {
      // CARGAR CV
      if (this.nuevoCurriculum != "") {
        uploadBytes(this.documentRef, this.document)
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    }
  }

  // FUNCION PARA SUBIR UN ARCHIVO SEGUN SU TERMINACION 
  evaluarArchivosSubidosEspecialidad() {
    if (this.extencionPermitidaEspecialidad == false) {
      if (this.extencionPermitidaPerfil == false || this.extencionPermitidaPortada == false || this.extencionPermitidaCurriculum == false) {
        this.mensajeAlerta = this.mensajeAlerta + ", especialidad";
      } else {
        this.mensajeAlerta = this.mensajeAlerta + "especialidad";
      }
    } else {
      // CARGAR ESPECIALIDAD
      if (this.nuevaEspecialidad != "") {
        uploadBytes(this.documentERef, this.documentE)
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    }
  }

  // FUNCION PARA SUBIR UN ARCHIVO SEGUN SU TERMINACION 
  evaluarArchivosSubidosEspecialidadII() {
    if (this.extencionPermitidaEspecialidadII == false) {
      if (this.extencionPermitidaPerfil == false || this.extencionPermitidaPortada == false || this.extencionPermitidaCurriculum == false || this.extencionPermitidaEspecialidad == false) {
        this.mensajeAlerta = this.mensajeAlerta + ", especialidad II";
      } else {
        this.mensajeAlerta = this.mensajeAlerta + "especialidad II";
      }
    } else {
      // CARGAR ESPECIALIDAD
      if (this.nuevaEspecialidadII != "") {
        uploadBytes(this.documentIIERef, this.documentEII)
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    }
  }

  // FUNCION PARA SUBIR UN ARCHIVO SEGUN SU TERMINACION 
  evaluarArchivosSubidosEspecialidadIII() {
    if (this.extencionPermitidaEspecialidadIII == false) {
      if (this.extencionPermitidaPerfil == false || this.extencionPermitidaPortada == false || this.extencionPermitidaCurriculum == false || this.extencionPermitidaEspecialidad == false || this.extencionPermitidaEspecialidadII == false) {
        this.mensajeAlerta = this.mensajeAlerta + " y especialidad III";
      } else {
        this.mensajeAlerta = this.mensajeAlerta + "especialidad III";
      }
    } else {
      // CARGAR ESPECIALIDAD
      if (this.nuevaEspecialidadIII != "") {
        uploadBytes(this.documentIIIERef, this.documentEIII)
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    }
  }

  // MODIFICACION DE IMAGENES
  capturarSecundarios() {
    this.mensajeAlerta = "";
    this.evaluarArchivosSubidosPerfil();
    this.evaluarArchivosSubidosPortada();
    this.evaluarArchivosSubidosCV();
    this.evaluarArchivosSubidosEspecialidad();
    this.evaluarArchivosSubidosEspecialidadII();
    this.evaluarArchivosSubidosEspecialidadIII();
    this.evaluarArchivos();
    this.mensajeAlerta = "Los archivos seleccionados para el campo: " + this.mensajeAlerta + " no son de una extención valida."
      + " Ten en cuenta que las extenciones permitidas para los campos de captura de imagenes son PNG y JPG, mientras que para la captura de archivos solo de admite el formato PDF";
    if (this.extencionPermitidaEspecialidadIII == false ||this.extencionPermitidaEspecialidadII == false ||this.extencionPermitidaEspecialidad == false || this.extencionPermitidaPortada == false || this.extencionPermitidaPerfil == false || this.extencionPermitidaCurriculum == false ) {
      this.enviarAlerta(this.mensajeAlerta, true);
    } else {
      const USUARIOMOD = {
        id_usuario: this.usuario.usuario.id_usuario,
        rutaImagenPerfil: this.nuevaImagenPerfil,
        rutaImagenPortada: this.nuevaImagenPortada,
        rutaCv: this.nuevoCurriculum,
        rutaEspecialidad: this.nuevaEspecialidad,
        rutaEspecialidad2: this.nuevaEspecialidadII,
        rutaEspecialidad3: this.nuevaEspecialidadIII,
      }
      this.guardarArchivos(USUARIOMOD);
    }
  }

  // FUNCION PARA EVALUAR LOS ARCHIVOS;
  evaluarArchivos() {
    if (this.nuevaImagenPerfil == "") {
      this.nuevaImagenPerfil = this.imagenPerfil;
    }

    if (this.nuevaImagenPortada == "") {
      this.nuevaImagenPortada = this.imagenPortada;
    }

    if (this.nuevoCurriculum == "") {
      this.nuevoCurriculum = this.rutaCV;
    }

    if (this.nuevaEspecialidad == "") {
      this.nuevaEspecialidad = this.rutaEspecialidad;
    }

    if (this.nuevaEspecialidadII == "") {
      this.nuevaEspecialidadII = this.rutaEspecialidadII;
    }

    if (this.nuevaEspecialidadIII == "") {
      this.nuevaEspecialidadIII = this.rutaEspecialidadIII;
    }
  }

  // FUNCIONES PARA GUARDAR LOS DATOS SECUNDARIOS EN BD
  guardarArchivos(archivos: any) {
    this._CandidateRequest.modificarSecundarios(archivos).then((data: any) => {
      if (data.estatus == true) {
        if (this.vistaAdministrar == false) {
          this.enviarAlerta("El perfil ha sido modificado correctamente.", false);
          this.router.navigate(['interface/perfil']);
        } else {
          this.enviarAlerta("El perfil ha sido modificado correctamente.", false);
          const OBJETO = {
            vista: "revisarPerfil",
            correoElectronico:this.usuario.usuario.correoElectronico
          }
          this._AdminRequest.cambiarVista(OBJETO);
        }
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio cargar los archivos en base de datos.", true);
      }
    });
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
