import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
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
export class NewJobComponent implements OnInit {

  estadosDeMexico: Estado[] = [];
  estadoSeleccionado: Estado = new Estado;

  municipiosDeMexico: Municipio[] = [];
  municipioSeleccionado: Municipio = new Municipio;
  bloquearMunicipio: string = "none"

  empresasRegistradas: Empresa[] = [];
  empresaSelecionada: Empresa;

  tiposDeHorario: TipoHorario[] = [];
  horarioSeleccionado: TipoHorario;

  tiposDeContratacion: TipoContratacion[] = [];
  contratacionSeleccionada: TipoContratacion;

  tiposDeModalidad: ModalidadTrabajo[] = [];
  modalidadSeleccionada: ModalidadTrabajo;

  @Input() programarP: boolean = false;
  programarPB: boolean = true;

  esProgramada:boolean = false;

  textoBoton: string = "PUBLICAR";
  textoBotonF: string = "PROGRAMAR";

  //DATOS DE LA VACANTE
  @Input() vistaModificacion: boolean = false;
  @Input() vacante: Vacante = new Vacante;

  nombreVacante: string = "";
  textoErrorNombre: string = "Campo Obligatorio*";

  especialista: string = "";

  sueldo: number = 6223;
  textoErrorSueldo: string = "Campo Obligatorio*";

  horario: string = "";
  textoErrorHorario: string = "Campo Obligatorio*";

  domicilio: string = "";
  textoErrorDomicilio: string = "Campo Obligatorio*";

  descripcion: string = "";
  textoErrorDescripcion: string = "Campo Obligatorio*";

  empleador: Empleador = new Empleador;
  verSueldo: string = "none";

  fechaPublicacion: Date = new Date;
  fechaProgramada: Date = new Date;
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

  constructor(private _UserRequest: InterfaceService, private _EmployerRequest: EmployerService, private router: Router) {
    this.empresaSelecionada = { id_empresa: 0, nombre: "Seleccione una Empresa", descripcion: "", vacantes_empresa: [] }
    this.estadoSeleccionado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.municipioSeleccionado = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado };
    this.horarioSeleccionado = { id_tipoHorario: 0, dias: "Seleccione un Tipo de Horario", tipoHorario_vacantes: [] }
    this.contratacionSeleccionada = { id_tipoContratacion: 0, horario: "Seleccionar tipo de contratación", tipoContratacion_vacantes: [] }
    this.modalidadSeleccionada = { id_modalidad: 0, modalidad: "Seleccionar modalidad de trabajo", modalidadTrabajo_vacantes: [] }
  }

  ngOnInit(): void {

    this.buscarUsuario();
    this.obtenerEstados();
    this.obtenerEmpresas();
    this.obtenerTiposContratacion();
    this.obtenerTiposDeHorario();
    this.obtenerModalidades();
    this.identificarVista();
    this.formatearFecha();
  }

  identificarVista() {
    if (this.vistaModificacion == true) {
      this.textoBoton = "ACTUALIZAR";
      this.asignarValores();
    } else {
      this.textoBoton = "PUBLICAR";
    }
  }

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

  formatearFecha() {
    this.fechaPublicacion = new Date;
    let ChangedFormat = this.pipe.transform(this.fechaPublicacion, 'dd/MM/YYYY');
    this.fechaPublicacionSrt = ChangedFormat;
    console.log(this.fechaPublicacionSrt);
  }

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

  buscarUsuario() {
    this._EmployerRequest.obtener().then((data: any) => {
      this.empleador = data
      console.log(this.empleador)
    });
  }

  // FUINCION PARA OBTENER LOS ESTADOS DE BASE DE DATOS
  obtenerEstados() {
    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estadosDeMexico = data;
      console.log(this.estadosDeMexico);
    });
  }

  // FUINCION PARA OBTENER LAS EMPRESAS DE BASE DE DATOS
  obtenerEmpresas() {
    this._EmployerRequest.obtenerEmpresas().subscribe(data => {
      this.empresasRegistradas = data;
      console.log(this.empresasRegistradas);
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

  publicarAhora:boolean = true;

  verProgramar() {

    this.fechaProgramada = new Date;
    this.programarPB = false;
    this.programarP = true;
    this.publicarAhora = false;
  }

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
      alert("no se pueden programar vacantes para hoy");
      this.obligatorios = false;
    } else {
      if (anioH != anioP) {
        if (anioH > anioP) {
          alert("no se pueden programar vacantes para años pasados");
          this.obligatorios = false;
        } else {
          alert("no se pueden programar vacantes para años futuros");
          this.obligatorios = false;
        }
      } else {
        if (mesH == mesP) {
          if (diaH > diaP) {
            alert("no se pueden programar vacantes para dias pasados");
            this.obligatorios = false;
          } else {
            this.fechaPublicacionSrt = ChangedFormat;
          }
        } else if (mesH > mesP) {
          alert("no se pueden programar vacantes para meses pasados");
          this.obligatorios = false;
        } else {
          this.fechaPublicacionSrt = ChangedFormat;
        }
      }
    }

    this.validarInformacionII();
  }

  validarInformacionII() {
    this.publicarAhora = false;
    this.activartodo();
    const VACANTE = {
      id_vacante: this.vacante.id_vacante,
      nombreVacante: this.nombreVacante,
      especialista: this.especialista,
      sueldo: this.sueldo,
      id_empresa: this.empresaSelecionada.id_empresa,
      horario: this.horario,
      id_municipio: this.municipioSeleccionado.id_municipio,
      descripcion: this.descripcion,
      id_empleador: this.empleador.id_empleador,
      id_tipoHorario: this.horarioSeleccionado.id_tipoHorario,
      id_tipoContratacion: this.contratacionSeleccionada.id_tipoContratacion,
      id_modalidadTrabajo: this.modalidadSeleccionada.id_modalidad,
      domicilio: this.domicilio,
      fechaPublicacionSrt: this.fechaPublicacionSrt?.toString()
    }

    this.validarNombre(VACANTE);
  }


  validarInformacion() {
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
      id_municipio: this.municipioSeleccionado.id_municipio,
      descripcion: this.descripcion,
      id_empleador: this.empleador.id_empleador,
      id_tipoHorario: this.horarioSeleccionado.id_tipoHorario,
      id_tipoContratacion: this.contratacionSeleccionada.id_tipoContratacion,
      id_modalidadTrabajo: this.modalidadSeleccionada.id_modalidad,
      domicilio: this.domicilio,
      fechaPublicacionSrt: this.fechaPublicacionSrt?.toString(),
      publicarAhora:this.publicarAhora,
    }

    this.validarNombre(VACANTE);
  }

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

  validarEmpresa(VACANTE: any) {
    if (this.empresaSelecionada.id_empresa == 0) {
      this.obligatorios = false;
      this.errorEmpresa = false;
    } else {

    }
    this.validarHorario(VACANTE);
  }

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

  validarTipoHorario(VACANTE: any) {
    if (this.horarioSeleccionado.id_tipoHorario == 0) {
      this.obligatorios = false;
      this.errorTipoHorario = false;
    } else {

    }
    this.validarModalidad(VACANTE);
  }

  validarModalidad(VACANTE: any) {
    if (this.modalidadSeleccionada.id_modalidad == 0) {
      this.obligatorios = false;
      this.errorModalidad = false;

    } else {

    }
    this.validarContratacion(VACANTE);
  }

  validarContratacion(VACANTE: any) {
    if (this.contratacionSeleccionada.id_tipoContratacion == 0) {
      this.obligatorios = false;
      this.errorContratacion = false;
    } else {

    }
    this.validarUbicacion(VACANTE);
  }

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

  validarEstado(VACANTE: any) {
    if (this.estadoSeleccionado.id_estado == 0) {
      this.obligatorios = false;
      this.errorEstado = false;
    } else {

    }
    this.validarMunicipo(VACANTE);
  }

  validarMunicipo(VACANTE: any) {
    if (this.municipioSeleccionado.id_municipio == 0) {
      this.obligatorios = false;
      this.errorMunicipio = false;
    } else {

    }
    this.validarDescripcion(VACANTE);
  }
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

  cambiarFlujo(VACANTE: any) {
    if (this.vistaModificacion == true) {
      this.modificarVacante(VACANTE);
    } else {
      if(this.esProgramada == true){
        this.programarVacante(VACANTE);
      } else {
      this.generarVacante(VACANTE);
      }
    }
  }

  programarVacante(VACANTE:any){
    if (this.obligatorios != false) {
      this._EmployerRequest.programarVacante(VACANTE).then((data: any) => {
        if (data.estatus != true) {
          alert("ha ocurrido un error");
          console.log(VACANTE);
          this.enviarAlertaErrorProg(VACANTE);
        } else {
          alert("la vacante sera publicada en la fecha señalada");
          console.log(VACANTE);
          this.enviarAlertaExitoProg(VACANTE);
          this.limpiarCampos();

        }
      });
    } else {

    }
  }

  modificarVacante(VACANTE: any) {
    if (this.obligatorios != false) {
      this._EmployerRequest.modificarVacante(VACANTE).then((data: any) => {
        if (data.estatus != true) {
          alert("ha ocurrido un error");
          console.log(VACANTE);
          this.enviarAlertaErrorMod(VACANTE);
        } else {
          alert("la vacante fue modificada correctamente");
          console.log(VACANTE);
          this.enviarAlertaExitoMod(VACANTE);
          this.limpiarCampos();
          this.router.navigate(['interface/publicaciones']);

        }
      });
    } else {

    }
  }

  generarVacante(VACANTE: any) {
    if (this.obligatorios != false) {
      this._EmployerRequest.publicarVacante(VACANTE).then((id_vacante: any) => {
        if (id_vacante == 0) {
          alert("ha ocurrido un error");
          console.log(VACANTE);
          this.enviarAlertaError(VACANTE);
        } else {
          alert("la vacante fue publicada correctamente");
          console.log(VACANTE);
          this.enviarAlertaExito(VACANTE);
          this.limpiarCampos();
        }
      });
    } else {

    }
  }

  limpiarCampos() {
    this.nombreVacante = "";
    this.especialista = "";
    this.sueldo = 6223;
    this.horario = "";
    this.domicilio = "";
    this.descripcion = "";
    this.bloquearMunicipio = "none";
    this.empresaSelecionada = { id_empresa: 0, nombre: "Seleccione una Empresa", descripcion: "", vacantes_empresa: [] }
    this.estadoSeleccionado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.municipioSeleccionado = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado };
    this.horarioSeleccionado = { id_tipoHorario: 0, dias: "Seleccione un Tipo de Horario", tipoHorario_vacantes: [] }
    this.contratacionSeleccionada = { id_tipoContratacion: 0, horario: "Seleccionar tipo de contratación", tipoContratacion_vacantes: [] }
    this.modalidadSeleccionada = { id_modalidad: 0, modalidad: "Seleccionar modalidad de trabajo", modalidadTrabajo_vacantes: [] }
  }


  enviarAlertaExito(vacante: any) {
    console.log(vacante);

    const ALERTA = {
      nombreAlerta: "Vacante Publicada",
      textoAlerta: "Se ha publicado la vacante " + vacante.nombreVacante +
        " bajo el nombre de la empresa " + this.empresaSelecionada.nombre +
        " si usted no hizo esta publicación o cometio un error durante la captura de los datos solicitados de la vacante" +
        " podras eliminarla o modificarla desde el apartado PUBLICACIONES"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaError(vacante: any) {
    console.log(vacante);

    const ALERTA = {
      nombreAlerta: "Error de Publicación",
      textoAlerta: "La vacante " + vacante.nombreVacante +
        " de la empresa " + this.empresaSelecionada.nombre +
        " no ha podido publicarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaExitoMod(vacante: Vacante) {
    console.log(vacante);

    const ALERTA = {
      nombreAlerta: "Vacante Modificada",
      textoAlerta: "Se ha modificado la vacante " + vacante.nombreVacante +
        " bajo el nombre de la empresa " + this.empresaSelecionada.nombre +
        " si usted no hizo esta modificacion o cometio un error durante la captura de los datos solicitados de la vacante" +
        " podras eliminarla o modificarla desde el apartado PUBLICACIONES"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaErrorMod(vacante: any) {
    console.log(vacante);

    const ALERTA = {
      nombreAlerta: "Error de Modificación",
      textoAlerta: "La vacante " + vacante.nombreVacante +
        " de la empresa " + this.empresaSelecionada.nombre +
        " no ha podido modificarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaErrorProg(vacante: any) {
    console.log(vacante);

    const ALERTA = {
      nombreAlerta: "Error de Carga",
      textoAlerta: "La vacante " + vacante.nombreVacante +
        " de la empresa " + this.empresaSelecionada.nombre +
        " no ha podido cargarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaExitoProg(vacante: any) {
    console.log(vacante);

    const ALERTA = {
      nombreAlerta: "Vacante Programada con Exito",
      textoAlerta: "La vacante " + vacante.nombreVacante +
        " de la empresa " + this.empresaSelecionada.nombre +
        " ha sido cargada correctamente y sera publicada en la fecha seleccionada ("+this.fechaPublicacionSrt?.toString()+") a primera hora. Si tu no has realizado esta acción podras "+
        "eliminar esta vacante desde el apartado PUBLICACIONES en el apartado vacantes por publicar"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }
}
