import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  //DEBE SUSCRIBIRSE AL USARIO ENVIADO POR BASE DE DATOS
  usuario: Candidato = new Candidato;
  postulacion: Postulacion = new Postulacion;
  vacanteSeleccionada: Vacante = new Vacante;
  busqueda: string = "";
  textoBoton: string = "Postularse"
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


  buscarUsuario(){
    this._CandidateRequest.obtener().then((data:any) =>{
      this.usuario = data
      console.log(this.usuario)
    });
  }

  cambiarBoton() {
    this.id_tipoUsuario = this.usuario.usuario.tipoUsuario;
    if (this.id_tipoUsuario == 0) {
      this.textoBoton = "Iniciar Sesión";
    } else {
      this.textoBoton = "Postularse";
    }
  }

  cargarPantallaPrincipal() {
    this.cambiarBoton();
    if (this.id_tipoUsuario == null) {
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
  }

  obtenerVacantes() {
    this._CandidateRequest.obtenerVacantes().then((data: any) => {
      if (data == null) {

      } else {
        this.jobsList = data;
      }
    });
  }

  cargarVacantes() {
    if (this.jobsList.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  buscarVacantes() {
    if (this.busqueda == "" && this.filtroActivo == false) {

      this._CandidateRequest.obtenerVacantes().then((data: any) => {
        if (data == null) {

        } else {
          this.jobsList = data;
        }

      });

    } else {

      const busquedaDTO = {
        textoBusqueda: this.busqueda,
        filtroActivo: this.filtro,
      }

      this._CandidateRequest.buscarporFiltro(busquedaDTO).then((data: any) => {
        if (data == null) {

        } else {
          this.jobsList = data;
        }

      });

    }
  }

  actualizarFiltro(filtroSelecionado: string) {
    this.filtro = filtroSelecionado;
    this.filtroActivo = true;
  }

  verVacanteCompleta(vacante: any) {
    this.vacanteSeleccionada = vacante;

  }

  cargarPantalla() {
    if (this.vacanteSeleccionada.id_vacante == 0) {
      return false;
    } else {
      return true;
    }
  }

  postularse(vacante:Vacante) {
    if(this.id_tipoUsuario == 0) {
      this.router.navigate(['start']);
    } else {
      this.botonNoVisitante(vacante);
    }
  }

  botonNoVisitante(vacante:Vacante){
    const PostDTO = {
      id_candidato: this.usuario.id_candidato,
      id_vacante: vacante.id_vacante
    }

    console.log(PostDTO);

    this.asignarPostulacion(PostDTO);
    console.log(this.postulacion);

    if (this.postulacion.estatus != false) {

      alert("Postulacion Exitosa");

      const ALERTA = {

        nombreAlerta:"Pustulacion Exitosa",
        textoAlerta:"La postulación a vacante "+vacante.nombreVacante+" de la empresa "+vacante.empresa.nombreEmpresa+" se ha realizado correctamente Si tÚ no has realizado esta acción podras eliminarla desde el apartado POSTULACIONES."
      }

      this._UserRequest.agregarAlerta(ALERTA);
      
    } else {

      alert("Algo Fallo");

      const ALERTA = {

        nombreAlerta:"Pustulacion Fallida",
        textoAlerta:"La postulación a vacante "+vacante.nombreVacante+" de la empresa "+vacante.empresa.nombreEmpresa+" no ha podido realizarse correctamente, te recomendamos intentarlo nuevamente, si el error persiste puedes contactar a soporte mediente el correo soporte@mail.com"
      }

      this._UserRequest.agregarAlerta(ALERTA);
    }
  }

  asignarPostulacion(PostDTO:any){
    this._CandidateRequest.postularse(PostDTO).then((data: any) => {
      this.postulacion = data;
    });
  }

}

