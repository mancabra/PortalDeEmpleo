import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
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
  textoBoton: string = "Iniciar Sesión"
  id_tipoUsuario: number = 0;

  filtroActivo: boolean = false;
  filtro: string = "Filtros";
  filtrosDisponibles = ["Cercanos", "Salario", "Estado",];
  jobsList: Vacante[] = [];


  constructor(private _CandidateRequest: CandidateService, private _UserRequest: InterfaceService, private router: Router) {

  }

  ngOnInit() {
    this.vacanteSeleccionada = new Vacante;
    this.buscarUsuario();
    this.obtenerVacantes();
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
    if (this.id_tipoUsuario == 0) {
      this.textoBoton = "Iniciar Sesión";
    } else {
      this.textoBoton = "Postularse";
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
  }

  buscarVacantes() {

   if (this.busqueda == "" && this.filtroActivo == false) {
    this.obtenerVacantes();
   } else {
 
   } 
  }

  evaluarBoton(vacante: Vacante) {
    if (this.id_tipoUsuario == 0) {
      this._UserRequest.ocultarNavB();
      this.router.navigate(['start']);
    } else {
      this.postularse(vacante);
    }
  }

  postularse(vacante:Vacante) {

    const PostDTO = {
      id_candidato: this.usuario.id_candidato,
      id_vacante: vacante.id_vacante
    }

   this.asignarPostulacion(PostDTO,vacante);
  }

  asignarPostulacion(PostDTO:any,vacante:Vacante) {
    this._CandidateRequest.postularse(PostDTO).then((data: any) => {
      this.postulacion = data;

      if(this.postulacion.estatus == true){
        this.enviarAlertaExito(vacante);
      } else {
        this.enviarAlertaError(vacante);
      }

    });
  }

  enviarAlertaExito(vacante: Vacante) {
    alert("Postulación Exitosa");

    const ALERTA = {
      nombreAlerta: "Pustulacion Exitosa",
      textoAlerta: "La postulación a vacante " + vacante.nombreVacante + 
                   " de la empresa " + vacante.empresa.nombre + 
                   " se ha realizado correctamente Si tÚ no has realizado esta acción podras eliminarla desde el apartado POSTULACIONES."
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

