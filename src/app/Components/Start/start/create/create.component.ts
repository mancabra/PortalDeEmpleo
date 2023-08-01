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

  //Vectores necesarios
  ladasMexico = ["+51", "+52", "+53"];
  contenerNumero = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+"];
  estadosMexico: Estado[] = [];
  municipiosMexico: Municipio[] = [];
  //estadosMexico:any[]  = [{ id_estado: 1, nombreEstado: "Mexico" }];
  //municipiosMexico:any[] = [{ id_municipio: 1, nombreMunicipio: "Acolman", id_estado: 1 }];
  descripcionDelUSuario: string = "";

  // COMUNICACION ENTRE COMPONENTES
  @Output() viewCreate = new EventEmitter<boolean>();
  @Output() viewLogin = new EventEmitter<boolean>();



  // VARIABLES MANIPULAR ENTORNO
  usuarioAdmin: boolean = false;
  componetStart: boolean = false
  tipoUsurio: String = "administrador"
  verUsuariosPrincipales: boolean = false;
  verAdministrador: boolean = true;
  verEmpresa: boolean = true;

  verNombre: boolean = true;
  verApellidos: boolean = true;
  verEdadyTelefono: boolean = true;
  VerUbicacion: boolean = true;
  verCorreo: boolean = true;
  verContrasenas: boolean = true;
  verDescripcion: boolean = true;

  // VALIDACION DE CAMPOS OBLIGATORIOS 
  ObligatoriosCandidato: boolean = true;
  ObligatoriosEmpleador: boolean = true;
  ObligatoriosAdministrador: boolean = true;
  ObligatoriosEmpresa: boolean = true;

  // VALIDACION NOMBRE COMPLETO
  validarNombre: boolean = true;
  validarNombreRegistrado: boolean = true;
  validarApellidoP: boolean = true;
  validarApellidoM: boolean = true;

  nombre: string = "";
  apellidoP: string = "";
  apellidoM: string = "";

  // VALIDACION EDAD
  validarEdad: boolean = true;
  mensajeEdad: string = "Campo obligatorio*"

  edad: number;

  // VALIDACION TELEFONO 
  validarTelefono: boolean = true;
  mensajeTel: string = "Campo obligatorio*"

  lada: string;
  numeroTelefonioco: string = "";

  // VALIDACION UBICACION

  validarCalle: boolean = true;
  validarEstado: boolean = true;
  validarMunicipio: boolean = true;
  bloquearMunicipio: string = "none";
  textoUbicacion: string = "Calle y Número:"
  textoMunicipio: string = "Municipio:";
  textoEstado: string = "Estado:";

  ubicacion: string = "";
  estado: Estado;
  municipio: Municipio;

  // VALIDACION CORREO
  validarCorreo: boolean = true;
  correoExistente: boolean = true;
  correo: string = "";

  // VALIDACION CONTRASEÑA
  validarContrasena: boolean = true;
  validarContrasenaVe: boolean = true;
  validarContrasenasIguales: boolean = true;

  contrasena: string = "";
  contrasenaValidacion: string = "";

  // VALIDACION DESCRIPCION
  validarDescripcion: boolean = true;
  descripcion: String = "";

  constructor(
    private router: Router,
    private _CandidateRequest: CandidateService,
    private _AdminRequest: AdminService,
    private _EmployerRequest: EmployerService,
    private _UserRequest: InterfaceService,
    private _CompanyRequest: CompanyService
  ) {

    this.lada = "+52";
    this.edad = 0;
    this.estado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.municipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado }
  }


  ngOnInit() {

    this.verNombre = false;
    this.verApellidos = false;
    this.verEdadyTelefono = false;
    this.VerUbicacion = false;
    this.verCorreo = false;
    this.verContrasenas = false;
    this.verDescripcion = false;
    this.componetStart = false;
    this.bloquearMunicipios();
    this.identificarUsario("candidato");
  }

  //FUNCION PARA OBTENER LA LISTA DE ESTADO DE MÉXICO
  bloquearMunicipios() {
    this.estado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.municipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado }
    this.bloquearMunicipio = "none";

    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estadosMexico = data;
      console.log(this.estadosMexico);
    });

  }

  identificarUsario(usuario?: any) {
    this.activarTodo();
    this.textoUbicacion = "Calle y Número:";
    this.textoMunicipio = "Municipio:";
    this.textoEstado = "Estado:";
    if (this.usuarioAdmin == true) {
      this.limpiarCampos();
      this.verAdministrador = false;
      this.verUsuariosPrincipales = false;
      this.tipoUsurio = usuario;
      this.componetStart = true;

      if (this.tipoUsurio == "candidato") {
        this.bloquearMunicipios();
        this.descripcionDelUSuario = "Al crear una cuenta del tipo candidato tendras acceso a todas las vacantes disponibles en nuestra plataforma,"
          + " podras postularte a ellas y gestionar dichas postulaciones en vistas exclusivas.";
        this.verApellidos = false;
        this.VerUbicacion = false;
        this.verEdadyTelefono = false;
        this.verCorreo = false;
        this.verContrasenas = false;
        this.verDescripcion = true;


      } else if (this.tipoUsurio == "administrador") {
        this.descripcionDelUSuario = "Al crear una cuenta del tipo administrador estaras creando un usuario que podra gestionar de manera libre la plataforma,"
          + " el suario  podra crear cuentas de cualquier tipo, eliminarlas o suspenderlas.";
        this.verApellidos = false;
        this.verEdadyTelefono = true;
        this.VerUbicacion = true;
        this.verCorreo = false;
        this.verContrasenas = false;
        this.verDescripcion = true;



      } else if (this.tipoUsurio == "empleador") {
        this.descripcionDelUSuario = "Al crear una cuenta del tipo empleador podras publicar nuevos empleos dentro de nuestra plataforma y podras gestionar a todos "
          + "los candidatos que se postularon a tu vacante en ventanas exclusivas.";
        this.verApellidos = false;
        this.verEdadyTelefono = true;
        this.VerUbicacion = true;
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
        this.VerUbicacion = false;
        this.verCorreo = true;
        this.verContrasenas = true;
        this.verDescripcion = false;

      }

    } else {
      this.cambiarTipoUsuario(usuario);
    }
  }

  cambiarTipoUsuario(usuario: any) {
    this.tipoUsurio = usuario;

    this.limpiarCampos();
    if (this.tipoUsurio == "candidato") {
      this.bloquearMunicipios();
      this.descripcionDelUSuario = "Al crear una cuenta del tipo candidato tendras acceso a todas las vacantes disponibles en nuestra plataforma,"
        + "podras postularte a ellas y gestionar dichas postulaciones en vistas exclusivas.";
      this.verAdministrador = true;
      this.verUsuariosPrincipales = false;
      this.verEdadyTelefono = false;
      this.VerUbicacion = false;
      this.verDescripcion = true;

    } else {
      this.descripcionDelUSuario = "Al crear una cuenta del tipo empleador podras publicar nuevos empleos dentro de nuestra plataforma y podras gestionar a todos "
        + "los candidatos que se postularon a tu vacante en ventanas exclusivas.";
      this.verAdministrador = true;
      this.verUsuariosPrincipales = false;
      this.verEdadyTelefono = true;
      this.VerUbicacion = true;
      this.verDescripcion = true;
    }
  }

  actualizarLada(numero: string) {
    this.lada = numero;
  }

  actualizarEstado(estado: any) {
    this.estado = estado;
    this.bloquearMunicipio = "all";

    this._UserRequest.obtenerMunicipios(this.estado.id_estado).subscribe(data => {
      this.municipiosMexico = data;
      console.log(this.municipiosMexico);
    });


  }

  actualizarMunicipio(municipio: any) {
    this.municipio = municipio;
  }

  linkLogin() {
    this.viewCreate.emit(true);
    this.viewLogin.emit(false);
  }

  activarErroresCandidato() {
    this.validarNombre = true;
    this.validarApellidoP = true;
    this.validarApellidoM = true;
    this.validarEdad = true;
    this.validarTelefono = true;
    this.validarCorreo = true;
    this.correoExistente = true;
    this.validarContrasena = true;
    this.validarContrasenaVe = true;
    this.validarDescripcion = true;
  }

  activarErroresEmpresa() {
    this.validarNombre = true;
    this.validarNombreRegistrado = true;
    this.validarCalle = true;
    this.validarEstado = true;
    this.validarMunicipio = true;
    this.validarDescripcion = true;
  }

  activarErroresEmpleadorAdmin() {
    this.validarNombre = true;
    this.validarApellidoP = true;
    this.validarApellidoM = true;
    this.validarCorreo = true;
    this.correoExistente = true;
    this.validarContrasena = true;
    this.validarContrasenaVe = true;

  }

  activarTodo() {
    this.activarErroresCandidato();
    this.activarErroresEmpresa();
    this.activarErroresEmpleadorAdmin();
  }

  comenzarRegistro() {
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

  evaluarCandidato() {
    this.ObligatoriosCandidato = true;

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

  evaluarNombre(usuario: any) {
    if (this.nombre == "") {
      this.validarNombre = false;
      this.ObligatoriosCandidato = false;
    } else {
      this.validarNombre = true;
      usuario.nombre = this.nombre
    }

    this.evaluarApellidoP(usuario);
  }

  evaluarApellidoP(usuario: any) {
    if (this.apellidoP == "") {
      this.validarApellidoP = false;
      this.ObligatoriosCandidato = false;
    } else {
      this.validarApellidoP = true;
      usuario.apellidoP = this.apellidoP
    }

    this.evaluarApellidoM(usuario);
  }

  evaluarApellidoM(usuario: any) {
    if (this.apellidoM == "") {
      this.validarApellidoM = false;
      this.ObligatoriosCandidato = false;
    } else {
      this.validarApellidoM = true;
      usuario.apellidoM = this.apellidoM
    }

    this.evaluarEdad(usuario);
  }

  evaluarEdad(usuario: any) {
    if (this.edad == 0) {
      this.validarEdad = false;
      this.ObligatoriosCandidato = false;

    } else if (this.edad < 18) {
      this.mensajeEdad = "Valor Invalido*"
      this.validarEdad = false;
      this.ObligatoriosCandidato = false;


    } else {
      this.validarEdad = true;
      usuario.edad = this.edad;
    }
    this.evaluarTelefono(usuario);
  }

  evaluarTelefono(usuario: any) {

    if (this.numeroTelefonioco == "") {
      this.validarTelefono = false;
      this.ObligatoriosCandidato = false;
      this.mensajeTel = "Campo obligatorio."
    } else {
      let numeroConLada = "";
      numeroConLada = this.lada + this.numeroTelefonioco;

      if (numeroConLada.length < 17) {
        this.mensajeTel = "Tel. Invalido.";
        this.validarTelefono = false;
        this.ObligatoriosCandidato = false;
      } else if (numeroConLada.length > 17) {
        this.mensajeTel = "Tel. Invalido.";
        this.validarTelefono = false;
        this.ObligatoriosCandidato = false;
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

  evaluarCorreo(usuario: any) {
    if (this.correo == "") {
      this.ObligatoriosCandidato = false;
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
      this.validarContrasenaVe = false;
      this.ObligatoriosCandidato = false;

    } else if (this.contrasena == "") {
      this.validarContrasena = false;
      this.ObligatoriosCandidato = false;

    } else if (this.contrasenaValidacion == "") {
      this.validarContrasenaVe = false;
      this.ObligatoriosCandidato = false;

    } else {
      this.comprobarContrasena(usuario);
    }
  }


  comprobarContrasena(usuario: any) {
    // SE DEBEN AGREGAR VALIDACIONES PARA LA EVALUACION DE LA CADENA  
    // COMPROBAR LONGITUD MINIMA
    // COMPROBAR QUE LA CADENA CONTENGA EL CARACTER NUMEROS Y LETRAS (CARACTER ESPECIAL ?)

    if (this.contrasena != this.contrasenaValidacion) {
      this.validarContrasenasIguales = false
      this.ObligatoriosCandidato = false;
    } else {
      this.validarContrasenasIguales = true;
      usuario.contrasena = this.contrasena;
    }
    this.registarCandidato(usuario);
  }

  registarCandidato(usuario: any) {
    let numero = 0;
    if (this.ObligatoriosCandidato != false) {
      numero = this._CandidateRequest.registrar(usuario);
      if (numero != 0) {
        this.limpiarCampos();
        this._UserRequest.guaradarCorreo(usuario.correoElectronico);
        this._UserRequest.buscarUsuario();
        this.router.navigate(['interface']);
      } else {
        //this.correoExistente = false;
        alert("ha ocurrido un error");
      }
    } else {

    }
  }

  // CAPTURA ADMIN
  evaluarAdministrador() {
    this.ObligatoriosAdministrador = true;

    const ADMIN = {
      nombre: this.nombre,
      apellidoM: this.apellidoM,
      apellidoP: this.apellidoP,
      correoElectronico: this.correo,
      contrasena: this.contrasena,
    }

    this.evaluarNombreAdmin(ADMIN);
  }

  evaluarNombreAdmin(administrador: any) {
    if (this.nombre == "") {
      this.validarNombre = false;
      this.ObligatoriosAdministrador = false;
    } else {
      this.validarNombre = true;
      administrador.nombre = this.nombre
    }
    this.evaluarApellidoPAdmin(administrador);
  }

  evaluarApellidoPAdmin(administrador: any) {
    if (this.apellidoP == "") {
      this.validarApellidoP = false;
      this.ObligatoriosAdministrador = false;
    } else {
      this.validarApellidoP = true;
      administrador.apellidoP = this.apellidoP
    }
    this.evaluarApellidoMAdmin(administrador);
  }

  evaluarApellidoMAdmin(administrador: any) {
    if (this.apellidoM == "") {
      this.validarApellidoM = false;
      this.ObligatoriosAdministrador = false;
    } else {
      this.validarApellidoM = true;
      administrador.apellidoM = this.apellidoM
    }
    this.evaluarCorreoAdmin(administrador);
  }

  evaluarCorreoAdmin(administrador: any) {
    if (this.correo == "") {
      this.ObligatoriosAdministrador = false;
      this.validarCorreo = false;
    } else {
      this.validarCorreo = true;
      administrador.correoElectronico = this.correo;
    }
    this.evaluarContrasenaAdmin(administrador);

  }

  evaluarContrasenaAdmin(administrador: any) {
    administrador.correoElectronico = this.correo;

    if (this.contrasena == "" && this.contrasenaValidacion == "") {
      this.validarContrasena = false;
      this.validarContrasenaVe = false;
      this.ObligatoriosAdministrador = false;

    } else if (this.contrasena == "") {
      this.validarContrasena = false;
      this.ObligatoriosCandidato = false;
    } else if (this.contrasenaValidacion == "") {
      this.validarContrasenaVe = false;
      this.ObligatoriosAdministrador = false;
    } else {
      if (this.contrasena != this.contrasenaValidacion) {
        this.validarContrasenasIguales = false
        this.ObligatoriosAdministrador = false;
      } else {
        this.validarContrasenasIguales = true;
        this.comprobarContrasenaAdmin(administrador);
      }
    }

    this.registarAdministrador(administrador);

  }

  comprobarContrasenaAdmin(administrador: any) {
    // SE DEBEN AGREGAR VALIDACIONES PARA LA EVALUACION DE LA CADENA  
    // COMPROBAR LONGITUD MINIMA
    // COMPROBAR QUE LA CADENA CONTENGA EL CARACTER NUMEROS Y LETRAS (CARACTER ESPECIAL ?)

    administrador.contrasena = this.contrasena;
    console.log(administrador);
  }

  registarAdministrador(administrador: any) {
    //alert("administrador");
    let numero = 0;
    if (this.ObligatoriosAdministrador != false) {
      numero = this._AdminRequest.registrar(administrador);
      if (numero != 0) {
        this.limpiarCampos();
        this.router.navigate(['interface']);
      } else {
        //this.correoExistente = false;
        alert("ha ocurrido un error");
      }
    } else {
    }
  }

  // CAPTURA EMPLEADOR
  evaluarEmpleador() {
    this.ObligatoriosEmpleador = true;

    const EMPLEADOR = {
      nombre: this.nombre,
      apellidoM: this.apellidoM,
      apellidoP: this.apellidoP,
      correoElectronico: this.correo,
      contrasena: this.contrasena,
    }

    this.evaluarNombreEmpleador(EMPLEADOR);
  }

  evaluarNombreEmpleador(empleador: any) {
    if (this.nombre == "") {
      this.validarNombre = false;
      this.ObligatoriosEmpleador = false;
    } else {
      this.validarNombre = true;
      empleador.nombre = this.nombre
    }
    this.evaluarApellidoPEmpleador(empleador);
  }

  evaluarApellidoPEmpleador(empleador: any) {
    if (this.apellidoP == "") {
      this.validarApellidoP = false;
      this.ObligatoriosEmpleador = false;
    } else {
      this.validarApellidoP = true;
      empleador.apellidoP = this.apellidoP
    }
    this.evaluarApellidoMEmpleador(empleador);
  }

  evaluarApellidoMEmpleador(empleador: any) {
    if (this.apellidoM == "") {
      this.validarApellidoM = false;
      this.ObligatoriosEmpleador = false;
    } else {
      this.validarApellidoM = true;
      empleador.apellidoM = this.apellidoM
    }
    this.evaluarCorreoEmpleador(empleador);
  }

  evaluarCorreoEmpleador(empleador: any) {
    if (this.correo == "") {
      this.ObligatoriosEmpleador = false;
      this.validarCorreo = false;
    } else {
      this.validarCorreo = true;
      empleador.correoElectronico = this.correo;
    }
    this.evaluarContrasenaEmpleador(empleador);
  }


  evaluarContrasenaEmpleador(empleador: any) {
    empleador.correoElectronico = this.correo;

    if (this.contrasena == "" && this.contrasenaValidacion == "") {
      this.validarContrasena = false;
      this.validarContrasenaVe = false;
      this.ObligatoriosEmpleador = false;

    } else if (this.contrasena == "") {
      this.validarContrasena = false;
      this.ObligatoriosCandidato = false;
    } else if (this.contrasenaValidacion == "") {
      this.validarContrasenaVe = false;
      this.ObligatoriosEmpleador = false;
    } else {
      if (this.contrasena != this.contrasenaValidacion) {
        this.validarContrasenasIguales = false
        this.ObligatoriosEmpleador = false;
      } else {
        this.validarContrasenasIguales = true;
        this.comprobarContrasenaEmpleador(empleador);

      }
    }

    this.registarEmpleador(empleador);

  }

  comprobarContrasenaEmpleador(empleador: any) {
    // SE DEBEN AGREGAR VALIDACIONES PARA LA EVALUACION DE LA CADENA  
    // COMPROBAR LONGITUD MINIMA
    // COMPROBAR QUE LA CADENA CONTENGA EL CARACTER NUMEROS Y LETRAS (CARACTER ESPECIAL ?)

    empleador.contrasena = this.contrasena;
    console.log(empleador);
  }

  registarEmpleador(empleador: any) {
    //alert("empleador");
    let numero = 0;
    if (this.ObligatoriosEmpleador != false) {
      numero = this._EmployerRequest.registrar(empleador);
      if (numero != 0) {
        this.limpiarCampos();
        //this._UserRequest.cargarUsuario(empleador.correoElectronico);
        this.router.navigate(['interface'])

      } else {
        //this.correoExistente = false;
        alert("ha ocurrido un error");
      }
    } else {

    }
  }

  //CAPTURA EMPRESA
  evaluarEmpresa() {
    this.ObligatoriosEmpresa = true;

    const EMPRESA = {
      nombre: this.nombre,
      domicilio: this.ubicacion,
      id_estado: this.estado.id_estado,
      id_municipio: this.municipio.id_municipio,
      descripcion: this.descripcion
    }
    this.evaluarNombreEmpresa(EMPRESA);
  }

  evaluarNombreEmpresa(empresa: any) {
    if (this.nombre == "") {
      this.validarNombre = false;
      this.ObligatoriosEmpresa = false;
    } else {
      this.validarNombre = true;
      empresa.nombre = this.nombre;
    }
    this.evaluarCalleyNumero(empresa);
  }

  evaluarCalleyNumero(empresa: any) {
    if (this.ubicacion == "") {
      this.validarCalle = false;
      this.ObligatoriosEmpresa = false;
    } else {
      this.validarCalle = true;
      empresa.ubicacion = this.ubicacion;
    }
    this.evaluarEstado(empresa);
  }

  evaluarEstado(empresa: any) {
    if (this.estado.id_estado == 0) {
      this.validarEstado = false;
      this.ObligatoriosEmpresa = false;
    } else {
      this.validarEstado = true;
      empresa.id_estado = this.estado.id_estado;
    }
    this.evaluarMunicipio(empresa);
  }

  evaluarMunicipio(empresa: any) {
    if (this.municipio.id_municipio == 0) {
      this.validarMunicipio = false;
      this.ObligatoriosEmpresa = false;
    } else {
      this.validarMunicipio = true;
      empresa.id_municipio = this.municipio.id_municipio;
    }
    this.evaluarDescripcion(empresa);
  }

  evaluarDescripcion(empresa: any) {
    if (this.descripcion == "") {
      this.validarDescripcion = false;
      this.ObligatoriosEmpresa = false;
    } else {
      this.validarDescripcion = true;
      empresa.descripcion = this.descripcion;
    }
    console.log(empresa);
    this.registarEmpresa(empresa);
  }


  registarEmpresa(empresa: any) {
    //alert("empresa");
    let numero = 0;
    if (this.ObligatoriosEmpresa != false) {
      numero = this._CompanyRequest.registrar(empresa);
      if (numero != 0) {
        this.limpiarCampos();
        this.router.navigate(['interface']);
      } else {
        // this.validarNombreRegistrado = false;
        alert("ha ocurrido un error");
      }
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
    //this.estado = { id_estado: 0, nombreEstado: "Selecciona un Estado" };
    //this.municipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", id_estado: 0 };
    this.correo = "";
    this.contrasena = "";
    this.contrasenaValidacion = "";
    this.descripcion = "";
  }
}

