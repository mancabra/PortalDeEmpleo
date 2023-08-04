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

 usuario: Candidato = new Candidato;

  //DATOS A CAPTURAR
  nuevoNombre: string = "";
  nuevoApellidoP: string = "";
  nuevoApellidoM: string = "";
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

  estadosMexico: Estado [] = [];
  municipiosMexico: Municipio [] = [];

  constructor(private _UserRequest: InterfaceService, private _CandidateRequest:CandidateService, private router:Router) {

    this.nuevoEstado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios:[]};
    this.nuevoMunicipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado }
  }

  ngOnInit(): void {
    this.bloquearMunicipios();
    this.buscarUsuario();
  }

  ngOnDestroy(): void {

  }

  buscarUsuario(){
    this._CandidateRequest.obtener().then((data:any) =>{
      this.usuario = data
      this.asignarDatos(this.usuario);
      console.log(this.usuario)
    });
  }

  bloquearMunicipios() {
    this.nuevoEstado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios:[]};
    this.nuevoMunicipio = { id_municipio: 0, nombreMunicipio: "Selecciona un Municipio", estado: new Estado }
    this.bloquearMunicipio = "none";

    this._UserRequest.obtenerEstados().subscribe(data=>{
      this.estadosMexico = data;
      console.log(this.estadosMexico);
    });
    
  }


  actualizarEstado(estado: any) {
    this.nuevoEstado = estado;
    this.bloquearMunicipio = "all";

    this._UserRequest.obtenerMunicipios(this.nuevoEstado.id_estado).subscribe(data=>{
      this.municipiosMexico = data;
      console.log(this.municipiosMexico);
    });

  }

  actualizarMunicipio(municipio: any) {
    this.nuevoMunicipio = municipio;
  }

  limpiarTodo() {

    this.nuevoNombre = "";
    this.nuevoApellidoP = "";
    this.nuevoApellidoM = "";
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

  asignarDatos(usuario:Candidato) {
    this.guardarObjeto(usuario);
    this.nuevoNombre = usuario.usuario.nombre;
    this.nuevoApellidoP = usuario.usuario.apellidoP;
    this.nuevoApellidoM = usuario.usuario.apellidoM;
    this.nuevaEdad = usuario.edad;
    this.nuevaProfesion = usuario.usuario.nombre;

    this.nuevoDomicilio = usuario.domicilio;
    this.nuevoEstado = usuario.estado;
    this.nuevoCentroEducativo = usuario.centroEducativo;
    this.nuevoPuesto = usuario.puestoActual;

  }

  guardarObjeto(usuario:Candidato){
    this.usuario = usuario;
  }

  capturarNuevosDatos() {
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
      id_estado: this.nuevoEstado.id_estado
    }

    this.validarDatosNombre(USUARIO_MODIFICADO);

  }

  validarDatosNombre(usuarioModificado: any) {

    if (usuarioModificado.nombre == "") {
      usuarioModificado.nombre = this.usuario.usuario.nombre;

    } else if (usuarioModificado.nombre.length < 3) {
      usuarioModificado.nombre = this.usuario.usuario.nombre;
    } else if (usuarioModificado.nombre.length > 15) {
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

    this.validarDatosDomicilio(usuarioModificado);
  }

  validarDatosDomicilio(usuarioModificado: any) {

    if (usuarioModificado.domicilio == "") {
      usuarioModificado.domicilio = this.usuario.domicilio;
    } else if (usuarioModificado.domicilio.length < 10) {
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

    } else if (usuarioModificado.descripcion.length < 10) {
      usuarioModificado.descripcion = this.usuario.descripcion;
    } else if (usuarioModificado.descripcion.length > 120) {
      usuarioModificado.descripcion = this.usuario.descripcion;

    } else {

    }

    this.validarDatosEscuela(usuarioModificado);
  }

  validarDatosEscuela(usuarioModificado: any) {

    if (usuarioModificado.centroEducativo == "") {
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
      usuarioModificado.id_estado = this.usuario.estado.id_estado;
      usuarioModificado.id_municipio = this.usuario.municipio.id_municipio;

    } else if (usuarioModificado.id_estado == this.usuario.estado.id_estado) {

      if (usuarioModificado.id_municipio == 0) {

        usuarioModificado.id_municipio = this.usuario.municipio.id_municipio;
      } else {

      }
    } else if (usuarioModificado.id_estado != 0) {

      if (usuarioModificado.id_municipio == 0) {
        //SI NO SE SELECCIONA UN MUNICIPIO SE AGREGARA EL MUNICIPIO CON ID 1 
        usuarioModificado.id_municipio = 1;

      } else {

      }

    }

    this.guardarMod(usuarioModificado);
  }

  guardarMod(usuarioModificado:any){
    
    this._CandidateRequest.modificar(usuarioModificado).then((data:any) =>{
      if(data == null){

      alert("Algo Fallo");
      }else{
        alert("Modificacion Exitosa");
        this.router.navigate(['perfil']);
      }
    });

  }



}
