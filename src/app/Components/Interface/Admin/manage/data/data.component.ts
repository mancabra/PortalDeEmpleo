import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Idioma } from 'src/app/Services/Entity/idioma';
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
    let botonModificar = document.getElementsByName('ModObj')[0];
    botonModificar.classList.add('bloqueo');
  }


  bloquearBotones() {
    let botonModificar = document.getElementsByName('borrarBTN');
    for (let i = 0; i < botonModificar.length; i++) {
      botonModificar[i].classList.add('bloqueo');
    }
  }

  quitarBloqueo(){
    let botonModificar = document.getElementsByName('borrarBTN');
    for (let i = 0; i < botonModificar.length; i++) {
      botonModificar[i].classList.remove('bloqueo');
    }
  }

  identificarLista(lista: string) {
    if (lista == "idioma") {
      this.id_elemento = "id_idioma";
      this.nombreElemento = "nombreIdioma";
      this.obtenrIdiomas();
    } else if (lista == "habilidad") {
      this.id_elemento = "id_habilidad";
      this.nombreElemento = "nombreHabilidad";
      this.obtenerHabilidades();
    } else if (lista == "horario") {
      this.id_elemento = "id_horario";
      this.nombreElemento = "nombreHorario";
      this.obtenerTiposDeHorario();
    } else if (lista == "contratacion") {
      this.id_elemento = "id_contratacion";
      this.nombreElemento = "nombreContra";
      this.obtenerTiposContratacion();
    } else if (lista == "modalidad") {
      this.id_elemento = "id_modalidad";
      this.nombreElemento = "nombreModalidad";
      this.obtenerModalidades();
    }
  }

  vectorIdiomas: Idioma[] =[
    {id_idioma:1,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:2,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:3,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
    {id_idioma:4,nombreIdioma:"ingles",candidatos:[]},
  ]
  // FUNCION PARA OBTENER LOS IDIOMAS DISPONIBLES
  obtenrIdiomas() {

    this._CandidateRequest.obtenerIdiomas().subscribe(data => {
      this.vectorGeneral = [];

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const OBJETO = {
          id: element.id_idioma,
          nombre: element.nombreIdioma
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
          nombre: element.nombreIdioma
        }
        this.vectorGeneral.push(OBJETO);
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
          nombre: element.nombreHabilidad
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
          nombre: element.dias
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
          nombre: element.horario
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
          nombre: element.modalidad
        }
        this.vectorGeneral.push(OBJETO);
      }
    });
  }

  seleccionar(objeto: any) {
    let botonModificar = document.getElementsByName('ModObj')[0];
    botonModificar.classList.remove('bloqueo');
    this.id_Captura = objeto.id;
    this.nombreCaptura = objeto.nombre;
    let botonguardar = document.getElementsByName('CreateObj')[0];
    botonguardar.classList.add('bloqueo');
    this.bloquearBotones();
  }

  limpiar() {
    this.id_Captura = 0;
    this.nombreCaptura = "";
  }

  agregar() {
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
        let botonModificar = document.getElementsByName('ModObj')[0];
        botonModificar.classList.add('bloqueo');
        let botonguardar = document.getElementsByName('CreateObj')[0];
        botonguardar.classList.remove('bloqueo');
        this.quitarBloqueo();
        this.enviarAlerta("El idioma fue modificado correctamente", false);
      }
    });
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
