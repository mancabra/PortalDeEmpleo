import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit, OnDestroy {

  imageSeach: string = "../assets/search.png";

  // VARIABLE PARA CAMBIAR EL COMPORTAMIENTO DEL COMPONETE 
  // EL COMPORTAMIENTO CAMBIA DEPENDIENDO DEL USUARIO QUE USA EL COMPONENTE
  @Input() usuarioAdmin: boolean = false;

  // VARIABLES DE USUARIO
  usuario: Candidato = new Candidato;
  // VARIABLE QUE PERMITE IDENTIFICAR EL USUARIO QUE ESTA USANDO EL PERFIL
  id_tipoUsuario: number = 0;
  // VARIABLE QUE ALMACENA LA VACANTE SELECCIONADA POR EL USUARIO
  vacanteSeleccionada: Vacante = new Vacante;
  // VARIABLE QUE ALMACENA LOS DATOS DE LA VACANTE Y EL USUARIO PARA POSTULARSE
  postulacion: Postulacion = new Postulacion;

  // VARIABLES PARA CAMBIAR TEXTOS DE ELEMENTOS HTML
  textoBoton: string = "Iniciar Sesión";
  filtro: string = "Filtros";

  // VARIABLE QUE ALMACENA EL TEXTO DE BUSQUEDA
  busqueda: string = "";
  verSueldo: string = "none";

  // VARIABLE QUE INDICA SI LA BUSQUEDA DE VACANTES TIENE UN FILTRO ACTIVO O NO
  filtroActivo: boolean = false;
  filtroEstado: boolean = true;

  // VECTOR QUE ALMACENA LOS FILTROS DISPONIBLES
  filtrosDisponibles = ["Ninguno", "Mejor Pagados", "Estado"];

  // VECTOR QUE ALMACENA LAS VACANTES DISPONIBLES EN BD
  jobsList: Vacante[] = [];

  // VECTOR QUE ALMACENA LA LISTA DE ESTADOS ENVIADOS POR LA BD
  estadosMexico: Estado[] = [];
  // VARIABLE QUE ALMACENA EL ESTADO SELLECIONADO PARA LA BUSQUEDA POR FILTROS
  estado: Estado;
  subscription: Subscription;

  pantallaSecundaria: boolean = false;

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  constructor(
    private _CandidateRequest: CandidateService,
    private _UserRequest: InterfaceService,
    private _EmployerRequest: EmployerService,
    private router: Router,) {
      this.subscription = this._UserRequest.getBoolean().subscribe(data => {
        this.pantallaSecundaria = data;
        this.funcionEstilos();
      });
    this.estado = { id_estado: 0, nombreEstado: "Estado", municipios: [] };
  }

  ngOnInit() {
    this.filtrosDisponibles = ["Ninguno", "Mejor Pagados", "Estado"];
    this.vacanteSeleccionada = new Vacante;
    this.buscarUsuario();
    this.obtenerVacantes();
    this.obtenerEstados();
    //this.cargarMuestra();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  funcionEstilos(){
    const pantalla = document.getElementsByName("secundaria")[0];
    pantalla.classList.add("visualizar");
   }

   funcionMoverEnX(){
    const pantalla = document.getElementsByName("secundaria")[0];
    pantalla.classList.add("moverX");
   }

   funcionMoverEnY(){
    const pantalla = document.getElementsByName("secundaria")[0];
    pantalla.classList.add("moverY");
   }
  /*
    ngAfterViewInit() {
      let vacante1 = document.getElementsByName('vacantedeLista')[0];
      vacante1.classList.add('aparece');
      window.addEventListener('scroll', function(){
        let vacanteP = this.document.getElementsByName('vacantedeLista');
        for (let i = 0; i < vacanteP.length; i++) {
          var alturaMin = window.innerHeight/1.8;
         // var alturaMax = window.innerHeight/.5;
          var distancia = vacanteP[i].getBoundingClientRect().top;
          vacanteP[i].classList.add('transform_up');
  
          if (distancia <= alturaMin){
             vacanteP[i].classList.add('aparece');
           //  if( distancia < alturaMax){
            //  vacanteP[i].classList.remove('aparece') 
            // }
          } else {
             vacanteP[i].classList.remove('aparece') 
          }
          
        }
        
      });
    }
    */


  cargarMuestra() {
    this.jobsList = [
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
        fechaPublicacionSrt: "",
        diasPublicada: 0,
        estado: new Estado
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
        fechaPublicacionSrt: "",
        diasPublicada: 0,
        estado: new Estado
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
        fechaPublicacionSrt: "",
        diasPublicada: 0,
        estado: new Estado
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
        tipoContratacion: { id_tipoContratacion: 0, horario: "indefinido", tipoContratacion_vacantes: [] },
        modalidadTrabajo: {id_modalidad:0, modalidad:"hibrido",modalidadTrabajo_vacantes:[]},
        id_postulacion: 0,
        fechaPublicacionSrt: "",
        diasPublicada: 0,
        estado: new Estado
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
        fechaPublicacionSrt: "",
        diasPublicada: 0,
        estado: new Estado
      }
    ];
  }
  // FUNCION PARA BUSCAR UN USUARIO POR CORREO
  buscarUsuario() {

    this._CandidateRequest.obtener().then((data: any) => {
      this.usuario = data
    });
  }

  // FUNCION PARA OBTENER LAS VACANTES DISPONIBLES
  obtenerVacantes() {
    this._CandidateRequest.obtenerVacantes().then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });
  }



  // FUNCION PARA OBTENER LOS ESTADOS ALMACENADOS EN BD
  obtenerEstados() {
    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estadosMexico = data;
      console.log(this.estadosMexico);
    });
  }

  // FUNCION QUE ACTUALIZA EL ESTADO SELECCIONADO POR EL USUARIO PARA EL FILTRO
  actualizarEstado(estado: Estado) {
    const btnEstado = document.getElementsByName("btnEstados")[0];
    btnEstado.classList.add("botoneSelecionado");
    this.estado = estado;
  }

  // FUNCION QUE EVALUA EL USUARIO PARA IDENTIFICAR EL TEXTO DE UN BOTON 
  cargarPantallaPrincipal() {
    this.cambiarBoton();
    if (this.id_tipoUsuario == null) {
      return false;
    } else {
      return true;
    }
  }

  // FUNCION QUE CAMBIA EL TEXTO MOSTRADO EN UN BOTON 
  // EL TEXTO CAMBIA DEPENDIENDO DE USUARIO ACTIVO
  cambiarBoton() {
    this.id_tipoUsuario = this.usuario.usuario.tipoUsuario;
    if (this.usuarioAdmin == true) {
      this.textoBoton = "Eliminar Vacante";
    } else {
      if (this.id_tipoUsuario == 0) {
        this.textoBoton = "Iniciar Sesión";
      } else {
        this.textoBoton = "Postularse";
        //  this.filtrosDisponibles.push("Cercanos a Mi");
      }
    }
  }

  // FUNCION QUE EVALUA LA LONGITUD DEL ARRAY QUE ALMACENA LAS VACANTES 
  // SI EL VECTOR ESTA VACIO MUESTRA UNA PANTALLA ALTERNATIVA 
  cargarVacantes() {
    if (this.jobsList.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  // FUNCION PARA GUARDAR LA VACANTE ACTUAL Y PODER VISUALIZARLA EN UN COMPONENTE EXTERNO
  verVacanteCompleta(vacante: Vacante) {
    this._UserRequest.actualizarVacante(vacante)
  }

  // FUNCION PARA ACTUALIZAR EL FILTRO SELECCIONADO
  actualizarFiltro(filtroSelecionado: string) {
    this.filtro = filtroSelecionado;
    this.filtroActivo = true;

    if (this.filtro == "Ninguno") {
      this.filtroActivo = false;
      this.filtro = "Filtros";
    }

    if (this.filtro == "Estado") {
      this.filtroEstado = false;
    } else {
      this.filtroEstado = true;
      this.estado = { id_estado: 0, nombreEstado: "Estado", municipios: [] };
    }
    this.marcarBotonFiltro();
  }

  marcarBotonFiltro() {
    const boton = document.getElementsByName("btnFiltros")[0];
    if(this.filtroActivo == true){
      boton.classList.add("botoneSelecionado");
    } else {
      boton.classList.remove("botoneSelecionado");
      if(this.filtro == "Estado"){
        const btnEstado = document.getElementsByName("btnEstados")[0];
        btnEstado.classList.remove("botoneSelecionado");
      }
    }
  }

  // FUNCION PARA EVALUAR SI LA BUSQUEDA DE VACANTES ES CON FILTRO O SIN FILTRO
  buscarVacantes() {
    if (this.busqueda == "" && this.filtroActivo == false) {
      this.obtenerVacantes();
    } else if (this.busqueda != "" && this.filtroActivo == false) {
      this.buscarPorNombre();
    } else if (this.busqueda == "" && this.filtroActivo == true) {
      this.identificarFiltro();
    } else if (this.busqueda != "" && this.filtroActivo == true) {
      this.busquedaconFiltroYNombre();
    }
  }

  // FUNCION PARA IDENTIFICAR EL FILTRO ACTIVO
  identificarFiltro() {
    if (this.filtro == "Cercanos a Mi") {
      this.buscarPorMunicipio();
    } else if (this.filtro == "Mejor Pagados") {
      this.buscarPorSueldo();
    } else if (this.filtro == "Estado") {
      if (this.estado.nombreEstado == "Estado") {
        this.enviarAlerta("No podemos realizar la busqueda por que no se ha seleccionado un estado.", true);
      } else {
        this.buscarPorEsatdo();
      }
    }
  }

  // FUNCION PARA IDENTIFICAR EL FILTRO ACTIVO Y ASI DETERMINAR UN FLUJO
  busquedaconFiltroYNombre() {
    if (this.filtro == "Cercanos a Mi") {
      this.buscarporNombreYMunicipio();
    } else if (this.filtro == "Mejor Pagados") {
      //
    } else if (this.filtro == "Estado") {
      if (this.estado.nombreEstado == "Estado") {
        this.enviarAlerta("No podemos realizar la busqueda por que no se ha seleccionado un estado.", true);
      } else {
        this.buscarporNombreYEstado();
      }
    }
  }

  // FUNCION PARA REALIZAR UNA BUSQUEDA SEGUN EL ESTADO SELECCIONADO
  buscarPorEsatdo() {
    this._CandidateRequest.buscarporEstado(this.estado.id_estado).then((data: any) => {
      if (data == null) {
        this.enviarAlerta("No podemos realizar la busqueda debido a un error interno, por favor intente de nuevo.", true);
      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  // FUNCION PARA REALIZAR UNA BUSQUEDA POR NOMBRE Y MUNICIPIO DEL CANDIDATO
  buscarporNombreYMunicipio() {
    this._CandidateRequest.buscarporMunicipio_Nombre(this.usuario.municipio.id_municipio, this.busqueda).then((data: any) => {
      if (data == null) {
        this.enviarAlerta("No podemos realizar la busqueda debido a un error interno, por favor intente de nuevo.", true);
      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  // FUNCION PARA REALIZAR UNA BUSQUEDA POR NOMBRE Y UN ESTADO SELECCIONADO
  buscarporNombreYEstado() {

    const BUSQUEDA = {
      id_estado: this.estado.id_estado,
      palabraClave: this.busqueda
    }

    this._CandidateRequest.buscarporEstado_Nombre(BUSQUEDA).then((data: any) => {
      if (data == null) {
        this.enviarAlerta("No podemos realizar la busqueda debido a un error interno, por favor intente de nuevo.", true);
      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  // FUNCION PARA BUSCAR VACANTES SEGUN EL MUNICIPIO DEL CANDIDATO
  buscarPorMunicipio() {
    this._CandidateRequest.obtenerVacantesCercanas(this.usuario.municipio.id_municipio).then((data: any) => {
      if (data == null) {
        this.enviarAlerta("No podemos realizar la busqueda debido a un error interno, por favor intente de nuevo.", true);
      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  // FUNCION PARA ORDENAR LAS VACANTES POR SUELDO
  buscarPorSueldo() {
    this._CandidateRequest.obtenerVacantesMejorPagadas().then((data: any) => {
      if (data == null) {
        this.enviarAlerta("No podemos realizar la busqueda debido a un error interno, por favor intente de nuevo.", true);
      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  // FUNCION PARA BUSCAR VACNATES POR NOMBRE
  buscarPorNombre() {
    this._CandidateRequest.obtenerVacantesPorPalabra(this.busqueda).then((data: any) => {
      if (data == null) {
        this.enviarAlerta("No podemos realizar la busqueda debido a un error interno, por favor intente de nuevo.", true);
      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  // FUNCION PARA IDENTIFICAR LA FUNCION QUE REALIZARA EL BOTON SEGUN EL USUARIO ACTIVO
  evaluarBoton(vacante: Vacante) {
    if (this.usuarioAdmin == true) {
      // this.eliminarVacante(vacante);
    } else if (this.id_tipoUsuario == 0) {
      this._UserRequest.ocultarNavB();
      this.router.navigate(['start']);
    } else {
      this.postularse(vacante);
    }
  }

  // FUNCION DE CANDIDATO PARA REALIZAR SU POSTULACION A UNA VACANTE
  postularse(vacante: Vacante) {

    const PostDTO = {
      id_candidato: this.usuario.id_candidato,
      id_vacante: vacante.id_vacante
    }

    this.asignarPostulacion(PostDTO, vacante);
  }

  // FUNCION PARA ASIGNAR LA POSTULACION A UN USUARIO
  // EVALUA SI EL CANDIDATO SE HA POSTULADO CON ANTERIORIDAD
  asignarPostulacion(PostDTO: any, vacante: Vacante) {
    this._CandidateRequest.postularse(PostDTO).then((data: any) => {
      this.postulacion = data;
      let dataMensaje = data;
      if (this.postulacion.estatus == true) {
        this.enviarAlertaExito(vacante);
      } else {
        if (dataMensaje.mensaje == "El candidato ya se encuentra postulado a esta vacante") {
          this.enviarAlerta("La postulación ya ha sido realizada con anterioridad y puedes visualizarla en el apartado postulaciones.", true);
        } else {
          this.enviarAlertaError(vacante);
        }
      }
    });
  }
  /*
    // FUNCION DE ADMINISTRADOR PARA ELIMINAR UNA VACANTE
    eliminarVacante(vacante: Vacante) {
      this._EmployerRequest.eliminarVacante(vacante.id_vacante).then((data: any) => {
        if (data.estatus == true) {
          this.enviarAlerta("La vacante se ha eliminado correctamente.", false);
          this.obtenerVacantes();
        } else {
          this.enviarAlerta("No se ha podido eliminar la vacante debido a un error interno.", true);
        }
      });
    }
  */

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaExito(vacante: Vacante) {
    this.enviarAlerta("La postulación se realizo correctamente y puedes visualizarla en el apartado postulaciones.", false);
    const ALERTA = {
      nombreAlerta: "Pustulacion Exitosa",
      textoAlerta: "La postulación a vacante " + vacante.nombreVacante +
        " de la empresa " + vacante.empresa.nombre +
        " se ha realizado correctamente Si tú no has realizado esta acción podras eliminarla desde el apartado POSTULACIONES."
    }
    this._UserRequest.agregarAlerta(ALERTA);
  }

  //FUNCIONES PARA LAS NOTIFICACIONES 
  enviarAlertaError(vacante: Vacante) {
    this.enviarAlerta("No se ha podido realizar la postulación debido a un error interno.", true);
    const ALERTA = {
      nombreAlerta: "Pustulacion Fallida",
      textoAlerta: "La postulación a vacante " + vacante.nombreVacante +
        " de la empresa " + vacante.empresa.nombre +
        " no ha podido realizarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
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