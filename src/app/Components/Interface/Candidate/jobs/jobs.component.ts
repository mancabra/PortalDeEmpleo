import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
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
  subscription: Subscription;
  vacanteSeleccionada: Vacante = new Vacante;
  busqueda: string = "";
  textoBoton: string = "Postularse"
  id_tipoUsuario: number = 0;

  filtroActivo: boolean = false;
  filtro: string = "Filtros";
  filtrosDisponibles = ["Cercanos", "Salario", "Estado",];
  jobsList: Vacante[] = [];
  

  /*
  jobsList = [
    {
      id_vacante: 1,
      nombreVacante: "Diseñador web",
      especialista: "Diseñador",
      sueldo: 10000,
      horario: "9:00 am - 6:00 pm",
      domicilio: "C.Pinos N.447 Col.Nuevo Mundo",
      municipio: { id_municipio: 1, nombreMunicipio: "Acolman", id_estado: 1 },
      estatus: false,
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
        + "ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
        + "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
        + "ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
        + "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui",
      empresa: { id_empresa: 1, vacantes: null, nombreEmpresa: "Infotec", descripcion: "holaMundo Infotec" },
      empleador: {
        id_usuario: 1,
        nombre: "Saumuel",
        correoElectronico: "mail@gmail.com",
        consena: "1234hola",
        tipoUsuario: 3,
        apellidoP: "Aispuro",
        apellidoM: "Wilson",
        estatusUsuario: true,
      },
      candidatos: null, // lista de candidatos
      tipoHorario: { id_tipoHorario: 1, dias: "Tiempo Completo" },
      tipoContratacion: { id_tipoContratacion: 1, horario: "Tiempo Indefinido" },
      modalidadTrabajo: { id_modalidadTrabajo: 1, modalidad: "Presencial" },
    },

  ];
  */

  constructor(private _CandidateRequest: CandidateService, private _UserRequest: InterfaceService, private router: Router) {
    this.subscription = this._UserRequest.getUser().subscribe(data => {

      this.usuario = data;
      console.log(this.usuario);
    });
  }

  ngOnInit() {
    //this._UserRequest.esparcirUsuario();
    this.vacanteSeleccionada = new Vacante;
    this.obtenerVacantes();
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
    this.subscription.unsubscribe();
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




  postularse(vacante: any) {

    if (this.id_tipoUsuario == 0) {
      this.router.navigate(['start']);
    } else {

      const PostDTO = {
        // VER COMO SE ESTA MANEJANDO EL ID PORQIE SE ENVIA EL IDE DE USUARIO NO EL ID CANDIDATO
        id_candidato: this.usuario.id_candidato,
        id_vacante: vacante.id_vacante
      }

      console.log(PostDTO);
      let postulacion: any = "";

      if (postulacion != "") {
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
      this._CandidateRequest.postularse(PostDTO).then((data: any) => {
        postulacion = data;
      });

    }

  }


}

