import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { Estado } from 'src/app/Services/Entity/estado';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { TipoContratacion } from 'src/app/Services/Entity/tipo-contratacion';
import { TipoHorario } from 'src/app/Services/Entity/tipo-horario';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit, OnDestroy {

  // VECTOR PARA ALMACENAR LOS ESTADOS QUE ENVIE BD
  estadosDeMexico: Estado[] = [];
  // VARIABLE QUE ALMACENA EL ESTADO SELECCIONADO POR EL USUARIO
  estadoSeleccionado: Estado = new Estado;

  // VECTOR PARA ALMACENAR LOS MUNICIPIOS CORRESPONDIENTES AL ESTADO SELECCIONADO 
  municipiosDeMexico: Municipio[] = [];
  // VARIABLE QUE CONTROLA LOS EVENTOS QUE PUEDEN OCURRIEN EN UN ELEMENTO HTML
  bloquearMunicipio: string = "none"
  // VARIABLE QUE ALMACENA EL MUNICIPIO SELECCIONADO POR EL USUARIO
  municipioSeleccionado: Municipio = new Municipio;

  // VARIABLE PARA LA SUSCRIPCION A UN OBSERVABLE
  subscription: Subscription;

  // VECTOR PARA ALMACENAR LAS EMPRESAS REGISTRADAS EN BD
  empresasRegistradas: Empresa[] = [];
  // VARIABLE QUE ALMACENA LA EMPRESA SELECCIONADA POR EL USUARIO
  empresaSelecionada: Empresa = new Empresa;

  // VECTOR PARA ALMACENAR LOS TIPOS DE HORARIO REGISTRADOS EN BD
  tiposDeHorario: TipoHorario[] = [];
  // VARIABLE QUE ALMACENA EL TIPO DE HORARIO SELCECCIONADO POR EL USUARIO
  horarioSeleccionado: TipoHorario = new TipoHorario;

  // VECTOR PARA ALMACENAR LOS TIPOS DE CONTRATACION REGISTRADOS EN BD
  tiposDeContratacion: TipoContratacion[] = [];
  // VARIABLE QUE ALMACENA EL TIPO DE CONTRATACION SELCECCIONADO POR EL USUARIO
  contratacionSeleccionada: TipoContratacion = new TipoContratacion;

  // VECTOR PARA ALMACENAR LOS TIPOS DE MODALIDAD REGISTRADOS EN BD
  tiposDeModalidad: ModalidadTrabajo[] = [];
  // VARIABLE QUE ALMACENA LA MODALIDAD SELCECCIONADA POR EL USUARIO
  modalidadSeleccionada: ModalidadTrabajo = new ModalidadTrabajo;

  // VARIABLE PARA CONTROLAR UN ELEMENTO HTML
  // PERMITE OCULTAR UN ELEMNTO SEGUN SU VALOR
  // EL VALOR ES RECIBIDO DE UN COMPONENTE EXTERNO
  @Input() programarP: boolean = false;

  // VARIABLE PARA CONTROLAR UN ELEMENTO HTML
  // PERMITE OCULTAR UN ELEMNTO SEGUN SU VALOR
  programarPB: boolean = true;
  preview: boolean=  false;
  // PERMITE CAMBIAR EL FLUJO DE CAPTURA SEGUN SU VALOR
  esProgramada: boolean = false;

  // MODIFICA EL TEXTO DE UN ELEMNTO HTML SEGUN SU VALOR
  textoBoton: string = "PUBLICAR";
  textoBotonF: string = "PUBLICAR";
  textoProgramada: string = "PROGRAMAR VACANTE";

  //DATOS DE LA VACANTE
  // PERMITE OCULTAR UN ELEMENTO SEGUN SU VALOR
  // EL VALOR ES RECIBIDO DE UN COMPONENTE EXTERNO
  @Input() vistaModificacion: boolean = false;

  // ALMACENA UNA VACANTE PARA MOSTRARLA EN PANTALA
  // EL VALOR ES RECIBIDO DE UN COMPONENTE EXTERNO
  @Input() vacante: Vacante = new Vacante;

  // VARIABLES PARA LA CAPTURA DE LOS DATOS DE LA VACANTE
  nombreVacante: string = "";
  especialista: string = "";
  sueldo: number = 6223;
  horario: string = "";
  domicilio: string = "";
  descripcion: string = "";

  // VARIABLES PARA MODIFICAR EL TEXTO DE UN ELEMNTO HTML SEGUN SU VALOR
  textoErrorNombre: string = "Campo Obligatorio*";
  textoErrorSueldo: string = "Campo Obligatorio*";
  textoErrorHorario: string = "Campo Obligatorio*";
  textoErrorDomicilio: string = "Campo Obligatorio*";
  textoErrorDescripcion: string = "Campo Obligatorio*";

  // VARAIBLE QUE LAMACENA LOS DATOS EL EMPLEADOR EN USO
  empleador: Empleador = new Empleador;

  // VARIABLE PARA CONTROLAR LOS EVENTOS DE UN ELEMENTO HTML SEGUN SU VALOR
  verSueldo: string = "none";

  // VARIABLES PÀRA LA CAPTURA DE FECHAS
  // SI LA VACANTE NO ES PROGRAMADA LA FECHA ES CAPTURADA DE MANERA AUTOMATICA
  // SI LA VACANTE ES PROGRAMADA PERMITE LA CAPTURA DE LA FECHA DE PUBLICACION DE UNA VACANTE
  fechaPublicacion: Date = new Date;
  fechaProgramada: Date = new Date;
  publicarAhora: boolean = true;
  fechaPublicacionSrt: any = "";
  pipe = new DatePipe('en-US');

  // VARIABLES PARA LA VALIDACION DE ERRORES
  errorNombre: boolean = true;
  errorEmpresa: boolean = true;
  errorSueldo: boolean = true;
  errorUbicacion: boolean = true;
  errorEstado: boolean = true;
  errorMunicipio: boolean = true;
  errorTipoHorario: boolean = true;
  errorHorarioLaboral: boolean = true;
  errorContratacion: boolean = true;
  errorModalidad: boolean = true;
  errorDescripcion: boolean = true;
  obligatorios: boolean = false;

  // PERMITE OCULTAR UN ELEMENTO SEGUN SU VALOR
  vistaEmpleo: boolean = true;
  ocultarRegistro: boolean = true;

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _UserRequest: InterfaceService,
    private _EmployerRequest: EmployerService,
    private router: Router) {

    // SE INICIALIZARN LOS VECTORES CON ELEMENTOS PREDEFINIDOS 

    // SUSCRIPCION AL OBSERVABLE DE UN SERVICIO PARA OBTENER EMPRESAS
    this.subscription = this._EmployerRequest.getEmpresas().subscribe(data => {
      this.empresasRegistradas = data;
     this.cerrarEmpresas();
    });
  }

  ngOnInit(): void {
    this.iniciarElementos();
    this.buscarUsuario();
    this.obtenerEstados();
    this._EmployerRequest.obtenerEmpresasOb();
    this.obtenerTiposContratacion();
    this.obtenerTiposDeHorario();
    this.obtenerModalidades();
    this.identificarVista();
    this.formatearFecha();
  }

  // FUNCION PARA INICIALIZAR TODOS LOS ELEMNTOS
  iniciarElementos() {
    this.empresaSelecionada = { id_empresa: 0, nombre: "Seleccione una Empresa", descripcion: "", vacantes_empresa: [] }
    this.estadoSeleccionado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.municipioSeleccionado = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado };
    this.horarioSeleccionado = { id_tipoHorario: 0, dias: "Seleccione un Tipo de Horario", tipoHorario_vacantes: [] }
    this.contratacionSeleccionada = { id_tipoContratacion: 0, horario: "Seleccionar tipo de contratación", tipoContratacion_vacantes: [] }
    this.modalidadSeleccionada = { id_modalidad: 0, modalidad: "Seleccionar modalidad de trabajo", modalidadTrabajo_vacantes: [] }
  }

  // FUNCION PARA DESACTIVAR UNA SUSCRIPCION
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // FUNCION QUE EVALUA UNA VARIABLE SEGUN SU ESTATUS 
  // SEGUN EL ESTATUS MOSTRARA UNA PANTALLA U OTRA
  identificarVista() {
    if (this.vistaModificacion == true) {
      const boton = document.getElementsByName("btnProgramar")[0];
      boton.classList.add("fechas");
      this.textoBoton = "ACTUALIZAR";
      this.asignarValores();
    } else {
      this.textoBoton = "PUBLICAR";
    }
  }

  // FUNCION QUE EVALUA UN CONJUNTO DE VALORES 
  // SEGUN EL ESTATUS MOSTRARA UNA PANTALLA U OTRA
  cargarPantalla() {
    if (this.nombreVacante == "" &&
      this.especialista == "" &&
      this.sueldo == 6223 &&
      this.horario == "" &&
      this.domicilio == "" &&
      this.descripcion == "" &&
      this.horario == "") {
      return false;
    } else {
      return true;
    }
  }

  // FUNCION PARA OBTENER LOS DATOS DEL USUARIO ACTUAL DE BD
  buscarUsuario() {
    this._EmployerRequest.obtener().then((data: any) => {
      this.empleador = data
      console.log(this.empleador)
    });
  }

  // FUNCION PARA ASIGANAR LOS VALORES DE LA VACANTE RECIBIDA A LOS CAMPOS DEL FORMULARIO
  asignarValores() {
    this.nombreVacante = this.vacante.nombreVacante;
    this.especialista = this.vacante.especialista;
    this.sueldo = this.vacante.sueldo;
    this.horario = this.vacante.horario;
    this.domicilio = this.vacante.domicilio;
    this.descripcion = this.vacante.descripcion;
    this.empresaSelecionada = this.vacante.empresa;
    this.estadoSeleccionado = this.vacante.municipio.estado;
    this.municipioSeleccionado = this.vacante.municipio;
    this.horarioSeleccionado = this.vacante.tipoHorario;
    this.contratacionSeleccionada = this.vacante.tipoContratacion;
    this.modalidadSeleccionada = this.vacante.modalidadTrabajo;
    this.bloquearMunicipio = "all";
  }

  // FUNCION QUE DA FORMATO A LA FECHA ACTUAL SEGUN UNA PIPE 
  formatearFecha() {
    this.fechaPublicacion = new Date;
    let ChangedFormat = this.pipe.transform(this.fechaPublicacion, 'dd/MM/YYYY');
    this.fechaPublicacionSrt = ChangedFormat;
    console.log(this.fechaPublicacionSrt);
  }

  // FUINCION PARA OBTENER LOS ESTADOS DE BASE DE DATOS
  obtenerEstados() {
    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estadosDeMexico = data;
      console.log(this.estadosDeMexico);
    });
  }

  // FUINCION PARA OBTENER LAS EMPRESAS DE BASE DE DATOS
  obtenerTiposDeHorario() {
    this._EmployerRequest.obtenerTiposDehorario().subscribe(data => {
      this.tiposDeHorario = data;
      console.log(this.tiposDeHorario);
    });
  }

  // FUINCION PARA OBTENER LOS TIPOS DE CONTRATACION DE BASE DE DATOS
  obtenerTiposContratacion() {
    this._EmployerRequest.obtenerTiposContratacion().subscribe(data => {
      this.tiposDeContratacion = data;
      console.log(this.tiposDeContratacion);
    });
  }

  // FUINCION PARA OBTENER LOS TIPOS DE CONTRATACION DE BASE DE DATOS
  obtenerModalidades() {
    this._EmployerRequest.obtenerModalidades().subscribe(data => {
      this.tiposDeModalidad = data;
      console.log(this.tiposDeModalidad);
    });
  }

  // FUNCION QUE ALMACENA EN UNA VARIABLE EL MUNICIPIO SELECCIONADO POR EL USUARIO
  actualizarEstado(estado: Estado) {
    this.estadoSeleccionado = estado;
    // LLAMDO A LA FUNCION DE OPTENCION DE MUNICIPIOS
    this._UserRequest.obtenerMunicipios(this.estadoSeleccionado.id_estado).subscribe(data => {
      this.municipiosDeMexico = data;
      console.log(this.municipiosDeMexico);
    });
    this.municipioSeleccionado = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado };
    this.bloquearMunicipio = "all";
  }

  // FUNCION PARA GUARADAR EL MUNICIPIO
  actualizarMunicipio(municipio: Municipio) {
    this.municipioSeleccionado = municipio;
  }

  // FUNCION PARA GUARADAR LA EMPRESA
  actualizarEmpresa(empresa: Empresa) {
    this.empresaSelecionada = empresa;
  }

  // FUNCION PARA GUARADAR EL HORARIO
  actualizarHorario(horario: TipoHorario) {
    this.horarioSeleccionado = horario;
  }

  // FUNCION PARA GUARADAR LA CONTRATACION
  actualizarContratacion(contratacion: TipoContratacion) {
    this.contratacionSeleccionada = contratacion;
  }

  // FUNCION PARA GUARADAR LA MODALIDAD
  actualizarModalidad(modalidad: ModalidadTrabajo) {
    this.modalidadSeleccionada = modalidad;
  }

  // FUNCION QUE ACTIVA LOS ELEMENTOS HTML DEL FORMULARIO 
  // ELEMNTOS NECESARIOS PARA PROGRAMAR UNA VACANTE
  verProgramar() {
    this.activarProgramada();
    this.fechaProgramada = new Date;
  //  this.programarP = true;

    if(this.publicarAhora == false){
      this.publicarAhora = true;
    } else {
      this.publicarAhora = false;
    }
  }

  activarProgramada(){
    const boton = document.getElementsByName("btnProgramar")[0];
    const fechas = document.getElementsByName("fechaP")[0];
    if(this.textoProgramada === "PROGRAMAR VACANTE"){
      this.textoProgramada = "LA VACANTE ES PROGRAMADA";
      this.programarPB = false;
      boton.classList.add("activarBtn");
      fechas.classList.remove("fechas");
      this.textoBotonF = "PROGRAMAR";
    } else if(this.textoProgramada === "LA VACANTE ES PROGRAMADA"){
      this.textoProgramada = "PROGRAMAR VACANTE";
      this.programarPB = true;
      boton.classList.remove("activarBtn");
      fechas.classList.add("fechas");
      this.textoBotonF = "PUBLICAR";
    }
  }

  // FUNCION QUE OCULTA LOS ERRORES DE CAPTURA 
  activartodo() {
    this.errorNombre = true;
    this.errorEmpresa = true;
    this.errorSueldo = true;
    this.errorUbicacion = true;
    this.errorEstado = true;
    this.errorMunicipio = true;
    this.errorTipoHorario = true;
    this.errorHorarioLaboral = true;
    this.errorContratacion = true;
    this.errorModalidad = true;
    this.errorDescripcion = true;
    this.obligatorios = true;
  }

  // FUNCION PARA MOSTRAR LA VISTA REGISTRO DE MEPRESA
  RegistarEmpresa() {
    const panel = document.getElementsByName("crearEmpresa")[0];
    panel.classList.add("mostrar");
    this.ocultarRegistro = false;
  }

  // FUNCION QUE EVALUA LA FECHA INGRESADA PARA LA PUBLICACION DE LA VACANTE
  // NO SE PERMITEN FECHAS ANTERIORES
  // HAY UN RANGO DE TIEMPO PARA PROGRAMAR A FUTURO
  validarProgramar() {
    this.activartodo();
    var hoy = new Date;
    var fechaP = new Date(this.fechaProgramada);
    let ChangedFormat = this.pipe.transform(this.fechaProgramada, 'dd/MM/YYYY');
    let ChangedFormat2 = this.pipe.transform(hoy, 'dd/MM/YYYY');

    let anioH = hoy.getFullYear();
    let anioP = fechaP.getFullYear();

    let mesH = hoy.getMonth();
    let mesP = fechaP.getMonth();

    let diaH = hoy.getDay();
    let diaP = fechaP.getDay();

    if (ChangedFormat2 == ChangedFormat) {
      this.fechaPublicacionSrt = ChangedFormat;
     // this.enviarAlerta("No se pueden programar vacantes para el dia de hoy.", true);
      //this.obligatorios = false;
    } else {
      if (anioH != anioP) {
        if (anioH > anioP) {
          this.enviarAlerta("N se pueden programar vacantes para años pasados.", true);
          this.obligatorios = false;
        } else {
            this.enviarAlerta("No se pueden programar vacantes para años futuros.", true);
          this.obligatorios = false;
        }
      } else {
        if (mesH == mesP) {
          if (diaH > diaP) {
              this.enviarAlerta("No se pueden programar vacantes para dias pasados.", true);
            this.obligatorios = false;
          } else {
            this.fechaPublicacionSrt = ChangedFormat;
          }
        } else if (mesH > mesP) {
            this.enviarAlerta("No se pueden programar vacantes para meses pasados.", true);
          this.obligatorios = false;
        } else {
          this.fechaPublicacionSrt = ChangedFormat;
        }
      }
    }
    this.validarInformacionII();
  }

  // FUNCION PARA FORMAR EL JSON Y ASIGINAR LOS DATOS PARA EL ENVIO
  // FUNCION PARA VACANTES PROGRAMADAS
  validarInformacionII() {
    this.publicarAhora = false;
    this.esProgramada = true;
    this.activartodo();

    const VACANTE = {
      id_vacante: this.vacante.id_vacante,
      nombreVacante: this.nombreVacante,
      especialista: this.especialista,
      sueldo: this.sueldo,
      id_empresa: this.empresaSelecionada.id_empresa,
      horario: this.horario,
      id_estado:this.municipioSeleccionado.estado.id_estado,
      id_municipio: this.municipioSeleccionado.id_municipio,
      descripcion: this.descripcion,
      id_empleador: this.empleador.id_empleador,
      id_tipoHorario: this.horarioSeleccionado.id_tipoHorario,
      id_tipoContratacion: this.contratacionSeleccionada.id_tipoContratacion,
      id_modalidadTrabajo: this.modalidadSeleccionada.id_modalidad,
      domicilio: this.domicilio,
      fechaPublicacionStr: this.fechaPublicacionSrt?.toString(),
      publicarAhora: this.publicarAhora,
    }
    this.validarNombre(VACANTE);
  }

  // FUNCION PARA FORMAR EL JSON Y ASIGINAR LOS DATOS PARA EL ENVIO
  validarInformacion() {
    this.esProgramada = false;
    this.publicarAhora = true;
    this.activartodo();
    this.formatearFecha();

    const VACANTE = {
      id_vacante: this.vacante.id_vacante,
      nombreVacante: this.nombreVacante,
      especialista: this.especialista,
      sueldo: this.sueldo,
      id_empresa: this.empresaSelecionada.id_empresa,
      horario: this.horario,
      id_estado:this.municipioSeleccionado.estado.id_estado,
      id_municipio: this.municipioSeleccionado.id_municipio,
      descripcion: this.descripcion,
      id_empleador: this.empleador.id_empleador,
      id_tipoHorario: this.horarioSeleccionado.id_tipoHorario,
      id_tipoContratacion: this.contratacionSeleccionada.id_tipoContratacion,
      id_modalidadTrabajo: this.modalidadSeleccionada.id_modalidad,
      domicilio: this.domicilio,
      fechaPublicacionStr: this.fechaPublicacionSrt?.toString(),
      publicarAhora: this.publicarAhora,
    }
    this.validarNombre(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO NOMBRE 
  validarNombre(VACANTE: any) {
    if (this.nombreVacante == "") {
      this.textoErrorNombre = "Campo Obligatorio*"
      this.obligatorios = false;
      this.errorNombre = false;
    } else if (this.nombreVacante.length < 4) {
      this.textoErrorNombre = "Valor Invalido*"
      this.obligatorios = false;
      this.errorNombre = false;
    } else {

    }
    this.validarSueldo(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO SUELDO 
  validarSueldo(VACANTE: any) {
    if (this.sueldo == 0) {
      this.textoErrorSueldo = "Campo Obligatorio*"
      this.obligatorios = false;
      this.errorSueldo = false;
    } else if (this.sueldo < 6223) {
      this.textoErrorSueldo = "Valor Invalido*"
      this.obligatorios = false;
      this.errorSueldo = false;
    } else {

    }
    this.validarEmpresa(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO EMPRESA 
  validarEmpresa(VACANTE: any) {
    if (this.empresaSelecionada.id_empresa == 0) {
      this.obligatorios = false;
      this.errorEmpresa = false;
    } else {

    }
    this.validarHorario(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO HORARIO STRING 
  validarHorario(VACANTE: any) {
    if (this.horario == "") {
      this.textoErrorHorario = "Campo Obligatorio*"
      this.obligatorios = false;
      this.errorHorarioLaboral = false;
    } else if (this.horario.length < 10) {
      this.textoErrorHorario = "Valor Invalido*"
      this.obligatorios = false;
      this.errorHorarioLaboral = false;
    } else {

    }
    this.validarTipoHorario(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO HORARIO 
  validarTipoHorario(VACANTE: any) {
    if (this.horarioSeleccionado.id_tipoHorario == 0) {
      this.obligatorios = false;
      this.errorTipoHorario = false;
    } else {

    }
    this.validarModalidad(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO MODALIDAD 
  validarModalidad(VACANTE: any) {
    if (this.modalidadSeleccionada.id_modalidad == 0) {
      this.obligatorios = false;
      this.errorModalidad = false;

    } else {

    }
    this.validarContratacion(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO CONTRATACION 
  validarContratacion(VACANTE: any) {
    if (this.contratacionSeleccionada.id_tipoContratacion == 0) {
      this.obligatorios = false;
      this.errorContratacion = false;
    } else {

    }
    this.validarUbicacion(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO UBICACION 
  validarUbicacion(VACANTE: any) {
    if (this.domicilio == "") {
      this.textoErrorDomicilio = "Campo Obligatorio*"
      this.obligatorios = false;
      this.errorUbicacion = false;
    } else if (this.domicilio.length < 10) {
      this.textoErrorDomicilio = "Valor Invalido*"
      this.obligatorios = false;
      this.errorUbicacion = false;
    } else {

    }
    this.validarEstado(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO ESTADO 
  validarEstado(VACANTE: any) {
    if (this.estadoSeleccionado.id_estado == 0) {
      this.obligatorios = false;
      this.errorEstado = false;
    } else {

    }
    this.validarMunicipo(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO MUNICIPIO 
  validarMunicipo(VACANTE: any) {
    if (this.municipioSeleccionado.id_municipio == 0) {
      this.obligatorios = false;
      this.errorMunicipio = false;
    } else {

    }
    this.validarDescripcion(VACANTE);
  }

  // FUNCION PARA EVALUAR EL CAMPO CAPTURADO PARA EL ATRIBUTO DESCRIPCION 
  validarDescripcion(VACANTE: any) {
    if (this.descripcion == "") {
      this.textoErrorDescripcion = "Campo Obligatorio*";
      this.obligatorios = false;
      this.errorDescripcion = false;
    } else if (this.descripcion.length < 10) {
      this.textoErrorDescripcion = "Valor Invalido*";
      this.obligatorios = false;
      this.errorDescripcion = false;
    } else {

    }
    this.cambiarFlujo(VACANTE);
  }

  // FUNCION PARA CAMBIAR EL FLUJO SEGUN UNA VARIABLE
  cambiarFlujo(VACANTE: any) {
    if (this.vistaModificacion == true) {
      this.modificarVacante(VACANTE);
    } else {
      if (this.esProgramada == true) {
        this.programarVacante(VACANTE);
      } else {
        this.generarVacante(VACANTE);
      }
    }
  }

  // FUNCION QUE PERMITE GUARDAR UNA VACANTE PARA SER PUBLICADA EN UNA FECHA SEÑALADA 
  programarVacante(VACANTE: any) {
    if (this.obligatorios != false) {
      this._EmployerRequest.programarVacante(VACANTE).then((id_vacante: any) => {
        if (id_vacante == 0) {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio generar la vacante.", true);
          console.log(VACANTE);
          this.enviarAlertaErrorProg(VACANTE);
        } else {
          this.enviarAlerta("La vacante fue generada correctamente y sera publcada en la fecha señalada.", false);
          console.log(VACANTE);
          this.enviarAlertaExitoProg(VACANTE);
          this.limpiarCampos();
          this.programarPB = true;
          this.programarP = false;
          this.esProgramada = false;
        }
      });
    } else {

    }
  }

  // FUNCION QUE PERMITE MODIFICAR UNA VACANTE SELECCIONADA
  modificarVacante(VACANTE: any) {
    if (this.obligatorios != false) {
      this._EmployerRequest.modificarVacante(VACANTE).then((data: any) => {
        if (data.estatus != true) {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar la vacante.", true);
          console.log(VACANTE);
          this.enviarAlertaErrorMod(VACANTE);
        } else {
          this.enviarAlerta("La vacante fue modificada correctamente.", false);
          console.log(VACANTE);
          this.enviarAlertaExitoMod(VACANTE);
          this.limpiarCampos();
          this.router.navigate(['interface/publicaciones']);

        }
      });
    } else {

    }
  }

  vacantePre: Vacante = new Vacante

  vistaPrevia(){
      this.vacantePre.id_vacante =  this.vacante.id_vacante,
      this.vacantePre.nombreVacante =  this.nombreVacante,
      this.vacantePre.especialista =  this.especialista,
      this.vacantePre.sueldo =  this.sueldo,
      this.vacantePre.horario =  this.horario,
      this.vacantePre.domicilio = this.domicilio,
      this.vacantePre.fechaPublicacionSrt =  "",
      this.vacantePre.diasPublicada =  0,
      this.vacantePre.municipio =  this.municipioSeleccionado,
      this.vacantePre.estado = this.estadoSeleccionado,
      this.vacantePre.estatus = true,
      this.vacantePre.descripcion =  this.descripcion,
      this.vacantePre.empresa =  this.empresaSelecionada,
      this.vacantePre.empleador =  this.empleador,
      this.vacantePre.candidatos = [],
      this.vacantePre.tipoHorario =  this.horarioSeleccionado,
      this.vacantePre.tipoContratacion =  this.contratacionSeleccionada,
      this.vacantePre.modalidadTrabajo =  this.modalidadSeleccionada,
      this.vacantePre.id_postulacion = 0,

    this._UserRequest.actualizarVacante(this.vacantePre);
    const panel = document.getElementsByName("vistaVacante")[0];
    panel.classList.add("mostrar");
    this.preview = true;
  }

  cerrar(){
    this.preview = false;
    this.vacantePre = new Vacante;
    this._UserRequest.actualizarVacante(this.vacantePre);
    const panel = document.getElementsByName("vistaVacante")[0];
    panel.classList.remove("mostrar");
  }

  cerrarEmpresas(){
    this.ocultarRegistro = true;
    const panel = document.getElementsByName("crearEmpresa")[0];
    panel.classList.remove("mostrar");
  }

  // FUNCION PARA PUBLICAR LA VACANTE DE MANERA AUTOMATICA
  generarVacante(VACANTE: any) {
    if (this.obligatorios != false) {
      this._EmployerRequest.publicarVacante(VACANTE).then((id_vacante: any) => {
        if (id_vacante == 0) {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio publicar la vacante.", true);
          console.log(VACANTE);
          this.enviarAlertaError(VACANTE);
        } else {
          this.enviarAlerta("La vacante fue publicada correctamente y ya se encuentra disponible en la aplicación.", false);
          console.log(VACANTE);
          this.enviarAlertaExito(VACANTE);
          this.limpiarCampos();
          this.programarPB = true;
          this.programarP = false;
          this.esProgramada = false;
        }
      });
    } else {

    }
  }

  // FUNCION PARA LIMPIAR LOS CAMPOS DEL FORMULARIO
  limpiarCampos() {
    this.nombreVacante = "";
    this.especialista = "";
    this.sueldo = 6223;
    this.horario = "";
    this.domicilio = "";
    this.descripcion = "";
    this.bloquearMunicipio = "none";
    this.iniciarElementos();
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaExito(vacante: any) {
    const ALERTA = {
      nombreAlerta: "Vacante Publicada",
      textoAlerta: "Se ha publicado la vacante " + vacante.nombreVacante +
        " bajo el nombre de la empresa " + this.empresaSelecionada.nombre +
        " si usted no hizo esta publicación o cometio un error durante la captura de los datos solicitados de la vacante" +
        " podras eliminarla o modificarla desde el apartado PUBLICACIONES"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaError(vacante: any) {
    const ALERTA = {
      nombreAlerta: "Error de Publicación",
      textoAlerta: "La vacante " + vacante.nombreVacante +
        " de la empresa " + this.empresaSelecionada.nombre +
        " no ha podido publicarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaExitoMod(vacante: Vacante) {
    const ALERTA = {
      nombreAlerta: "Vacante Modificada",
      textoAlerta: "Se ha modificado la vacante " + vacante.nombreVacante +
        " bajo el nombre de la empresa " + this.empresaSelecionada.nombre +
        " si usted no hizo esta modificacion o cometio un error durante la captura de los datos solicitados de la vacante" +
        " podras eliminarla o modificarla desde el apartado PUBLICACIONES"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaErrorMod(vacante: any) {
    const ALERTA = {
      nombreAlerta: "Error de Modificación",
      textoAlerta: "La vacante " + vacante.nombreVacante +
        " de la empresa " + this.empresaSelecionada.nombre +
        " no ha podido modificarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaErrorProg(vacante: any) {
    const ALERTA = {
      nombreAlerta: "Error de Carga",
      textoAlerta: "La vacante " + vacante.nombreVacante +
        " de la empresa " + this.empresaSelecionada.nombre +
        " no ha podido cargarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaExitoProg(vacante: any) {
    const ALERTA = {
      nombreAlerta: "Vacante Programada con Exito",
      textoAlerta: "La vacante " + vacante.nombreVacante +
        " de la empresa " + this.empresaSelecionada.nombre +
        " ha sido cargada correctamente y sera publicada en la fecha seleccionada (" + this.fechaPublicacionSrt?.toString() + ") a primera hora. Si tu no has realizado esta acción podras " +
        "eliminar esta vacante desde el apartado PUBLICACIONES en el apartado vacantes por publicar"
    }

    this._UserRequest.agregarAlerta(ALERTA);
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
