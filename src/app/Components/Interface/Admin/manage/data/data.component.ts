import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Estado } from 'src/app/Services/Entity/estado';
import { Idioma } from 'src/app/Services/Entity/idioma';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {

  id_elemento: string = "id";
  nombreElemento: string = "nombre";
  vectorGeneral: any[] = [];

  tipoVector: string = "";
  subscription: Subscription;

  nombreCaptura: string = "";
  id_Captura: number = 0;

  vacante: boolean = true;
  persona: boolean = true;
  externo: boolean = false;

  constructor(
    private _AdminRequest: AdminService,
    private _EmployerRequest: EmployerService,
    private _UserRequest: InterfaceService,
    private _CandidateRequest: CandidateService) {

    this.subscription = this._AdminRequest.getLista().subscribe(data => {
      this.tipoVector = data;
      let botonModificar = document.getElementsByName('ModObj')[0];
      botonModificar.classList.add('bloqueo');

      this.identificarLista(this.tipoVector);
      this.quitarBloqueo();
    });

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.bloquearCrear();
    this.bloquearEditar();
  }


  bloquearBotones() {
    let botonModificar = document.getElementsByName('borrarBTN');
    for (let i = 0; i < botonModificar.length; i++) {
      botonModificar[i].classList.add('bloqueo');
    }
  }

  quitarBloqueo() {
    let botonModificar = document.getElementsByName('borrarBTN');
    for (let i = 0; i < botonModificar.length; i++) {
      botonModificar[i].classList.remove('bloqueo');
    }
  }

  identificarLista(lista: string) {
    if (lista == "idioma") {
      this.id_elemento = "id";
      this.nombreElemento = "nombre";
      this.vacante = true;
      this.persona = true;
      this.externo = false;
      this.desbloquearCrear();
      this.obtenrIdiomas();
    } else if (lista == "habilidad") {
      this.id_elemento = "id";
      this.nombreElemento = "nombre";
      this.vacante = true;
      this.persona = true;
      this.externo = false;
      this.desbloquearCrear();
      this.obtenerHabilidades();
    } else if (lista == "horario") {
      this.id_elemento = "id";
      this.nombreElemento = "nombre";
      this.vacante = true;
      this.persona = true;
      this.externo = false;
      this.desbloquearCrear();
      this.obtenerTiposDeHorario();
    } else if (lista == "contratacion") {
      this.id_elemento = "id";
      this.nombreElemento = "nombre";
      this.vacante = true;
      this.persona = true;
      this.externo = false;
      this.desbloquearCrear();
      this.obtenerTiposContratacion();
    } else if (lista == "modalidad") {
      this.id_elemento = "id";
      this.nombreElemento = "nombre";
      this.vacante = true;
      this.persona = true;
      this.externo = false;
      this.desbloquearCrear();
      this.obtenerModalidades();
    } else if (lista == "candidato") {
      this.id_elemento = "id";
      this.nombreElemento = "nombre";
      this.vacante = true;
      this.persona = false;
      this.externo = true;
      this.bloquearCrear()
      this.obtenerCandidatos();
    } else if (lista == "vacante") {
      this.id_elemento = "id";
      this.nombreElemento = "nombre";
      this.vacante = false;
      this.persona = true;
      this.externo = true;
      this.bloquearCrear()
      this.obtenerVacantes();
    } else if (lista == "empleador") {
      this.id_elemento = "id";
      this.nombreElemento = "nombre";
      this.vacante = true;
      this.persona = false;
      this.externo = true;
      this.bloquearCrear();
      this.obtenerempleadores();
    }
  }

  cargarPantallaPrincipal() {
    if (this.vectorGeneral.length != 0) {
      return true;
    } else {
      return true;
    }
  }

  vectorIdiomas: Idioma[] = [
    { id_idioma: 1, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 2, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 3, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
    { id_idioma: 4, nombreIdioma: "ingles", candidatos: [] },
  ]
  // FUNCION PARA OBTENER LOS IDIOMAS DISPONIBLES
  obtenrIdiomas() {

    this._CandidateRequest.obtenerIdiomas().subscribe(data => {
      this.vectorGeneral = [];

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_idioma,
          nombre: element.nombreIdioma,
          sueldo: "",
          horario: "",
          modalidad: "",
          apellidoP: "",
          apellidoM: "",
          correo: "",
          telefono: "",
        }
        this.vectorGeneral.push(OBJETO);
      }
    });
    /*
    this.vectorGeneral = [];

    for (let i = 0; i < this.vectorIdiomas.length; i++) {
      const element = this.vectorIdiomas[i];

      const OBJETO = {
        id: element.id_idioma,
        nombre: element.nombreIdioma,
        sueldo: "",
        horario: "",
        modalidad: "",
        apellidoP: "",
        apellidoM: "",
        correo: "",
        telefono: "",
      }
      this.vectorGeneral.push(OBJETO);
    }
    */
  }

  // FUNCION PARA OBTENER LAS HABILIDADES DISPONIBLES
  obtenerHabilidades() {
    this._CandidateRequest.obtenerHabilidades().subscribe(data => {
      this.vectorGeneral = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_habilidad,
          nombre: element.nombreHabilidad,
          sueldo: "",
          horario: "",
          modalidad: "",
          apellidoP: "",
          apellidoM: "",
          correo: "",
          telefono: "",
        }
        this.vectorGeneral.push(OBJETO);
      }
    });
  }

  // FUINCION PARA OBTENER LAS EMPRESAS DE BASE DE DATOS
  obtenerTiposDeHorario() {
    this._EmployerRequest.obtenerTiposDehorario().subscribe(data => {
      this.vectorGeneral = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_tipoHorario,
          nombre: element.dias,
          sueldo: "",
          horario: "",
          modalidad: "",
          apellidoP: "",
          apellidoM: "",
          correo: "",
          telefono: "",
          id_usuario:0
        }
        this.vectorGeneral.push(OBJETO);
      }
    });
  }

  // FUINCION PARA OBTENER LOS TIPOS DE CONTRATACION DE BASE DE DATOS
  obtenerTiposContratacion() {
    this._EmployerRequest.obtenerTiposContratacion().subscribe(data => {
      this.vectorGeneral = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_tipoContratacion,
          nombre: element.horario,
          sueldo: "",
          horario: "",
          modalidad: "",
          apellidoP: "",
          apellidoM: "",
          correo: "",
          telefono: "",
          id_usuario:0
        }
        this.vectorGeneral.push(OBJETO);
      }
    });
  }

  // FUINCION PARA OBTENER LOS TIPOS DE CONTRATACION DE BASE DE DATOS
  obtenerModalidades() {
    this._EmployerRequest.obtenerModalidades().subscribe(data => {
      this.vectorGeneral = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_modalidad,
          nombre: element.modalidad,
          sueldo: "",
          horario: "",
          modalidad: "",
          apellidoP: "",
          apellidoM: "",
          correo: "",
          telefono: "",
          id_usuario:0
        }
        this.vectorGeneral.push(OBJETO);
      }
    });
  }

  vectorVacantes: Vacante[] = [
    {
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
      tipoContratacion: { id_tipoContratacion: 0, horario: "indefinado", tipoContratacion_vacantes: [] },
      modalidadTrabajo: { id_modalidad: 1, modalidad: "virtual", modalidadTrabajo_vacantes: [] },
      id_postulacion: 0,
      fechaPublicacionSrt: "",
      diasPublicada: 0,
      estado: new Estado
    }
  ]
  // FUNCION PARA OBTENER LAS VACANTES DISPONIBLES
  obtenerVacantes() {
    this._CandidateRequest.obtenerVacantes().then((data: any) => {
      this.vectorGeneral = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_vacante,
          nombre: element.nombreVacante,
          sueldo: element.sueldo,
          horario: element.horario,
          modalidad: element.modalidadTrabajo,
          apellidoP: "",
          apellidoM: "",
          correo: "",
          telefono: "",
          id_usuario:0
        }
        this.vectorGeneral.push(OBJETO);
      }
    });
    /*
    this.vectorGeneral = [];

    for (let i = 0; i < this.vectorVacantes.length; i++) {
      const element = this.vectorVacantes[i];

      const OBJETO = {
        id: element.id_vacante,
        nombre: element.nombreVacante,
        sueldo: element.sueldo,
        horario: element.horario,
        modalidad: element.modalidadTrabajo
      }
      this.vectorGeneral.push(OBJETO);
    }*/
  }

  vectorPersonas: Candidato[] = [
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
       descripcionEspecialidad1: "holaMundo",
      rutaEspecialidad2: "Untitled-2.pdf",
       descripcionEspecialidad2: "holaMundo",
      rutaEspecialidad3: "Untitled-2.pdf",
       descripcionEspecialidad3: "holaMundo",
    }
  ];

  // FUNCION PARA OBTENER LOS CANDIDATOS DISPONIBLES
  obtenerCandidatos() {
    this._AdminRequest.obtenerCandidatos().then((data: any) => {
      this.vectorGeneral = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_candidato,
          nombre: element.usuario.nombre,
          sueldo: "",
          horario: "",
          modalidad: "",
          apellidoP: element.usuario.apellidoP,
          apellidoM: element.usuario.apellidoM,
          correo: element.usuario.correoElectronico,
          telefono: element.usuario.telefono,
          id_usuario: element.usuario.id_usuario
        }
        this.vectorGeneral.push(OBJETO);
      }
    });

/*  
    this.vectorGeneral = [];

    for (let i = 0; i < this.vectorPersonas.length; i++) {
      const element = this.vectorPersonas[i];

      const OBJETO = {
        id: element.id_candidato,
        nombre: element.usuario.nombre,
        sueldo: "",
        horario: "",
        modalidad: "",
        apellidoP: element.usuario.apellidoP,
        apellidoM: element.usuario.apellidoM,
        correo: element.usuario.correoElectronico,
        telefono: element.usuario.telefono,
        id_usuario: element.usuario.id_usuario
      }
      this.vectorGeneral.push(OBJETO);
    }*/

  }

  // FUNCION PARA OBTENER LOS EMPLEADORES DISPONIBLES
  obtenerempleadores() {
    this._AdminRequest.obtenerEmpleadores().then((data: any) => {
      this.vectorGeneral = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_empleador,
          nombre: element.usuario.nombre,
          sueldo: "",
          horario: "",
          modalidad: "",
          apellidoP: element.usuario.apellidoP,
          apellidoM: element.usuario.apellidoM,
          correo: element.usuario.correoElectronico,
          telefono: element.usuario.telefono,
          id_usuario: element.usuario.id_usuario
        }
        this.vectorGeneral.push(OBJETO);
      }
    });
  }



  seleccionar(objeto: any) {
    if (this.externo == true) {
      this.evaluarExterno(objeto);
    } else {
      this.desbloquearEditar();
      this.id_Captura = objeto.id;
      this.nombreCaptura = objeto.nombre;
      this.bloquearCrear();
      this.bloquearBotones();
    }
  }

  evaluarExterno(objeto: any) {
    if(this.tipoVector == "candidato"){
      const OBJETO = {
        vista: "revisarPerfil",
        correo: objeto.correo,
        id_usuario: objeto.id_usuario
      }
      this._AdminRequest.cambiarVista(OBJETO);
    } else if (this.tipoVector == "empleador"){
      const OBJETO = {
        vista: "revisarPerfil",
        correo: objeto.correo,
        id_usuario: objeto.id_usuario
      }
      this._AdminRequest.cambiarVista(OBJETO);
    } else if (this.tipoVector == "vacante"){
      const OBJETO = {
        vista: "verVacante",
        id_vacante: objeto.id_vacante
      }
      this._AdminRequest.cambiarVista(OBJETO);
    }
  }

  limpiar() {
    this.id_Captura = 0;
    this.nombreCaptura = "";
  }

  agregar() {
    if (this.externo == true) {
      
    } else {
      if (this.tipoVector == "idioma") {
        this.guardarIdioma();
      } else if (this.tipoVector == "habilidad") {
        this.guardarHabilidad();
      } else if (this.tipoVector == "horario") {
        this.guardarHorario();
      } else if (this.tipoVector == "contratacion") {
        this.guardarContartacion();
      } else if (this.tipoVector == "modalidad") {
        this.guardarModalidad();
      }
    }

  }

  editar() {
    if (this.tipoVector == "idioma") {
      this.editarIdioma();
    } else if (this.tipoVector == "habilidad") {
      this.editarHabilidad();
    } else if (this.tipoVector == "horario") {
      this.editarHorario();
    } else if (this.tipoVector == "contratacion") {
      this.editarContartacion();
    } else if (this.tipoVector == "modalidad") {
      this.editarModalidad();
    }
  }

  borrar(objeto: any) {
    if (this.tipoVector == "idioma") {
      this.eliminarIdioma(objeto.id);
    } else if (this.tipoVector == "habilidad") {
      this.eliminarHabilidad(objeto.id);
    } else if (this.tipoVector == "horario") {
      this.eliminarHorario(objeto.id);
    } else if (this.tipoVector == "contratacion") {
      this.eliminarContartacion(objeto.id);
    } else if (this.tipoVector == "modalidad") {
      this.borrarModalidad(objeto.id);
    } else if (this.tipoVector == "vacante") {
      this.eliminarVacante(objeto.id);
    } else if (this.tipoVector == "candidato") {
      this.BorrarUsuario(objeto.id_usuario);
    } else if (this.tipoVector == "empleador") {
      this.BorrarUsuario(objeto.id_usuario);
    }
  }

  guardarIdioma() {
    const OBJETO = {
      id_idioma: 0,
      nombreIdioma: this.nombreCaptura,
      candidatos: []
    }

    this._AdminRequest.registrarIdioma(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio guardar el idioma.", true);
      } else {
        this.obtenrIdiomas();
        this.limpiar();
        this.enviarAlerta("El idioma fue creado correctamente", false);
      }
    });
  }

  editarIdioma() {
    const OBJETO = {
      id_idioma: this.id_Captura,
      nombreIdioma: this.nombreCaptura,
      candidatos: []
    }

    this._AdminRequest.modificarIdioma(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar el idioma.", true);
      } else {
        this.obtenrIdiomas();
        this.limpiar();
        this.bloquearEditar();
        this.desbloquearCrear();
        this.quitarBloqueo();
        this.enviarAlerta("El idioma fue modificado correctamente", false);
      }
    });
  }

  bloquearEditar() {
    let botonModificar = document.getElementsByName('ModObj')[0];
    botonModificar.classList.add('bloqueo');
  }

  desbloquearEditar() {
    let botonModificar = document.getElementsByName('ModObj')[0];
    botonModificar.classList.remove('bloqueo');
  }

  bloquearCrear() {
    let botonguardar = document.getElementsByName('CreateObj')[0];
    botonguardar.classList.add('bloqueo');
  }

  desbloquearCrear() {
    let botonguardar = document.getElementsByName('CreateObj')[0];
    botonguardar.classList.remove('bloqueo');
  }

  eliminarIdioma(id: number) {
    this._AdminRequest.modificarIdioma(id).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar el idioma.", true);
      } else {
        this.obtenrIdiomas();
        this.enviarAlerta("El idioma fue eliminado correctamente", false);
      }
    });
  }

  guardarHabilidad() {
    const OBJETO = {
      id_habilidad: 0,
      nombreHabilidad: this.nombreCaptura,
      candidatos: []
    }

    this._AdminRequest.registrarHabilidad(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio guardar la habilidad.", true);
      } else {
        this.obtenerHabilidades();
        this.limpiar();
        this.enviarAlerta("La habilidad fue creada correctamente", false);
      }
    });
  }

  editarHabilidad() {
    const OBJETO = {
      id_habilidad: this.id_Captura,
      nombreHabilidad: this.nombreCaptura,
      candidatos: []
    }

    this._AdminRequest.modificarHabilidad(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar la habilidad.", true);
      } else {
        this.obtenerHabilidades();
        this.limpiar();
        let botonModificar = document.getElementsByName('ModObj')[0];
        botonModificar.classList.add('bloqueo');
        let botonguardar = document.getElementsByName('CreateObj')[0];
        botonguardar.classList.remove('bloqueo');
        this.quitarBloqueo();
        this.enviarAlerta("La habilidad fue modificada correctamente", false);
      }
    });
  }

  eliminarHabilidad(id: number) {
    this._AdminRequest.eliminarHabilidad(id).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar la habilidad.", true);
      } else {
        this.obtenerHabilidades();
        this.enviarAlerta("La habilidad fue eliminada correctamente", false);
      }
    });
  }

  guardarHorario() {
    const OBJETO = {
      id_tipoHorario: 0,
      dias: this.nombreCaptura,
      tipoHorario_vacantes: []
    }

    this._AdminRequest.registrarHorario(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio guardar el horario.", true);
      } else {
        this.obtenerTiposDeHorario();
        this.limpiar();
        this.enviarAlerta("El horario fue creado correctamente", false);
      }
    });
  }

  editarHorario() {
    const OBJETO = {
      id_tipoHorario: this.id_Captura,
      dias: this.nombreCaptura,
      tipoHorario_vacantes: []
    }

    this._AdminRequest.modificarHorario(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar el horario.", true);
      } else {
        this.obtenerTiposDeHorario();
        this.limpiar();
        let botonModificar = document.getElementsByName('ModObj')[0];
        botonModificar.classList.add('bloqueo');
        let botonguardar = document.getElementsByName('CreateObj')[0];
        botonguardar.classList.remove('bloqueo');
        this.quitarBloqueo();
        this.enviarAlerta("El horario fue modificado correctamente", false);
      }
    });
  }

  eliminarHorario(id: number) {
    this._AdminRequest.eliminarHorario(id).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar el horario.", true);
      } else {
        this.obtenerTiposDeHorario();
        this.enviarAlerta("El horario fue eliminado correctamente", false);
      }
    });
  }

  guardarContartacion() {
    const OBJETO = {
      id_tipoContratacion: 0,
      horario: this.nombreCaptura,
      tipoContratacion_vacantes: []
    }

    this._AdminRequest.registrarContratacion(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio guardar la contratación.", true);
      } else {
        this.obtenerTiposContratacion();
        this.limpiar();
        this.enviarAlerta("La contratación fue creada correctamente", false);
      }
    });
  }


  editarContartacion() {
    const OBJETO = {
      id_tipoContratacion: this.id_Captura,
      horario: this.nombreCaptura,
      tipoContratacion_vacantes: []
    }

    this._AdminRequest.modificarContratacion(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar la contratación.", true);
      } else {
        this.obtenerTiposContratacion();
        this.limpiar();
        let botonModificar = document.getElementsByName('ModObj')[0];
        botonModificar.classList.add('bloqueo');
        let botonguardar = document.getElementsByName('CreateObj')[0];
        botonguardar.classList.remove('bloqueo');
        this.quitarBloqueo();
        this.enviarAlerta("La contratación fue modificada correctamente", false);
      }
    });
  }

  eliminarContartacion(id: number) {
    this._AdminRequest.eliminarContratacion(id).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar la contratación.", true);
      } else {
        this.obtenerTiposContratacion();
        this.enviarAlerta("La contratación fue eliminada correctamente", false);
      }
    });
  }


  guardarModalidad() {
    const OBJETO = {
      id_modalidad: 0,
      modalidad: this.nombreCaptura,
      modalidadTrabajo_vacantes: []
    }

    this._AdminRequest.registrarModalidad(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio guardar la modalidad.", true);
      } else {
        this.obtenerModalidades();
        this.limpiar();
        this.enviarAlerta("La modalidad fue creada correctamente", false);
      }
    });
  }

  editarModalidad() {
    const OBJETO = {
      id_modalidad: this.id_Captura,
      modalidad: this.nombreCaptura,
      modalidadTrabajo_vacantes: []
    }

    this._AdminRequest.modificarModalidad(OBJETO).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio modificar la modalidad.", true);
      } else {
        this.obtenerModalidades();
        this.limpiar();
        let botonModificar = document.getElementsByName('ModObj')[0];
        botonModificar.classList.add('bloqueo');
        let botonguardar = document.getElementsByName('CreateObj')[0];
        botonguardar.classList.remove('bloqueo');
        this.quitarBloqueo();
        this.enviarAlerta("La modalidad fue modificada correctamente", false);
      }
    });
  }

  borrarModalidad(id: number) {
    this._AdminRequest.eliminarModalidad(id).then((data: any) => {
      if (data.estatus == false) {
        this.enviarAlerta("Ha surgido un error inesperado que nos impidio eliminar la modalidad.", true);
      } else {
        this.obtenerModalidades();
        this.enviarAlerta("La modalidad fue eliminada correctamente", false);
      }
    });
  }


  // FUNCION PARA BORRAR UN USUARIO POR ID
  BorrarUsuario(id: number) {
      this._AdminRequest.eliminarUsuario(id).then((data: any) => {
        if (data.estatus == true) {
          if(this.tipoVector == "empleador"){
            this.obtenerempleadores();
          } else{
            this.obtenerCandidatos();
          }
          this.enviarAlerta("La cuenta del usuario ha sido eliminada y ya no esta dispinible el la aplicacion.", false);
        } else {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio borrar la cuenta.", true);
        }
      });
  }

    // FUNCION DE ADMINISTRADOR PARA ELIMINAR UNA VACANTE
    eliminarVacante(id: number) {
      this._EmployerRequest.eliminarVacante(id).then((data: any) => {
        if (data.estatus == true) {
          this.enviarAlerta("La vacante se ha eliminado correctamente.", false);
          this.obtenerVacantes();
        } else {
          this.enviarAlerta("No se ha podido eliminar la vacante debido a un error interno.", true);
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
