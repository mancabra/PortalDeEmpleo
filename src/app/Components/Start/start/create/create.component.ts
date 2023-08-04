import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  // VECTORRES NECESARIOS

  estadosMexico: Estado[] = [];
  municipiosMexico: Municipio[] = [];
  ladasMexico = ["+51", "+52", "+53"]; // CAMBIAR POR UN OBSERBABLE
  //contenerNumero = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+"];

  // VARIABLES MANIPULAR ENTORNO

  // CUANDO LA VARIABLE usuarioAdmin ESTA ACTIVA INDICA QUE EL COMPONENTE ESTA EL EL MODULO ADMINISTRAR
  // CUANDO LA VARIABLE componetStart ESTA ACTIVA INDICA QUE EL COMPONENTE ESTA EL EL MODULO LOGIN

  usuarioAdmin: boolean = false;
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

  constructor(
    private router: Router,
    private _CandidateRequest: CandidateService,
    private _AdminRequest: AdminService,
    private _EmployerRequest: EmployerService,
    private _UserRequest: InterfaceService,
    private _CompanyRequest: CompanyService
  ) {

    this.edad = 18;
    this.lada = "+52";

  }

  ngOnInit() {
    this.componetStart = false;
    this.verNombre = false;
    this.verApellidos = false;
    this.verEdadyTelefono = false;
    this.verUbicacion = false;
    this.verCorreo = false;
    this.verContrasenas = false;
    this.verDescripcion = false;

    this.bloquearMunicipios();
    this.identificarUsario("candidato");
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

  // FUNCION PARA GUARADAR EL ESTADO
  actualizarEstado(estado: any) {

    this.estado = estado;

    // LLAMDO A LA FUNCION DE OPTENCION DE MUNICIPIOS
    this._UserRequest.obtenerMunicipios(this.estado.id_estado).subscribe(data => {
      this.municipiosMexico = data;
      console.log(this.municipiosMexico);
    });

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
    this.textoUbicacion = "Calle y Número:";
    this.textoMunicipio = "Municipio:";
    this.textoEstado = "Estado:";

    this.verUsuariosPrincipales = false;

    if (this.usuarioAdmin == true) {
      this.componetStart = true;
      this.verAdministrador = false;

    } else {
      this.verAdministrador = true;
      this.componetStart = false;
    }

    this.cambiarCuenta();
  }

  cambiarCuenta() {

    if (this.tipoUsurio == "candidato") {
      this.bloquearMunicipios();
      this.descripcionDelUSuario = "Al crear una cuenta del tipo candidato tendras acceso a todas las vacantes disponibles en nuestra plataforma,"
        + " podras postularte a ellas y gestionar dichas postulaciones en vistas exclusivas.";
      this.verApellidos = false;
      this.verUbicacion = false;
      this.verEdadyTelefono = false;
      this.verCorreo = false;
      this.verContrasenas = false;
      this.verDescripcion = true;

    } else if (this.tipoUsurio == "administrador") {
      this.descripcionDelUSuario = "Al crear una cuenta del tipo administrador estaras creando un usuario que podra gestionar de manera libre la plataforma,"
        + " el suario  podra crear cuentas de cualquier tipo, eliminarlas o suspenderlas.";
      this.verApellidos = false;
      this.verEdadyTelefono = true;
      this.verUbicacion = true;
      this.verCorreo = false;
      this.verContrasenas = false;
      this.verDescripcion = true;

    } else if (this.tipoUsurio == "empleador") {
      this.descripcionDelUSuario = "Al crear una cuenta del tipo empleador podras publicar nuevos empleos dentro de nuestra plataforma y podras gestionar a todos "
        + "los candidatos que se postularon a tu vacante en ventanas exclusivas.";
      this.verApellidos = false;
      this.verEdadyTelefono = true;
      this.verUbicacion = true;
      this.verCorreo = false;
      this.verContrasenas = false;
      this.verDescripcion = true;

    } else {

      this.bloquearMunicipios();
      this.descripcionDelUSuario = "Al crear una empersa debes tener en cuenta que estara disponible de manera instantanea en nuestra plataforma,"
        + " y sera visible para todos los empleadores durante la creacion de vacantes en el campo empresa.";
      this.textoUbicacion = "Calle y Número:*";
      this.textoMunicipio = "Municipio:*";
      this.textoEstado = "Estado:*";
      this.verApellidos = true;
      this.verEdadyTelefono = true;
      this.verUbicacion = false;
      this.verCorreo = true;
      this.verContrasenas = true;
      this.verDescripcion = false;
    }
  }

  // FUNCION PARA OCULTAR COMPONENTE LOGIN O CREATE

  linkLogin() {
    this.viewCreate.emit(true);
    this.viewLogin.emit(false);
  }

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

  comenzarRegistro() {
    this.activarTodo();
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
      id_municipio: this.municipio.id_municipio
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
      correoElectronico: this.correo,
      contrasena: this.contrasena,
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
      correoElectronico: this.correo,
      contrasena: this.contrasena,
    }

    this.evaluarNombre(EMPLEADOR);
  }

  //CAPTURA EMPRESA
  evaluarEmpresa() {

    this.Obligatorios = true;

    const EMPRESA = {
      nombre: this.nombre,
      domicilio: this.ubicacion,
      id_estado: this.estado.id_estado,
      id_municipio: this.municipio.id_municipio,
      descripcion: this.descripcion
    }

    this.evaluarNombre(EMPRESA);
  }

  evaluarNombre(usuario: any) {

    if (this.nombre == "") {
      this.validarNombre = false;
      this.Obligatorios = false;
    } else {
      this.validarNombre = true;
      usuario.nombre = this.nombre
    }

    this.cambiarFlujoDeRegistroI(usuario);
  }

  cambiarFlujoDeRegistroI(usuario: any) {

    if (this.tipoUsurio == "empresa") {
      this.evaluarCalleyNumero(usuario);
    } else {
      this.evaluarApellidoP(usuario);
    }
  }

  evaluarApellidoP(usuario: any) {
    if (this.apellidoP == "") {
      this.validarApellidoP = false;
      this.Obligatorios = false;
    } else {
      this.validarApellidoP = true;
      usuario.apellidoP = this.apellidoP
    }

    this.evaluarApellidoM(usuario);
  }

  evaluarApellidoM(usuario: any) {

    if (this.apellidoM == "") {
      this.validarApellidoM = false;
      this.Obligatorios = false;
    } else {
      this.validarApellidoM = true;
      usuario.apellidoM = this.apellidoM
    }

    this.cambiarFlujoDeRegistroII(usuario);
  }

  cambiarFlujoDeRegistroII(usuario: any) {

    if (this.tipoUsurio == "administrador") {
      this.evaluarCorreo(usuario);
    } else if (this.tipoUsurio == "empleador") {
      this.evaluarCorreo(usuario);
    } else if (this.tipoUsurio == "candidato") {
      this.evaluarEdad(usuario);
    } else {

    }
  }

  evaluarEdad(usuario: any) {
    if (this.edad == 0) {
      this.validarEdad = false;
      this.Obligatorios = false;

    } else if (this.edad < 18) {
      this.mensajeEdad = "Valor Invalido*"
      this.validarEdad = false;
      this.Obligatorios = false;


    } else {
      this.validarEdad = true;
      usuario.edad = this.edad;
    }
    this.evaluarTelefono(usuario);
  }

  evaluarTelefono(usuario: any) {

    if (this.numeroTelefonioco == "") {
      this.validarTelefono = false;
      this.Obligatorios = false;
      this.mensajeTel = "Campo obligatorio."
    } else {
      let numeroConLada = "";
      numeroConLada = this.lada + this.numeroTelefonioco;

      if (numeroConLada.length < 17) {
        this.mensajeTel = "Tel. Invalido.";
        this.validarTelefono = false;
        this.Obligatorios = false;
      } else if (numeroConLada.length > 17) {
        this.mensajeTel = "Tel. Invalido.";
        this.validarTelefono = false;
        this.Obligatorios = false;
      } else {
        this.validarTelefono = true;

        this.comprobarNumero(usuario);
      }
    }
    this.evaluarUbicacion(usuario);
  }

  comprobarNumero(usuario: any,) {

    //AGREGAR FUNCION PARA COMPROBAR NUMEROS
    let numeroConFormato = "(" + this.lada + ")" + this.numeroTelefonioco;
    usuario.telefono = numeroConFormato;

  }

  evaluarUbicacion(usuario: any) {
    usuario.ubicacion = this.ubicacion;
    usuario.id_estado = this.estado.id_estado;
    usuario.id_municipio = this.municipio.id_municipio;
    this.evaluarCorreo(usuario);
  }

  evaluarCalleyNumero(empresa: any) {
    if (this.ubicacion == "") {
      this.validarCalle = false;
      this.Obligatorios = false;
    } else {
      this.validarCalle = true;
      empresa.domicilio = this.ubicacion;
    }
    this.evaluarEstado(empresa);
  }

  evaluarEstado(empresa: any) {
    if (this.estado.id_estado == 0) {
      this.validarEstado = false;
      this.Obligatorios = false;
    } else {
      this.validarEstado = true;
      empresa.id_estado = this.estado.id_estado;
    }
    this.evaluarMunicipio(empresa);
  }

  evaluarMunicipio(empresa: any) {
    if (this.municipio.id_municipio == 0) {
      this.validarMunicipio = false;
      this.Obligatorios = false;
    } else {
      this.validarMunicipio = true;
      empresa.id_municipio = this.municipio.id_municipio;
    }
    this.evaluarDescripcion(empresa);
  }

  evaluarDescripcion(empresa: any) {
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


  evaluarCorreo(usuario: any) {
    if (this.correo == "") {
      this.Obligatorios = false;
      this.validarCorreo = false;
    } else {
      this.validarCorreo = true;
      usuario.correoElectronico = this.correo;
    }
    this.evaluarContrasena(usuario);

  }

  evaluarContrasena(usuario: any) {

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

  filtroDeContrasena(usuario:any){

    if (this.contrasena.length < 8){
      this.validarContrasena = false;
      this.mensajeContra = "Dato Invalido."
      this.Obligatorios = false;
    } else if (this.contrasena.length > 25){
      this.mensajeContra = "Dato Invalido."
      this.Obligatorios = false;
    }
    this.comprobarContrasena(usuario); 
  }

  comprobarContrasena(usuario: any) {

    // COMPROBAR QUE LA CADENA CONTENGA EL CARACTER NUMEROS Y LETRAS (CARACTER ESPECIAL ?)

    if (this.contrasena != this.contrasenaValidacion) {
      this.mensajecontra2 = "Dato incorrecto";
      this.validarContrasenaVe = false;
      this.validarContrasenasIguales = false
      this.Obligatorios = false;
    } else {
      this.validarContrasenasIguales = true;
      usuario.contrasena = this.contrasena;
    }
    this.cambiarFlujoDeRegistroIII(usuario);
  }

  cambiarFlujoDeRegistroIII(usuario: any) {
    if (this.tipoUsurio == "administrador") {
      this.registarAdministrador(usuario);
    } else if (this.tipoUsurio == "empleador") {
      this.registarEmpleador(usuario);
    } else if (this.tipoUsurio == "candidato") {
      this.registarCandidato(usuario);
    } else {

    }
  }


  registarCandidato(usuario: any) {
    if (this.Obligatorios != false) {
      this._CandidateRequest.registrar(usuario).then((data:any) =>{
        if(data.id_candidato == 0){
          alert("ha ocurrido un error");
        }else{
          this.limpiarCampos();
          this._UserRequest.guaradarCorreo(usuario.correoElectronico);
          this._UserRequest.mostarNav();
          this.router.navigate(['vacantes']);
        }
      });
    } else {

    }
  }

  registarAdministrador(administrador: any) {
    if (this.Obligatorios != false) {
      this._AdminRequest.registrar(administrador).then((data:any) =>{
        if(data.estatus == false){
          alert("ha ocurrido un error");
        }else{
          this.limpiarCampos();
        }
      });
    } else {

    }
  }


  registarEmpleador(empleador: any) {
    if (this.Obligatorios != false) {
      this._EmployerRequest.registrar(empleador).then((data:any) =>{
        if(data.estatus == false){
          alert("ha ocurrido un error");
        }else{
          this.limpiarCampos();
          this._UserRequest.guaradarCorreo(empleador.correoElectronico);
          this._UserRequest.mostarNav();
          this.router.navigate(['start']);
        }
      });
    } else {

    }
  }

  registarEmpresa(empresa: any) {
    if (this.Obligatorios != false) {
      this._CompanyRequest.registrar(empresa).then((data:any) =>{
        if(data.estatus == false){
          alert("ha ocurrido un error");
        }else{
          this.limpiarCampos();
        }
      });
    } else {

    }
  }

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
}