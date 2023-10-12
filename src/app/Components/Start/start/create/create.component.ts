import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { CompanyService } from 'src/app/Services/CompanyServices/company.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Estado } from 'src/app/Services/Entity/estado';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  // COMUNICACION ENTRE COMPONENTES
  // PERMITE CAMBIAR LA VISTA ENTRE EL COMPONENTE CREATE Y EL COMPONENTE LOGIN
  @Output() viewCreate = new EventEmitter<boolean>();
  @Output() viewLogin = new EventEmitter<boolean>();
  @Output() ocultarRegistro = new EventEmitter<boolean>();

  // VECTORRES NECESARIOS
  estadosMexico: Estado[] = [];
  municipiosMexico: Municipio[] = [];
  ladasMexico = ["+51", "+52", "+53"]; // CAMBIAR POR UN OBSERBABLE
  //contenerNumero = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+"];

  // VARIABLES MANIPULAR ENTORNO
  // CUANDO LA VARIABLE usuarioAdmin ESTA ACTIVA INDICA QUE EL COMPONENTE ESTA EL EL MODULO ADMINISTRAR
  // CUANDO LA VARIABLE componetStart ESTA ACTIVA INDICA QUE EL COMPONENTE ESTA EL EL MODULO LOGIN
  @Input() vistaEmpleo: boolean = false;
  @Input() usuarioAdmin: boolean = false;
  componetStart: boolean = true;

  // LA VARIABLE tipoUsurio ALMACENA EL TIPO DE USUARIO QUE SE REGISTRARA (ADMIN, EMPRESA, CANDIDATO, EMPLEADOR) 
  // LA VARIABLE descripcionDelUSuario LE INDICA AL USUARIO LOS ALCANCES QUE TENDRA LA CUENTA QUE CREARA
  tipoUsurio: String = "";
  descripcionDelUSuario: string = "";

  // LA VARIABLE verUsuariosPrincipales MUESTRA EN PANTALLA LOS FORMULARIOS DE REGISTRO PARA CANDIDATO Y EMPLEADOR 
  // LA VARIABLE verAdministrador MUESTRA EN PANTALLA EL FORMULARIO DE REGISTRO PARA ADMINISTRADORES 
  // LA VARIABLE verEmpresa MUESTRA EN PANTALLA EL FORMULARIO DE REGISTRO PARA EMPRESAS 
  verUsuariosPrincipales: boolean = false;
  verAdministrador: boolean = true;
  verEmpresa: boolean = true;

  // LA VARIABLE verNombre MUESTRA EN PANTALLA EL INPUT DE CAPTURA DE NOMBRE
  // LA VARIABLE verApellidos MUESTRA EN PANTALLA LOS INPUTS DE CAPTURA DE APELLIDOS
  // LA VARIABLE verEdadyTelefono MUESTRA EN PANTALLA LOS INPUTS DE CAPTURA DE TELEFONO Y EDAD
  // LA VARIABLE verUbicacion MUESTRA EN PANTALLA LOS INPUTS DE CAPTURA DE UBICACION
  // LA VARIABLE verCorreo MUESTRA EN PANTALLA EL INPUT DE CAPTURA DE CORREO
  // LA VARIABLE verContrasenas MUESTRA EN PANTALLA LOS INPUTS DE CAPTURA DE CONTRASEÑAS
  // LA VARIABLE verDescripcion MUESTRA EN PANTALLA EL INPUT DE CAPTURA DE DESCRIPCION
  verNombre: boolean = true;
  verApellidos: boolean = true;
  verEdadyTelefono: boolean = true;
  verUbicacion: boolean = true;
  verCorreo: boolean = true;
  verContrasenas: boolean = true;
  verDescripcion: boolean = true;

  // VALIDACION DE CAMPOS OBLIGATORIOS 
  // LA VARIABLE Obligatorios INDICA QUE SE HAN CAPTURADO LOS CAMPOS OBLIGATORIOS DE LAS CUENTAS DE TIPO CANDIDATO
  Obligatorios: boolean = true;

  // VARIABLES PARA LA CAPTURA DE DATOS
  nombre: string = "";
  apellidoP: string = "";
  apellidoM: string = "";
  edad: number;
  lada: string;
  numeroTelefonioco: string = "";
  ubicacion: string = "";
  estado: Estado = new Estado;
  municipio: Municipio = new Municipio;
  descripcion: String = "";
  correo: string = "";
  contrasena: string = "";
  contrasenaValidacion: string = "";
  nacimiento: Date = new Date;
  nacimientoSrt: any = "";
  pipe = new DatePipe('en-US');

  // VALIDACION NOMBRE COMPLETO
  // LA VARIABLE validarNombre AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO NOMBRE DE UN USUARIO
  // LA VARIABLE validarApellidoP AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO APELLIDO DE UN USUARIO
  // LA VARIABLE validarApellidoM AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO APELLIDO DE UN USUARIO
  validarNombre: boolean = true;
  validarApellidoP: boolean = true;
  validarApellidoM: boolean = true;

  // LA VARIABLE validarNombreRegistrado AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO NOMBRE DE UNA EMPRESA
  // ESTE ERROR SE ACTIVA CUANDO EL NOMBRE DE LA EMPRESA YA EXISTE EN BASE DE DATOS
  validarNombreRegistrado: boolean = true;

  // VALIDACION EDAD
  // LA VARIABLE validarEdad AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO EDAD DE UN USUARIO
  // LA VARIABLE mensajeEdad CAMBIA EL MENSAJE DEL ERROR MOSTRADO EN LA CAPTURA DE LA EDAD DEL USUARIO
  validarEdad: boolean = true;
  mensajeEdad: string = "Campo obligatorio*"

  // VALIDACION TELEFONO 
  // LA VARIABLE validarTelefono AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO TELEFONO DE UN USUARIO
  // LA VARIABLE mensajeTel CAMBIA EL MENSAJE DEL ERROR MOSTRADO EN LA CAPTURA DE LA TELEFONO DEL USUARIO
  validarTelefono: boolean = true;
  verTelefonoEmple: boolean = true;
  mensajeTel: string = "Campo obligatorio*"

  // VALIDACION UBICACION
  // LA VARIABLE validarCalle AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO CALLE DE UN USUARIO
  // LA VARIABLE validarEstado AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO ESTADO DE UN USUARIO
  // LA VARIABLE validarMunicipio AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO MUNICIPIO DE UN USUARIO
  validarCalle: boolean = true;
  validarEstado: boolean = true;
  validarMunicipio: boolean = true;

  // LA VARIABLE bloquearMunicipio ES UTILIZADA PARA CAMBIAR LOS ESTILOS DEL FORMULARIO MUNICIPIO
  bloquearMunicipio: string = "none";

  // ESTAS VARIABLES MUESTRAN LOS TEXTOS MOSTRADOS EN EL FORMULARIO DE CAPTURA DE UBICACION
  // LOS TEXTOS CAMBIAN DEPENDIENDO DE SI EL ATRIBUTO ES OBLIGATORIO PARA LA CUENTA A CREAR
  textoUbicacion: string = "Calle y Número:"
  textoMunicipio: string = "Municipio:";
  textoEstado: string = "Estado:";

  // VALIDACION CORREO
  // LA VARIABLE validarCorreo AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO CORREO DE UN USUARIO
  // LA VARIABLE correoExistente AL ESTAR DESACTIVADA MUESTRA ERROR DE CORREO YA REGISTRADO EN BASE DE DATOS
  validarCorreo: boolean = true;
  correoExistente: boolean = true;

  // VALIDACION CONTRASEÑA
  // LA VARIABLE validarContrasena AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO CONTRASEÑA DE UN USUARIO
  // LA VARIABLE validarContrasenaVe AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO  VALIDAR CONTRASEÑA DE UN USUARIO
  // LA VARIABLE validarContrasenasIguales AL ESTAR DESACTIVADA MUESTRA EL ERROR DE IGUALDAD DE CONTRASEÑAS INGRESADAS
  validarContrasena: boolean = true;
  mensajeContra: string = "Campo obligatorio*"
  mensajecontra2: string = "Campo obligatorio*"
  validarContrasenaVe: boolean = true;
  validarContrasenasIguales: boolean = true;

  // VALIDACION DESCRIPCION
  // LA VARIABLE validarDescripcion AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO DESCRIPCION DE UN USUARIO
  validarDescripcion: boolean = true;

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _CandidateRequest: CandidateService,
    private _AdminRequest: AdminService,
    private _EmployerRequest: EmployerService,
    private _UserRequest: InterfaceService,
    private _CompanyRequest: CompanyService,
    private _firebase: Storage,
  ) {

    this.edad = 18;
    this.lada = "+52";
  }

  ngOnInit() {
    this.componetStart = false;
    this.bloquearMunicipios();
    this.identificarUsario("candidato");
  }

  activarCandidato(){
    this.desactivarAdministrador();
    this.desactivarEmpleador();
    const boton = document.getElementsByName("btnCandidato")[0];
    boton.classList.add("botonCandidatoSelecc");
  }

  activarEmpleador(){
    this.desactivarCandidato();
    this.desactivarAdministrador();
    const boton = document.getElementsByName("btnEmpleador")[0];
    boton.classList.add("botonEmpleadorSelecc");
  }

  activarAdministrador(){
    this.desactivarCandidato();
    this.desactivarEmpleador();
    const boton = document.getElementsByName("btnAdmin")[0];
    boton.classList.add("botonAdminSelecc");
  }

  desactivarCandidato(){
    const boton = document.getElementsByName("btnCandidato")[0];
    boton.classList.remove("botonCandidatoSelecc");
  }

  desactivarEmpleador(){
    const boton = document.getElementsByName("btnEmpleador")[0];
    boton.classList.remove("botonEmpleadorSelecc");
  }

  desactivarAdministrador(){
    const boton = document.getElementsByName("btnAdmin")[0];
    boton.classList.remove("botonAdminSelecc");
  }

  // FUNCION PARA OBTENER LA LISTA DE ESTADO DE MÉXICO
  bloquearMunicipios() {
    this.estado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.municipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado };

    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estadosMexico = data;
      console.log(this.estadosMexico);
    });
    this.bloquearMunicipio = "none";
  }

  // FUNCION PARA LIMPIAR LOS CAMPOS ESTADO Y MUNICIPIO
  bloquearMunicipiosII() {
    this.estado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.municipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado };
    this.bloquearMunicipio = "none";
  }

  // FUNCION PARA GUARADAR EL ESTADO
  actualizarEstado(estado: any) {
    this.estado = estado;
    // LLAMDO A LA FUNCION DE OPTENCION DE MUNICIPIOS
    this._UserRequest.obtenerMunicipios(this.estado.id_estado).subscribe(data => {
      this.municipiosMexico = data;
      console.log(this.municipiosMexico);
    });
    this.municipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado };
    this.bloquearMunicipio = "all";
  }

  // FUNCION PARA GUARADAR LA LADA TELEFONICA
  actualizarLada(numero: string) {
    this.lada = numero;
  }

  // FUNCION PARA GUARADAR EL MUNICIPIO
  actualizarMunicipio(municipio: any) {
    this.municipio = municipio;
  }

  identificarUsario(usuario: any) {
    this.activarTodo();
    this.limpiarCampos();
    this.tipoUsurio = usuario;
    this.textoUbicacion = "Calle y Número:*";
    this.textoMunicipio = "Municipio:";
    this.textoEstado = "Estado:";
    this.verUsuariosPrincipales = false;

    if (this.usuarioAdmin == true) {
      this.componetStart = true;
      this.verAdministrador = false;
      this.verEmpresa = false;
    } else {
      if (this.vistaEmpleo == true) {
        this.verUsuariosPrincipales = true;
        this.verEmpresa = false;
        this.componetStart = true;
        this.tipoUsurio = "empresa";
      } else {
        this.verAdministrador = true;
        this.componetStart = false;
      }
    }
    this.cambiarCuenta();
  }

  // FUNCION PARA CAMBIAR EL TIPO DE CUENTA QUE SE CREARA
  cambiarCuenta() {
    if (this.tipoUsurio == "candidato") {
      this.activarCandidato();
      this.bloquearMunicipiosII();
      this.desBloquearCampos();
      this.descripcionDelUSuario = "Al crear una cuenta del tipo candidato tendras acceso a todas las vacantes disponibles en nuestra plataforma,"
        + " podras postularte a ellas y gestionar dichas postulaciones en vistas exclusivas.";
    } else if (this.tipoUsurio == "administrador") {
      this.activarAdministrador();
      this.bloquearMunicipiosII();
      this.bloquearCampos();
      this.descripcionDelUSuario = "Al crear una cuenta del tipo administrador estaras creando un usuario que podra gestionar de manera libre la plataforma,"
        + " el suario  podra crear cuentas de cualquier tipo, eliminarlas o suspenderlas.";
    } else if (this.tipoUsurio == "empleador") {
      this.activarEmpleador();
      this.bloquearMunicipiosII();
      this.bloquearCampos();
      this.descripcionDelUSuario = "Al crear una cuenta del tipo empleador podras publicar nuevos empleos dentro de nuestra plataforma y podras gestionar a todos "
        + "los candidatos que se postularon a tu vacante en ventanas exclusivas.";
    } else {
      this.bloquearMunicipiosII();
      this.bloquearCampos();
      this.descripcionDelUSuario = "Al crear una empersa debes tener en cuenta que estara disponible de manera instantanea en nuestra plataforma,"
        + " y sera visible para todos los empleadores durante la creacion de vacantes en el campo empresa.";
      this.textoUbicacion = "Calle y Número:*";
      this.textoMunicipio = "Municipio:*";
      this.textoEstado = "Estado:*";
    }
  }

  bloquearCampos() {
    const elementos = document.getElementsByName("ubicacion");
    for (let i = 0; i < elementos.length; i++) {
      const element = elementos[i];
      element.classList.add("bloquear");
    }
  }

  desBloquearCampos() {
    const elementos = document.getElementsByName("ubicacion");
    for (let i = 0; i < elementos.length; i++) {
      const element = elementos[i];
      element.classList.remove("bloquear");
    }
  }

  // FUNCION PARA OCULTAR COMPONENTE LOGIN O CREATE
  linkLogin() {
    this.viewCreate.emit(true);
    this.viewLogin.emit(false);
  }

  // FUNICION PARA OCULTAR TODOS LOS ERRORES
  activarTodo() {
    this.validarNombre = true;
    this.validarNombreRegistrado = true;
    this.validarApellidoP = true;
    this.validarApellidoM = true;
    this.validarEdad = true;
    this.validarTelefono = true;
    this.validarCalle = true;
    this.validarEstado = true;
    this.validarMunicipio = true;
    this.validarDescripcion = true;
    this.validarCorreo = true;
    this.correoExistente = true;
    this.validarContrasena = true;
    this.validarContrasenaVe = true;
  }

  // FUNCION PARA INICIAR EL REGISTRO
  comenzarRegistro() {
    this.activarTodo();
    // Código para determinar que tipo de usuario se creara
    if (this.tipoUsurio == "candidato") {
      this.evaluarCandidato();
    } else if (this.tipoUsurio == "administrador") {
      this.evaluarAdministrador();
    } else if (this.tipoUsurio == "empleador") {
      this.evaluarEmpleador();
    } else {
      this.evaluarEmpresa();
    }
  }

  // CAPTURA CANDIDATO
  evaluarCandidato() {
    this.Obligatorios = true;

    const CANDIDATO = {
      nombre: this.nombre,
      apellidoM: this.apellidoM,
      apellidoP: this.apellidoP,
      correoElectronico: this.correo,
      contrasena: this.contrasena,
      telefono: this.numeroTelefonioco,
      edad: this.edad,
      domicilio: this.ubicacion,
      id_estado: this.estado.id_estado,
      id_municipio: this.municipio.id_municipio,
      fechaNacimientoStr: this.nacimientoSrt,
      rutaImagenPerfil: "",
      rutaImagenPortada: "",
    }
    this.evaluarNombre(CANDIDATO);
  }

  // CAPTURA ADMINISTRADOR
  evaluarAdministrador() {
    this.Obligatorios = true;

    const ADMIN = {
      nombre: this.nombre,
      apellidoM: this.apellidoM,
      apellidoP: this.apellidoP,
      telefono: this.numeroTelefonioco,
      correoElectronico: this.correo,
      contrasena: this.contrasena,
      rutaImagenPerfil: "",
      rutaImagenPortada: "",
    }

    this.evaluarNombre(ADMIN);
  }

  // CAPTURA EMPLEADOR
  evaluarEmpleador() {
    this.Obligatorios = true;

    const EMPLEADOR = {
      nombre: this.nombre,
      apellidoM: this.apellidoM,
      apellidoP: this.apellidoP,
      telefono: this.numeroTelefonioco,
      correoElectronico: this.correo,
      contrasena: this.contrasena,
      rutaImagenPerfil: "",
      rutaImagenPortada: "",
    }

    this.evaluarNombre(EMPLEADOR);
  }

  //CAPTURA EMPRESA
  evaluarEmpresa() {
    this.Obligatorios = true;

    const EMPRESA = {
      nombre: this.nombre,
      descripcion: this.descripcion
    }

    this.evaluarNombre(EMPRESA);
  }

  // FUNCION PARA EVALUAR UN NOMBRE
  evaluarNombre(usuario: any) {
    // Códogo para evaluar que el campo nombre no este vacio 
    if (this.nombre == "") {
      this.validarNombre = false;
      this.Obligatorios = false;
    } else {
      this.validarNombre = true;
      usuario.nombre = this.nombre
    }
    this.cambiarFlujoDeRegistroI(usuario);
  }

  // FUNCION PARA EL CAMBIO DE FLUJO DEL REGISTRO SEGUN EL TIPO DE CUENTA
  cambiarFlujoDeRegistroI(usuario: any) {
    if (this.tipoUsurio == "empresa") {
      this.evaluarDescripcion(usuario);
    } else {
      this.evaluarApellidoP(usuario);
    }
  }

  // FUNCION PARA EVALUAR UN APELLIDO P
  evaluarApellidoP(usuario: any) {
    // Codigo para elvaluar que el campo apellido no este vacioo
    if (this.apellidoP == "") {
      this.validarApellidoP = false;
      this.Obligatorios = false;
    } else {
      this.validarApellidoP = true;
      usuario.apellidoP = this.apellidoP
    }
    this.evaluarApellidoM(usuario);
  }

  // FUNCION PARA EVALUAR UN APELLIDO M
  evaluarApellidoM(usuario: any) {
    // Codigo para elvaluar que el campo apellido no este vacioo
    if (this.apellidoM == "") {
      this.validarApellidoM = false;
      this.Obligatorios = false;
    } else {
      this.validarApellidoM = true;
      usuario.apellidoM = this.apellidoM
    }
    this.cambiarFlujoDeRegistroII(usuario);
  }

  // FUNCION PARA EL CAMBIO DE FLUJO DEL REGISTRO SEGUN EL TIPO DE CUENTA
  cambiarFlujoDeRegistroII(usuario: any) {
    if (this.tipoUsurio == "administrador") {
      this.evaluarTelefono(usuario);
    } else if (this.tipoUsurio == "empleador") {
      this.evaluarTelefono(usuario);
    } else if (this.tipoUsurio == "candidato") {
      this.evaluarEdad(usuario);
    } else {

    }
  }

  // FUNCION PARA EVALUAR EL FECHAS
  evaluarEdad(usuario: any) {
    var hoy = new Date();
    var cumpleanos = new Date(this.nacimiento);
    let ChangedFormat = this.pipe.transform(this.nacimiento, 'dd/MM/YYYY');
    this.nacimientoSrt = ChangedFormat;
    console.log(this.nacimientoSrt);
    this.nacimientoSrt
    // Funcion para generar una edad desde una fecha
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    // Funciones para validar que la edad generada sea de un mayor de edad
    if (edad == 0) {
      this.validarEdad = false;
      this.Obligatorios = false;
    } else if (edad < 18) {
      this.mensajeEdad = "Valor Invalido*"
      this.validarEdad = false;
      this.Obligatorios = false;
    } else {
      this.validarEdad = true;
      usuario.edad = edad;
      usuario.fechaNacimientoStr = this.nacimientoSrt?.toString();
    }
    this.evaluarTelefono(usuario);
  }

  // FUNCION PARA EVALUAR NUMEROS
  evaluarTelefono(usuario: any) {
    // Funcion para evaluar que el campo numero no este vacio
    if (this.numeroTelefonioco == "") {
      this.validarTelefono = false;
      this.Obligatorios = false;
      this.mensajeTel = "Campo obligatorio."
    } else {
      let numeroConLada = "";
      numeroConLada = this.lada + " " + this.numeroTelefonioco;
      // funciones para elvaluar la longitud del numero
      if (numeroConLada.length < 18) {
        this.mensajeTel = "Tel. Invalido.";
        this.validarTelefono = false;
        this.Obligatorios = false;
      } else if (numeroConLada.length > 18) {
        this.mensajeTel = "Tel. Invalido.";
        this.validarTelefono = false;
        this.Obligatorios = false;
      } else {
        this.validarTelefono = true;
        this.comprobarNumero(usuario);
      }
    }
    this.cambiarFlujoDeRegistroIII(usuario);
  }

  comprobarNumero(usuario: any,) {
    //AGREGAR FUNCION PARA COMPROBAR NUMEROS
    let numeroConFormato = "(" + this.lada + ")" + this.numeroTelefonioco;
    usuario.telefono = numeroConFormato;
  }

  // FUNCION PARA EL CAMBIO DE FLUJO DEL REGISTRO SEGUN EL TIPO DE CUENTA
  cambiarFlujoDeRegistroIII(usuario: any) {
    if (this.tipoUsurio == "administrador") {
      this.evaluarCorreo(usuario);
    } else if (this.tipoUsurio == "empleador") {
      this.evaluarCorreo(usuario);
    } else if (this.tipoUsurio == "candidato") {
      this.evaluarCalleyNumero(usuario);
    } else {

    }
  }

  // FUNCION PARA EVALUAR LOS CAMPOS DE DOMICILIO
  evaluarCalleyNumero(usuario: any) {
    // Funcion para validar que el campo domicilio no este vacio
    if (this.ubicacion == "") {
      this.validarCalle = false;
      this.Obligatorios = false;
    } else {
      this.validarCalle = true;
      usuario.domicilio = this.ubicacion;
    }
    this.evaluarEstado(usuario);
  }

  // FUNCION PARA VALIDAR EL ESTADO CAPTURADO
  evaluarEstado(usuario: any) {
    // Funcion para validar que el campo estado no este como default 
    if (this.estado.id_estado == 0) {
      this.validarEstado = false;
      this.Obligatorios = false;
    } else {
      this.validarEstado = true;
      usuario.id_estado = this.estado.id_estado;
    }
    this.evaluarMunicipio(usuario);
  }

  // FUNCION PARA VALIDAR EL MUNICIPIO CAPTURADO
  evaluarMunicipio(usuario: any) {
    // Funcion para validar que el campo municipio no este como default 
    if (this.municipio.id_municipio == 0) {
      this.validarMunicipio = false;
      this.Obligatorios = false;
    } else {
      this.validarMunicipio = true;
      usuario.id_municipio = this.municipio.id_municipio;
    }
    this.cambiarFlujoDeRegistroIV(usuario);
  }

  // FUNCION PARA EL CAMBIO DE FLUJO DEL REGISTRO SEGUN EL TIPO DE CUENTA
  cambiarFlujoDeRegistroIV(usuario: any) {
    if (this.tipoUsurio == "candidato") {
      this.evaluarCorreo(usuario);
    } else {

    }
  }

  // FUNCION PARA VALIDAR EL CORREO ELECTRONICO
  evaluarDescripcion(empresa: any) {
    // Código para validar que el campo de de descripcion no este vacio
    if (this.descripcion == "") {
      this.validarDescripcion = false;
      this.Obligatorios = false;
    } else {
      this.validarDescripcion = true;
      empresa.descripcion = this.descripcion;
    }
    console.log(empresa);
    this.registarEmpresa(empresa);
  }

  // FUNCION PARA VALIDAR EL CORREO ELECTRONICO
  evaluarCorreo(usuario: any) {
    // Código para validar que el campo de correo no este vacio
    if (this.correo == "") {
      this.Obligatorios = false;
      this.validarCorreo = false;
    } else {
      this.validarCorreo = true;
      usuario.correoElectronico = this.correo;
    }
    // Falta agregar las validaciones de correo electronico disponible
    this.evaluarContrasena(usuario);
  }

  // FUNCION LA COMPROBAR LA CONTRASEÑA INGRESADA
  evaluarContrasena(usuario: any) {
    // Código para comprobar que los campos de contraseña no esten vacios
    if (this.contrasena == "" && this.contrasenaValidacion == "") {
      this.validarContrasena = false;
      this.mensajeContra = "Campo Obligatorio*";
      this.mensajecontra2 = "Campo Obligatorio*";
      this.validarContrasenaVe = false;
      this.Obligatorios = false;
    } else if (this.contrasena == "") {
      this.mensajeContra = "Campo Obligatorio*"
      this.validarContrasena = false;
      this.Obligatorios = false;
    } else if (this.contrasenaValidacion == "") {
      this.mensajecontra2 = "Campo Obligatorio*";
      this.validarContrasenaVe = false;
      this.Obligatorios = false;
    } else {

    }
    this.filtroDeContrasena(usuario);
  }

  // FUNCION LA COMPROBAR LA CONTRASEÑA INGRESADA
  filtroDeContrasena(usuario: any) {
    // Código para comprobar que la contraseña ingresada tenga un minimo de 8 caracteres
    if (this.contrasena.length < 8) {
      this.validarContrasena = false;
      this.mensajeContra = "Dato Invalido."
      this.Obligatorios = false;
      // Código para comprobar que la contraseña ingresada no tenga mas de 25 caracteres
    } else if (this.contrasena.length > 25) {
      this.mensajeContra = "Dato Invalido."
      this.Obligatorios = false;
    }
    this.comprobarContrasena(usuario);
  }

  // FUNCION LA COMPROBAR LA CONTRASEÑA INGRESADA
  comprobarContrasena(usuario: any) {
    // Código para comprobar que las contraseñas ingresadas son iguales
    if (this.contrasena != this.contrasenaValidacion) {
      this.mensajecontra2 = "Dato incorrecto";
      this.validarContrasenaVe = false;
      this.validarContrasenasIguales = false
      this.Obligatorios = false;
    } else {
      this.validarContrasenasIguales = true;
      usuario.contrasena = this.contrasena;
    }
    // Faltaria agregar la funcion para comprobar si la comntraseña contiene caracteres especiales y números
    this.asignarImagenPerfil(usuario);
  }

  validarImagenes() {

  }

  // VARIABLES PARA LA CAPTURA DE ARCHIVOS 
  imgP: any;
  img: any;
  imgReff: any;
  imgReffP: any;
  nuevaImagenPerfil: string = "";
  nuevaImagenPortada: string = "";

  uploadPerfil($event: any) {
    this.img = $event.target.files[0];
    this.nuevaImagenPerfil = this.img.name;
  }

  asignarImagenPerfil(usuario: any) {
    if(this.nuevaImagenPerfil == ""){
      this.nuevaImagenPerfil = "pR3d3tErm1n4d4IMGP3rf1l.jpg";
      usuario.rutaImagenPerfil = this.nuevaImagenPerfil;
    } else {
      this.nuevaImagenPerfil = this.img.name;
      usuario.rutaImagenPerfil = this.nuevaImagenPerfil;
      const name = usuario.nombre + usuario.apellidoP + usuario.apellidoM;
      this.imgReff = ref(this._firebase, `images${name}/perfil/${this.img.name}`);
  
      const ARCHIVO = {
        tipo: "perfil",
        name: this.img.name,
      }
    }
    this.asignarImagenPortada(usuario);
  }

  uploadPortada($event: any) {
    this.imgP = $event.target.files[0];
    this.nuevaImagenPortada = this.imgP.name;
  }

  asignarImagenPortada(usuario: any) {
    if(this.nuevaImagenPortada == ""){
      this.nuevaImagenPortada = "pR3d3tErm1n4d4IMGP0rt4dA.jpg";
      usuario.rutaImagenPortada = this.nuevaImagenPortada;
    } else {
      this.nuevaImagenPortada = this.imgP.name
      usuario.rutaImagenPortada = this.nuevaImagenPortada;
      const name = usuario.nombre + usuario.apellidoP + usuario.apellidoM;
      this.imgReffP = ref(this._firebase, `images${name}/portada/${this.imgP.name}`);
  
      const ARCHIVO = {
        tipo: "portada",
        name: this.imgP.name,
      }
    }
    this.cambiarFlujoDeRegistroV(usuario);
  }

  subirPerfil(){
    if(this.nuevaImagenPerfil != "pR3d3tErm1n4d4IMGP3rf1l.jpg"){
      uploadBytes(this.imgReff, this.img)
      .then(response => console.log(response))
      .catch(error => console.log(error));
    }
  }

  subirPortada(){
    if(this.nuevaImagenPortada != "pR3d3tErm1n4d4IMGP0rt4dA.jpg"){
      uploadBytes(this.imgReffP, this.imgP)
      .then(response => console.log(response))
      .catch(error => console.log(error));
    } 
  }

  // FUNCION PARA EL CAMBIO DE FLUJO DEL REGISTRO SEGUN EL TIPO DE CUENTA
  cambiarFlujoDeRegistroV(usuario: any) {
    if (this.tipoUsurio == "administrador") {
      this.registarAdministrador(usuario);
    } else if (this.tipoUsurio == "empleador") {
      this.registarEmpleador(usuario);
    } else if (this.tipoUsurio == "candidato") {
      this.registarCandidato(usuario);
    } else {

    }
  }


  // FUNCION PARA EL REGISTRO DE CANDIDATOS
  registarCandidato(usuario: any) {
    if (this.Obligatorios != false) {
      this._CandidateRequest.registrar(usuario).then((data: any) => {
        if (this.usuarioAdmin == true) {
          if (data.estatus == false) {
            this.enviarAlerta("Ha surgido un error inesperado que nos impidio crear al candidato.", true);
          } else {
            this.subirPortada();
            this.subirPerfil();
            this.enviarAlerta("El candidato fue creado correctamente, la cuenta ya puede ser utilizada.", false);
            this.limpiarCampos();
          }
        } else {
          if (data.estatus == false) {
            this.enviarAlerta("Ha surgido un error inesperado que nos impidio crear al candidato.", true);
          } else {
            this.limpiarCampos();
            this.subirPortada();
            this.subirPerfil();
            this._UserRequest.guaradarCorreo(usuario.correoElectronico);
            this._UserRequest.cambiartipo();
            this._UserRequest.mostarNav();
          }
        }
      });
    } else {
      this.enviarAlerta("Algunos de los campos obligatorios para la creacion de la cuenta no se han capturado.", true);
    }
  }

  // FUNCION PARA EL REGISTRO DE ADMINISTRADOR 
  registarAdministrador(administrador: any) {
    if (this.Obligatorios != false) {
      this._AdminRequest.registrar(administrador).then((data: any) => {
        if (data.estatus == false) {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio crear al administrador.", true);
        } else {
          this.enviarAlerta("El administrador fue creado correctamente, la cuenta ya puede ser utilizada.", false);
          this.limpiarCampos();
          this.subirPortada();
          this.subirPerfil();
        }
      });
    } else {
      this.enviarAlerta("Algunos de los campos obligatorios para la creacion de la cuenta no se han capturado.", true);
    }
  }

  // FUNCION PARA EL REGISTRO DE EMPLEADORES
  registarEmpleador(empleador: any) {
    if (this.Obligatorios != false) {
      this._EmployerRequest.registrar(empleador).then((data: any) => {
        if (this.usuarioAdmin == true) {
          if (data.estatus == false) {
            this.enviarAlerta("Ha surgido un error inesperado que nos impidio crear al empleador.", true);
          } else {
            this.enviarAlerta("El empleador fue creado correctamente, la cuenta ya puede ser utilizada.", false);
            this.limpiarCampos();
            this.subirPortada();
            this.subirPerfil();
          }
        } else {
          if (data.estatus == false) {
            this.enviarAlerta("Ha surgido un error inesperado que nos impidio crear al empleador.", true);
          } else {
            this.limpiarCampos();
            this.subirPortada();
            this.subirPerfil();
            this._UserRequest.guaradarCorreo(empleador.correoElectronico);
            this._UserRequest.cambiartipo();
            this._UserRequest.mostarNav();
          }
        }
      });
    } else {
      this.enviarAlerta("Algunos de los campos obligatorios para la creacion de la cuenta no se han capturado.", true);
    }
  }

  // FUNCION PARA EL REGISTRO DE EMPRESAS
  registarEmpresa(empresa: any) {
    if (this.Obligatorios != false) {
      this._CompanyRequest.registrar(empresa).then((data: any) => {
        if (data.estatus == false) {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio crear la empresa.", true);
        } else {
          this.enviarAlerta("La empresa fue creada correctamente y ya se encuentra disponible.", false);
          this.limpiarCampos();
          this._EmployerRequest.obtenerEmpresasOb();
          this.ocultarRegistro.emit(true);
        }
      });
    } else {
      this.enviarAlerta("Algunos de los campos obligatorios para la creacion de la cuenta no se han capturado.", true);
    }
  }

  // FUNCION PARA LIMPIAR EL FORMULARIO DE REGISTRO
  limpiarCampos() {
    this.nombre = "";
    this.apellidoP = "";
    this.apellidoM = "";
    this.edad = 0;
    this.numeroTelefonioco = "";
    this.ubicacion = "";
    this.estado = new Estado;
    this.municipio = new Municipio;
    this.correo = "";
    this.contrasena = "";
    this.contrasenaValidacion = "";
    this.descripcion = "";
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