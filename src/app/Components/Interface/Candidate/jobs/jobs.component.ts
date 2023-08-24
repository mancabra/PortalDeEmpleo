import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Estado } from 'src/app/Services/Entity/estado';
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
  postulacion: Postulacion = new Postulacion;
  //DEBE SUSCRIBIRSE AL USARIO ENVIADO POR BASE DE DATOS
  usuario: Candidato = new Candidato;
  vacanteSeleccionada: Vacante = new Vacante;
  busqueda: string = "";
  verSueldo: string = "none";
  textoBoton: string = "Iniciar Sesión"
  id_tipoUsuario: number = 0;

  filtroActivo: boolean = false;
  filtro: string = "Filtros";
  filtrosDisponibles = ["Ninguno", "Cercanos a Mi", "Mejor Pagados", "Estado"];
  jobsList: Vacante[] = [];
  estado: Estado;
  filtroEstado: boolean = true;
  estadosMexico: Estado[] = [];

  @Input() usuarioAdmin: boolean = false;


  constructor(private _CandidateRequest: CandidateService, private _UserRequest: InterfaceService, private router: Router,
    private _EmployerRequest: EmployerService) {
    this.estado = { id_estado: 0, nombreEstado: "Estado", municipios: [] };
  }

  ngOnInit() {
    this.vacanteSeleccionada = new Vacante;
    this.buscarUsuario();
    this.obtenerVacantes();
    this.obtenerEstados();
  }

  ngOnDestroy(): void {
  }


  buscarUsuario() {
    this._CandidateRequest.obtener().then((data: any) => {
      this.usuario = data
      console.log(this.usuario)
    });
  }

  obtenerVacantes() {
    this._CandidateRequest.obtenerVacantes().then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });
  }

  obtenerEstados() {
    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estadosMexico = data;
      console.log(this.estadosMexico);
    });
  }

  actualizarEstado(estado: Estado) {
    this.estado = estado;
  }

  cargarPantallaPrincipal() {
    this.cambiarBoton();
    if (this.id_tipoUsuario == null) {
      return false;
    } else {
      return true;
    }
  }

  cambiarBoton() {
    this.id_tipoUsuario = this.usuario.usuario.tipoUsuario;
    if (this.usuarioAdmin == true) {
      this.textoBoton = "Eliminar Vacante";
    } else {
      if (this.id_tipoUsuario == 0) {
        this.textoBoton = "Iniciar Sesión";
      } else {
        this.textoBoton = "Postularse";
      }
    }
  }

  cargarPantalla() {
    if (this.vacanteSeleccionada.id_vacante == 0) {
      return false;
    } else {
      return true;
    }
  }

  cargarVacantes() {
    if (this.jobsList.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  verVacanteCompleta(vacante: any) {
    this.vacanteSeleccionada = vacante;
  }

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
  }

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

  identificarFiltro() {
    if (this.filtro == "Cercanos a Mi") {
      this.buscarPorMunicipio();
    } else if (this.filtro == "Mejor Pagados") {
      this.buscarPorSueldo();
    } else if (this.filtro == "Estado") {
      if (this.estado.nombreEstado == "Estado") {
        alert("no se ha seleccionado un estado");
      } else {
        this.buscarPorEsatdo();
      }

    }
  }

  busquedaconFiltroYNombre() {
    if (this.filtro == "Cercanos a Mi") {
      this.buscarporNombreYMunicipio();
    } else if (this.filtro == "Mejor Pagados") {

    } else if (this.filtro == "Estado") {
      if (this.estado.nombreEstado == "Estado") {
        alert("no se ha seleccionado un estado");
      } else {
        this.buscarporNombreYEstado();
      }
    }
  }

  buscarPorEsatdo() {
    this._CandidateRequest.buscarporEstado(this.estado.id_estado).then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  buscarporNombreYMunicipio() {
    this._CandidateRequest.buscarporMunicipio_Nombre(this.usuario.municipio.id_municipio, this.busqueda).then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  buscarporNombreYEstado() {

    const BUSQUEDA = {
      id_estado: this.estado.id_estado,
      palabraClave: this.busqueda
    }

    this._CandidateRequest.buscarporEstado_Nombre(BUSQUEDA).then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });

    this.cargarVacantes();
  }

  buscarPorMunicipio() {
    this._CandidateRequest.obtenerVacantesCercanas(this.usuario.municipio.id_municipio).then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  buscarPorSueldo() {
    this._CandidateRequest.obtenerVacantesMejorPagadas().then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });

    this.cargarVacantes();
  }

  buscarPorNombre() {
    this._CandidateRequest.obtenerVacantesPorPalabra(this.busqueda).then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });
    this.cargarVacantes();
  }

  evaluarBoton(vacante: Vacante) {
    if (this.usuarioAdmin == true) {
      this.eliminarVacante(vacante);
    } else if (this.id_tipoUsuario == 0) {
      this._UserRequest.ocultarNavB();
      this.router.navigate(['start']);
    } else {
      this.postularse(vacante);
    }
  }

  postularse(vacante: Vacante) {

    const PostDTO = {
      id_candidato: this.usuario.id_candidato,
      id_vacante: vacante.id_vacante
    }

    this.asignarPostulacion(PostDTO, vacante);
  }

  eliminarVacante(vacante: Vacante) {
    this._EmployerRequest.eliminarVacante(vacante.id_vacante).then((data: any) => {
      if (data.estatus == true) {
        alert("la vacante se ha eliminado correctamente");
        this.obtenerVacantes();
      } else {
        alert("ha ocurrido un error");
      }
    });
  }

  asignarPostulacion(PostDTO: any, vacante: Vacante) {
    this._CandidateRequest.postularse(PostDTO).then((data: any) => {
      this.postulacion = data;
      let dataMensaje = data;

      if (this.postulacion.estatus == true) {
        this.enviarAlertaExito(vacante);
      } else {

        if (dataMensaje.mensaje == "El candidato ya se encuentra postulado a esta vacante") {
          alert("ya te has postulado a esta vacante");
        } else {
          this.enviarAlertaError(vacante);
        }

      }

    });
  }

  enviarAlertaExito(vacante: Vacante) {
    alert("Postulación Exitosa");

    const ALERTA = {
      nombreAlerta: "Pustulacion Exitosa",
      textoAlerta: "La postulación a vacante " + vacante.nombreVacante +
        " de la empresa " + vacante.empresa.nombre +
        " se ha realizado correctamente Si tú no has realizado esta acción podras eliminarla desde el apartado POSTULACIONES."
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

  enviarAlertaError(vacante: Vacante) {
    alert("Algo Fallo");

    const ALERTA = {
      nombreAlerta: "Pustulacion Fallida",
      textoAlerta: "La postulación a vacante " + vacante.nombreVacante +
        " de la empresa " + vacante.empresa.nombre +
        " no ha podido realizarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
    }

    this._UserRequest.agregarAlerta(ALERTA);
  }

}

