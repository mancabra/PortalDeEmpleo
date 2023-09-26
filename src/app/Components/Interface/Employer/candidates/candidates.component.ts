import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Estado } from 'src/app/Services/Entity/estado';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Postulacion } from 'src/app/Services/Entity/postulacion';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  // FUNCION PARA ALMACENAR EL USUARIO 
  empleador: Empleador = new Empleador;

  // VECTOR PARA ALMACENAR LAS PUBLICACIONES REALIZADAS POR EL EMPLEADOR
  publicacionesSin: Vacante[] = [];

  // VECTOR PARA ALMACENAR LAS PUBLICACIONES REALIZADAS POR EL EMPLEADOR
  // LAS PUBLICACIONES EN ESTE VECTOR SE ALMACENAN EN ORDEN DE PUEBLICACION
  publicaciones: Vacante[] = [];

  // VECTOR QUE ALMACENAS LOS CANDIDATOS DE UNA VACANTE
  postulaciones: Postulacion[] = [];

  // VARIABLE QUE ALMACENA UN CANDIDATO ESPECIFICO DE LAS POSTULACIONES
  candidatos: Candidato[] = [];

  // VARIABLE QUE ALMACENA UNA VACENTE ESPECIFICA DE LAS POSTULACIONES
  vacanteActual: Vacante = new Vacante;

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _EmployerRequest: EmployerService,
    private router: Router,
    private _CandidateRequest: CandidateService,
    private _UserRequest: InterfaceService,
    private _AdminRequest: AdminService) {
  }

  ngOnInit(): void {
    this.buscarUsuario();
    // this.cargarMuestra();
  }


  cargarMuestra() {
    this.publicaciones = [
      {
        id_vacante: 1,
        nombreVacante: "Gerente",
        especialista: "ninguno",
        sueldo: 10000,
        horario: "9:00am - 6:00pm",
        domicilio: "Alcatraz n9",
        municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
        estatus: false,
        descripcion: "Carnicero de planta",
        empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
        empleador: new Empleador,
        candidatos: [],
        tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
        tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
        modalidadTrabajo: new ModalidadTrabajo,
        id_postulacion: 0,
        fechaPublicacionSrt: new Date,
        diasPublicada: 0
      }, {
        id_vacante: 2,
        nombreVacante: "Repartidor",
        especialista: "ninguno",
        sueldo: 10000,
        horario: "9:00am - 6:00pm",
        domicilio: "Alcatraz n9",
        municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
        estatus: false,
        descripcion: "Carnicero de planta",
        empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
        empleador: new Empleador,
        candidatos: [],
        tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
        tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
        modalidadTrabajo: new ModalidadTrabajo,
        id_postulacion: 0,
        fechaPublicacionSrt: new Date,
        diasPublicada: 0
      }, {
        id_vacante: 3,
        nombreVacante: "Operador",
        especialista: "Tecnico",
        sueldo: 10000,
        horario: "9:00am - 6:00pm",
        domicilio: "Alcatraz n9",
        municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
        estatus: false,
        descripcion: "Carnicero de planta",
        empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
        empleador: new Empleador,
        candidatos: [],
        tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
        tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
        modalidadTrabajo: new ModalidadTrabajo,
        id_postulacion: 0,
        fechaPublicacionSrt: new Date,
        diasPublicada: 0
      }, {
        id_vacante: 4,
        nombreVacante: "Pastelero",
        especialista: "Repostero",
        sueldo: 10000,
        horario: "9:00am - 6:00pm",
        domicilio: "Alcatraz n9",
        municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
        estatus: false,
        descripcion: "Carnicero de planta",
        empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
        empleador: new Empleador,
        candidatos: [],
        tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
        tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
        modalidadTrabajo: new ModalidadTrabajo,
        id_postulacion: 0,
        fechaPublicacionSrt: new Date,
        diasPublicada: 0
      }, {
        id_vacante: 5,
        nombreVacante: "Panadero",
        especialista: "Panadero",
        sueldo: 10000,
        horario: "9:00am - 6:00pm",
        domicilio: "Alcatraz n9",
        municipio: { id_municipio: 0, nombreMunicipio: "mexico", estado: new Estado },
        estatus: false,
        descripcion: "Carnicero de planta",
        empresa: { id_empresa: 0, nombre: "bimbo", descripcion: "panaderia", vacantes_empresa: [] },
        empleador: new Empleador,
        candidatos: [],
        tipoHorario: { id_tipoHorario: 0, dias: "sab-dom", tipoHorario_vacantes: [] },
        tipoContratacion: { id_tipoContratacion: 0, horario: "VIRTUAL", tipoContratacion_vacantes: [] },
        modalidadTrabajo: new ModalidadTrabajo,
        id_postulacion: 0,
        fechaPublicacionSrt: new Date,
        diasPublicada: 0
      }
    ];
  }

  // FUNCION PARA OBTENER EL USUARIO LOGUEADO DE BD
  buscarUsuario() {
    this._EmployerRequest.obtener().then((data: any) => {
      this.empleador = data;
      console.log(this.empleador);
      this.obtenerPublicaciones();
    });
  }

  // FUNCION PARA OBTENER LAS PUBLICACIONES REGISTRADAS EN BD DE UN EMPLEADOR
  obtenerPublicaciones() {
    this._EmployerRequest.obtenerPublicaciones(this.empleador.id_empleador).subscribe(data => {
      this.publicacionesSin = data;
      this.ordenarPublicaciones(this.publicacionesSin);
      console.log(this.publicaciones);
    });
  }

  // FUNCION PARA ORDENAR LAS PUBLICACIONES SEGUN SU FECHA DE PUEBLICACION
  ordenarPublicaciones(publicaciones: Vacante[]) {
    this.publicaciones = publicaciones.sort(function (v1, v2) {
      if (v1.diasPublicada > v2.diasPublicada) {
        return 1;
      }
      if (v1.diasPublicada < v2.diasPublicada) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  // FUNCION QUE EVALUA EL VECTOR DE PUBLICACIONES  
  // SI EL VECTOR ESTA VACIO MUESTRA UNA PANTALLA ALTERNATIVA
  cargarPantalla() {
    if (this.publicaciones.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  // FUNCION QUE EVALUA EL VECTOR DE CANDIDATOS DE LA VACANTE SELECCIONADA 
  // SI EL VECTOR ESTA VACIO MUESTRA UNA PANTALLA ALTERNATIVA
  cargarPantallaI() {
    if (this.candidatos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  // FUNCION DEL BOTON QUE PERMITE MODICICAR UNA VACANTE
  modificarVacante(vacante: Vacante) {
    this._EmployerRequest.guardarVacante(vacante);
    this.router.navigate(['interface/publicaciones/modificar']);
  }

  // FUNCION DEL BOTON QYE PERMITE BORRAR UNA VACANTE
  eliminarVacante(vacante: Vacante) {
    this._EmployerRequest.eliminarVacante(vacante.id_vacante).then((data: any) => {
      if (data.estatus == true) {
        this.enviarAlerta("La vacante fue eliminada correctamente.", false);
        this.obtenerPublicaciones();
        this.cargarPantalla();
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar la vacante.", true);
      }
    });
  }

  // FUNCION DEL BOTON QUE PERMITE MOSTRAR LOS CANDIDATOS DE UNA VACANTE
  mostrarCandidatos(vacante: Vacante) {
    this.vacanteActual = vacante;
    this._EmployerRequest.ontenerCandidatosVacante(vacante.id_vacante).subscribe(data => {
      this.candidatos = data;
      console.log(this.candidatos);
    });
    //this.cargarCandidatos();
  }

  cargarCandidatos() {
    this.candidatos = [
      {
        //this.empleador = {
        id_candidato: 0,
        //id_empleador:0,
        edad: 25,
        domicilio: "C. Alcatraz",
        puestoActual: "Diseñador",
        descripcion: "Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web",
        centroEducativo: "UAM: Azcapotzalco",
        rutaCv: "Untitled-2.pdf",
        usuario: {
          id_usuario: 0,
          nombre: "Ramiro",
          correoElectronico: "mancabra97@gmail.com",
          contrasena: "1234556",
          tipoUsuario: 2,
          apellidoP: "Lopez",
          apellidoM: "Gastelum",
          telefono: "+52 5514098249",
          estatusUsuario: true,
          rutaImagenPerfil: "Captura de pantalla 2023-09-07 223459.png",
          rutaImagenPortada: "Captura de pantalla 2023-09-07 224204.png",
        },
        vacantes: [],
        idiomas: [
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
        ],
        municipio: { id_municipio: 0, nombreMunicipio: "talxacala", estado: new Estado },
        estado: { id_estado: 1, nombreEstado: "tlaxcala", municipios: [] },
        profesion: "DISEÑADOR",
        fechaNacimiento: new Date,
        habilidades: [
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
        ],
        rutaEspecialidad: "Untitled-2.pdf",
        rutaEspecialidad2: "Untitled-2.pdf",
        rutaEspecialidad3: "Untitled-2.pdf",
      },
      {
        //this.empleador = {
        id_candidato: 0,
        //id_empleador:0,
        edad: 25,
        domicilio: "C. Alcatraz",
        puestoActual: "Diseñador",
        descripcion: "Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web",
        centroEducativo: "UAM: Azcapotzalco",
        rutaCv: "Untitled-2.pdf",
        usuario: {
          id_usuario: 0,
          nombre: "Ramiro",
          correoElectronico: "mancabra97@gmail.com",
          contrasena: "1234556",
          tipoUsuario: 2,
          apellidoP: "Lopez",
          apellidoM: "Gastelum",
          telefono: "+52 5514098249",
          estatusUsuario: true,
          rutaImagenPerfil: "Captura de pantalla 2023-09-07 223459.png",
          rutaImagenPortada: "Captura de pantalla 2023-09-07 224204.png",
        },
        vacantes: [],
        idiomas: [
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
        ],
        municipio: { id_municipio: 0, nombreMunicipio: "talxacala", estado: new Estado },
        estado: { id_estado: 1, nombreEstado: "tlaxcala", municipios: [] },
        profesion: "DISEÑADOR",
        fechaNacimiento: new Date,
        habilidades: [
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
        ],
        rutaEspecialidad: "Untitled-2.pdf",
        rutaEspecialidad2: "Untitled-2.pdf",
        rutaEspecialidad3: "Untitled-2.pdf",
      }, {
        //this.empleador = {
        id_candidato: 0,
        //id_empleador:0,
        edad: 25,
        domicilio: "C. Alcatraz",
        puestoActual: "Diseñador",
        descripcion: "Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web",
        centroEducativo: "UAM: Azcapotzalco",
        rutaCv: "Untitled-2.pdf",
        usuario: {
          id_usuario: 0,
          nombre: "Ramiro",
          correoElectronico: "mancabra97@gmail.com",
          contrasena: "1234556",
          tipoUsuario: 2,
          apellidoP: "Lopez",
          apellidoM: "Gastelum",
          telefono: "+52 5514098249",
          estatusUsuario: true,
          rutaImagenPerfil: "Captura de pantalla 2023-09-07 223459.png",
          rutaImagenPortada: "Captura de pantalla 2023-09-07 224204.png",
        },
        vacantes: [],
        idiomas: [
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
        ],
        municipio: { id_municipio: 0, nombreMunicipio: "talxacala", estado: new Estado },
        estado: { id_estado: 1, nombreEstado: "tlaxcala", municipios: [] },
        profesion: "DISEÑADOR",
        fechaNacimiento: new Date,
        habilidades: [
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
        ],
        rutaEspecialidad: "Untitled-2.pdf",
        rutaEspecialidad2: "Untitled-2.pdf",
        rutaEspecialidad3: "Untitled-2.pdf",
      }, {
        //this.empleador = {
        id_candidato: 0,
        //id_empleador:0,
        edad: 25,
        domicilio: "C. Alcatraz",
        puestoActual: "Diseñador",
        descripcion: "Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web Diseñador grafico con experiencia en el diseño digital y diseño de paginas web",
        centroEducativo: "UAM: Azcapotzalco",
        rutaCv: "Untitled-2.pdf",
        usuario: {
          id_usuario: 0,
          nombre: "Ramiro",
          correoElectronico: "mancabra97@gmail.com",
          contrasena: "1234556",
          tipoUsuario: 2,
          apellidoP: "Lopez",
          apellidoM: "Gastelum",
          telefono: "+52 5514098249",
          estatusUsuario: true,
          rutaImagenPerfil: "Captura de pantalla 2023-09-07 223459.png",
          rutaImagenPortada: "Captura de pantalla 2023-09-07 224204.png",
        },
        vacantes: [],
        idiomas: [
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
          { id_idioma: 0, nombreIdioma: "ingles", candidatos: [] },
        ],
        municipio: { id_municipio: 0, nombreMunicipio: "talxacala", estado: new Estado },
        estado: { id_estado: 1, nombreEstado: "tlaxcala", municipios: [] },
        profesion: "DISEÑADOR",
        fechaNacimiento: new Date,
        habilidades: [
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
          { id_habilidad: 0, nombreHabilidad: "trabajo en equipo", candidatos: [] },
        ],
        rutaEspecialidad: "Untitled-2.pdf",
        rutaEspecialidad2: "Untitled-2.pdf",
        rutaEspecialidad3: "Untitled-2.pdf",
      }
    ];
  }

  // FUNCION PARA OBTENER LAS POSTULACIONES DE UN CANDIDATO
  // SE OBTIENEN LAS POSTULACIONES DEL CANDIDATO QUE SE QUIERE ELIMINAR 
  obtenerPostulacion(candidato: Candidato) {
    this._CandidateRequest.obtenerPostulaciones(candidato.id_candidato).subscribe(data => {
      this.postulaciones = data;
      for (let i = 0; i < this.postulaciones.length; i++) {
        const element = this.postulaciones[i];

        if (this.postulaciones[i].vacante.id_vacante == this.vacanteActual.id_vacante) {
          this.eliminarPostulacion(element, candidato);
          break;
        } else {
        }
      }
    });
  }

  // FUNCION PARA ELIMINAR UNA POSTULACION SEGUN SU ID
  // SE TOMA TOMA LA POSTULACION DELECIONADA DE LA FUNCION ANTERIOR 
  eliminarPostulacion(postulacion: Postulacion, candidato: Candidato) {
    this._CandidateRequest.eliminarPostulacion(postulacion.id_postulacion).then((data: any) => {
      if (data.estatus == true) {
        this.enviarAlerta("La postulación del candidato fue eliminada correctamente.", false);
        this.enviarAlertaExito(candidato);
        this.mostrarCandidatos(this.vacanteActual);
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar la postulación del candidato.", true);
        this.enviarAlertaError(candidato);
      }
    });
  }

  // FUNCION PARA OBTENER LAS POSTULACIONES DE UN CANDIDATO
  // SE OBTIENEN LAS POSTULACIONES DEL CANDIDATO QUE SE QUIERE ACEPTAR 
  aceptarCandidato(candidato: Candidato) {
    this._CandidateRequest.obtenerPostulaciones(candidato.id_candidato).subscribe(data => {
      this.postulaciones = data;
      for (let i = 0; i < this.postulaciones.length; i++) {
        const element = this.postulaciones[i];
        if (this.postulaciones[i].vacante.id_vacante == this.vacanteActual.id_vacante) {
          this.aceptar(element, candidato);
          break;
        } else {

        }
      }
    });
  }
  // VARIABLE PARA CAMVIARA DE INTERFAZ 
  ocultarCandidato: boolean = true;
  vistaAdministrar: boolean = true;
  // FUNCNION PARA MOSTRAR EL PERFIL DE UN CANDIDATO
  verCandidato(usuario:Candidato) {
    this.ocultarCandidato = false;
    this._AdminRequest.usuarioActivo(usuario);
  }

  cerrar() {
    this.ocultarCandidato = true;
  }

  // FUNCION PARA ACEPTAR UNA POSTULACION SEGUN SU ID
  // SE TOMA TOMA LA POSTULACION DELECIONADA DE LA FUNCION ANTERIOR 
  aceptar(postulacion: Postulacion, candidato: Candidato) {
    const DTO = {
      id_postulacion: postulacion.id_postulacion,
    }

    this._EmployerRequest.aceptarCandidato(DTO).then((data: any) => {
      if (data.estatus == true) {
        this.enviarAlerta("La postulación del candidato fue aceptada correctamente.", false);
        this.enviarAlertaExitoGC(candidato);
        this.mostrarCandidatos(this.vacanteActual);
      } else {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio aceptar la postulación del candidato.", true);
        this.enviarAlertaErrorGC(candidato);
      }
    });
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaExito(candidato: Candidato) {
    const ALERTA = {
      nombreAlerta: "Postulacion Eliminada",
      textoAlerta: "La postulación a la vacante " + this.vacanteActual.nombreVacante + " del candidato " + candidato.usuario.nombre + " " + candidato.usuario.apellidoP + " ha sido eliminada, si usted no ha realizado esta acción puede que el candidato eliminara la postulacion."
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaError(candidato: Candidato) {
    const ALERTA = {
      nombreAlerta: "Eliminacion Fallida",
      textoAlerta: "La postulación a la vacante " + this.vacanteActual.nombreVacante + " del candidato " + candidato.usuario.nombre + " " + candidato.usuario.apellidoP + " no ha podido ser Eliminada correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaExitoGC(candidato: Candidato) {
    const ALERTA = {
      nombreAlerta: "Postulacion Aceptada",
      textoAlerta: "La postulación a la vacante " + this.vacanteActual.nombreVacante + " del candidato " + candidato.usuario.nombre + " " + candidato.usuario.apellidoP + " ha sido aceptada, le sugerimos contactar al candidato el correo " + candidato.usuario.correoElectronico + " o bien comunicarse al número: " + candidato.usuario.telefono + "."
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaErrorGC(candidato: Candidato) {
    const ALERTA = {
      nombreAlerta: "Proceso Fallido",
      textoAlerta: "La postulación a la vacante " + this.vacanteActual.nombreVacante + " del candidato " + candidato.usuario.nombre + " " + candidato.usuario.apellidoP + " no pudo ser aceptada, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
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
