import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Estado } from 'src/app/Services/Entity/estado';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {

  ladasMexico = ["+51", "+52", "+53"]; // CAMBIAR POR UN OBSERBABLE

  usuario: Candidato = new Candidato;
  usuarioModificado: Candidato = new Candidato;

  datosPrincipales: boolean = true;
  datosSecundarios: boolean = false;

  //DATOS A CAPTURAR
  lada: string;
  nuevoNombre: string = "";
  nuevoApellidoP: string = "";
  nuevoApellidoM: string = "";
  nuevoTelefono: string  = "";
  nuevaEdad: number = 0;
  nuevaProfesion: string = "";

  nuevoDomicilio: string = "";
  nuevoEstado: Estado;
  nuevoMunicipio: Municipio;
  nuevoCentroEducativo: string = "";
  nuevoPuesto: string = "";
  bloquearMunicipio: string = "all"


  nuevoCurriculum: any;
  nuevaImagenPerfil: any;
  nuevaImagenPortada: any;
  nuevaDescripcion: string = "";

  estadosMexico: Estado[] = [];
  municipiosMexico: Municipio[] = [];

  constructor(private _UserRequest: InterfaceService, private _CandidateRequest: CandidateService, private router: Router) {

    this.lada = "+52";
    this.nuevoEstado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.nuevoMunicipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado }

  }

  ngOnInit(): void {
    this.buscarUsuario();
    this.bloquearMunicipios();
  }

  validarLongitud(){
    if(this.nuevoTelefono.length == 10){

    } else if(this.nuevoTelefono.length == 17){
      this.nuevoTelefono = this.nuevoTelefono.slice(3, 17);

    } else if(this.nuevoTelefono.length == 18){
      this.nuevoTelefono = this.nuevoTelefono.slice(4, 18);

    } else if(this.nuevoTelefono.length == 19){
      this.nuevoTelefono = this.nuevoTelefono.slice(5, 19);
    } else {

    }
  }

  ngOnDestroy(): void {

  }

  buscarUsuario() {
    this._CandidateRequest.obtener().then((data: any) => {
      this.usuario = data
      this.asignarDatos(this.usuario);
      console.log(this.usuario)
    });
  }

  bloquearMunicipios() {
    this.nuevoEstado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.nuevoMunicipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado }
    this.bloquearMunicipio = "all";

    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estadosMexico = data;
      console.log(this.estadosMexico);
    });

  }


  actualizarEstado(estado: any) {
    this.nuevoEstado = estado;
    this.nuevoMunicipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado }
    this.bloquearMunicipio = "all";

    this._UserRequest.obtenerMunicipios(this.nuevoEstado.id_estado).subscribe(data => {
      this.municipiosMexico = data;
      console.log(this.municipiosMexico);
    });

  }

  actualizarLada(numero: string) {
    this.lada = numero;
  }

  actualizarMunicipio(municipio: any) {
    this.nuevoMunicipio = municipio;
  }

  modificarPrincipales() {

    if (this.datosPrincipales == true) {
      this.modificarSecundarios();
    } else {
      this.datosPrincipales = true;
      this.datosSecundarios = false;
    }
  }

  modificarSecundarios() {

    if (this.datosSecundarios == true) {
      this.modificarPrincipales();
    } else {
      this.datosPrincipales = false;
      this.datosSecundarios = true;
    }
  }

  limpiarTodo() {

    this.nuevoNombre = "";
    this.nuevoApellidoP = "";
    this.nuevoApellidoM = "";
    this.nuevoTelefono  = "";
    this.nuevaEdad = 0;
    this.nuevaProfesion = "";

    this.nuevoDomicilio = "";
    this.nuevoEstado = new Estado
    this.nuevoMunicipio = new Municipio

    this.nuevoCurriculum = "";
    this.nuevaImagenPerfil = "";
    this.nuevaImagenPortada = "";
    this.nuevaDescripcion = "";
  }

  asignarDatos(usuario: Candidato) {
    this.guardarObjeto(usuario);
    this.nuevoNombre = usuario.usuario.nombre;
    this.nuevoApellidoP = usuario.usuario.apellidoP;
    this.nuevoApellidoM = usuario.usuario.apellidoM;
    this.nuevoTelefono = usuario.usuario.telefono;
    this.nuevaEdad = usuario.edad;
    this.nuevaProfesion = usuario.profesion;

    this.nuevoDomicilio = usuario.domicilio;
    this.nuevoEstado = usuario.estado;
    this.nuevoMunicipio = usuario.municipio;
    this.nuevoCentroEducativo = usuario.centroEducativo;
    this.nuevoPuesto = usuario.puestoActual;

    this.validarLongitud();
  }

  guardarObjeto(usuario: Candidato) {
    this.usuario = usuario;
  }

  capturarNuevosDatos() {
    if (this.datosPrincipales == true && this.datosSecundarios == false) {
      this.capturarPrincipales();
    } else if (this.datosPrincipales == false && this.datosSecundarios == true) {
      this.capturarSecundarios();
    } else {
      alert("No se selecciono una opcion"); 
    }

  }

  capturarPrincipales() {

    const USUARIO_MODIFICADO = {

      id_candidato: this.usuario.id_candidato,
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
      //edad:this.nuevaEdad,
      profesion: this.nuevaProfesion,
    
    }

    this.validarDatosNombre(USUARIO_MODIFICADO);
  }

  validarDatosNombre(usuarioModificado: any) {

    if (usuarioModificado.nombre == "") {
      usuarioModificado.nombre = this.usuario.usuario.nombre;

    } else if (usuarioModificado.nombre.length < 3) {
      usuarioModificado.nombre = this.usuario.usuario.nombre;

    } else if (usuarioModificado.nombre.length > 25) {
      usuarioModificado.nombre = this.usuario.usuario.nombre;

    } else {

    }

    this.validarDatosApellidoP(usuarioModificado);

  }

  validarDatosApellidoP(usuarioModificado: any) {

    if (usuarioModificado.apellidoP == "") {
      usuarioModificado.apellidoP = this.usuario.usuario.apellidoP;

    } else if (usuarioModificado.apellidoP.length < 4) {
      usuarioModificado.apellidoP = this.usuario.usuario.apellidoP;

    } else if (usuarioModificado.apellidoP.length > 15) {
      usuarioModificado.apellidoP = this.usuario.usuario.apellidoP;

    } else {

    }

    this.validarDatosApellidoM(usuarioModificado);
  }


  validarDatosApellidoM(usuarioModificado: any) {

    if (usuarioModificado.apellidoM == "") {
      usuarioModificado.apellidoM = this.usuario.usuario.apellidoM;

    } else if (usuarioModificado.apellidoM.length < 4) {
      usuarioModificado.apellidoM = this.usuario.usuario.apellidoM;

    } else if (usuarioModificado.apellidoM.length > 15) {
      usuarioModificado.apellidoM = this.usuario.usuario.apellidoM;

    } else {

    }

   this.validarTelefono(usuarioModificado);
  }

  validarTelefono(usuarioModificado: any){

    if (this.nuevoTelefono == "") {
      usuarioModificado.telefono = this.usuario.usuario.telefono
    } else {
      let numeroConLada = "";
      numeroConLada = this.lada +" "+ this.nuevoTelefono;

      if (numeroConLada.length < 18) {
        usuarioModificado.telefono = this.usuario.usuario.telefono
      } else if (numeroConLada.length > 18) {
        usuarioModificado.telefono = this.usuario.usuario.telefono
      } else {
        usuarioModificado.telefono = numeroConLada
      }
    }

    this.validarEdad(usuarioModificado);
  }

  validarEdad(usuarioModificado: any){
    // FALATA AGREGAR FUNCION PARA REDONDEAR EDADES
    if(usuarioModificado.edad == 0){
      usuarioModificado.edad = this.usuario.edad;
    } else if (usuarioModificado.edad < 18){
      usuarioModificado.edad = this.usuario.edad;
    } else if (usuarioModificado.edad > 70){
      usuarioModificado.edad = this.usuario.edad;
    } else {

    }

    this.validarDatosDomicilio(usuarioModificado);
  }

  validarDatosDomicilio(usuarioModificado: any) {

    if (usuarioModificado.domicilio == "") {
      usuarioModificado.domicilio = this.usuario.domicilio;
    } else if (usuarioModificado.domicilio.length < 5) {
      usuarioModificado.domicilio = this.usuario.domicilio;
    } else if (usuarioModificado.domicilio.length > 50) {
      usuarioModificado.domicilio = this.usuario.domicilio;

    } else {

    }

    this.validarDatosDescripcion(usuarioModificado);
  }

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

    }

    this.validarProfesion(usuarioModificado);
  }

  validarProfesion(usuarioModificado:any){
    if (usuarioModificado.profesion == ""){
      usuarioModificado.profesion = this.usuario.profesion;

    } else if(usuarioModificado.profesion == null){
      usuarioModificado.profesion = this.usuario.profesion;

    } else if(usuarioModificado.profesion.length < 4){
      usuarioModificado.profesion = this.usuario.profesion;
    } else if (usuarioModificado.profesion.length > 25){
      usuarioModificado.profesion = this.usuario.profesion;
    } else {

    }

    this.validarDatosEscuela(usuarioModificado);
  }

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

    }

    this.validarDatosPuesto(usuarioModificado);
  }

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

    }

    this.validarDatosEstado(usuarioModificado);
  }

  validarDatosEstado(usuarioModificado: any) {

    if (usuarioModificado.id_estado == 0) {
      alert("NO SE SELECCIONO UN ESTADO. Los datos del municipio y estado NO han cambiado");
      usuarioModificado.id_estado = this.usuario.estado.id_estado;
      usuarioModificado.id_municipio = this.usuario.municipio.id_municipio;

    } else if (usuarioModificado.id_estado != this.usuario.estado.id_estado) {
      this.validarMunicipio(usuarioModificado);
    }
    this.guardarModPrincipales(usuarioModificado);  
  }

  validarMunicipio(usuarioModificado:any){

    if (usuarioModificado.id_municipio == 0) {
      alert("NO SE SELECCIONO UN MUNICIPIO. Los datos del municipio y estado NO han cambiado");
      usuarioModificado.id_estado = this.usuario.estado.id_estado;
      usuarioModificado.id_municipio = this.usuario.municipio.id_municipio;
    } else {

    }

  }

  // MODIFICACION DE IMAGENES
  capturarSecundarios() {
    const USUARIO_MODIFICADO = {

    }

  }



  guardarModPrincipales(usuarioModificado: any) {

    this._CandidateRequest.modificar(usuarioModificado).then((data: any) => {
      if (data.estatus == true) {
        alert("Modificación Exitosa");
        this.router.navigate(['interface/perfil']);

      } else {
        alert("Algo Fallo");
      }
    });

  }



}
