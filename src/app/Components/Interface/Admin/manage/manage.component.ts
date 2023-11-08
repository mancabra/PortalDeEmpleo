import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy {

  // VARIABLE QUE ALMACENA UN USUARO GENERAL 
  usuario: any;
  // VARIABLE QUE ALMACENA EL ID DEL USUARIO PARA FUTURAS ACCIONES
  id_usuario: number = 0;
  // VARIABLE QUE ALMACENA EL TIPO DE USUARIO PARA FUTURAS ACCIONES
  id_tipoUsuario: number = 0;
  // VARAIBLE QUE LE INDICA AL COMONENTE HIJO QUE LA VISTA ES DESDE UN ADMINISTRADOR
  usuarioAdmin: boolean = true;
  vistaAdministrar: boolean = true;
  // VARIABLE QUE PERMITE OCULTAR LOS BOTONES DEL DOCUMETO HTML
  ocultarBotonesDeUsusario: boolean = true;
  // VARIABLES PARA OCULTAR UNA INTERFAZ ESPECIFICA
  ocultarUsuarios: boolean = true;
  verCrearCuenta: boolean = true;
  verBorrarVacante: boolean = true;
  ocultarModificar: boolean = true;
  // VARIABLE PARA ALMACENAR EL CORREO DE BUSQUEDA
  correoDeUsuario: string = "";
  // VARIABLE PARA ALMACENAR EL NOMBRE DE LA LISTA
  lista: string = "";
  // VARIABLE PARA OCULTAR LA INTERFAZ DE LAS LISTAS
  ocultarLista: boolean = true;


  subscription: Subscription;

  // INYECCION DE SERVICOS A USAR EN EL COMPONENTE
  desactivarInterfaz: boolean = false;

  constructor(
    private _AdminRequest: AdminService,
    private _CandidateRequest: CandidateService,
    private _UserRequest: InterfaceService) {

    this.subscription = this._AdminRequest.getObjeto().subscribe(data => {
      this.identificarVista(data);
    });

  }

  ngOnInit(): void {
    this.desactivarModVacantes();
    this.desactivarModPerfil();
    this.desactivarGenerar();
  }

  // FUNCION PARA DESACTIVAR UNA SUSCRIPCION
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  identificarVista(data: any) {
    this.desactivarInterfaz = true;
    if (data.vista == "actualizarPerfil") {
      this.desactivarGenerar();
      this.desactivarModVacantes();
      this.activarModPerfil();
      /*
    } else if (data.vista == "modificarVacante") {
      this.desactivarModPerfil();
      this.desactivarGenerar();
      this.activarModVacantes();
    } else if (data.vista == "crear") {
      this.desactivarModVacantes();
      this.desactivarModPerfil();
      this.activarGenerar();*/
    } else if (data.vista == "volver") {
     this.obtenerUsuario(data.correo);
    }
  }

  obtenerUsuario(correo: string){
    this._AdminRequest.obtenerUsuario(correo).then((data: any) => {
      this._AdminRequest.usuarioActivo(data);
      setTimeout(() =>{
        this.desactivarInterfaz = false;
      }, 300);
    });
  }

  activarModVacantes() {
    let modVacante = document.getElementsByName('')[0];
    modVacante.classList.remove('off');
  }

  desactivarModVacantes() {
    let modVacante = document.getElementsByName('')[0];
    modVacante.classList.add('off');
  }

  activarModPerfil() {
    let modPerf = document.getElementsByName('perfilMOD')[0];
    modPerf.classList.remove('off');
  }

  desactivarModPerfil() {
    let modPerf = document.getElementsByName('perfilMOD')[0];
    modPerf.classList.add('off');
  }

  activarGenerar() {
    let generar = document.getElementsByName('generar')[0];
    generar.classList.remove('off');
  }

  desactivarGenerar() {
    let generar = document.getElementsByName('generar')[0];
    generar.classList.add('off');
  }

  // FUNCNON PARA ELEGIR UNA LISTA SEGUN EL AUTOCOMPLETE
  seleccionar() {
    if (this.lista == "idioma") {
      this._AdminRequest.listaActiva(this.lista);
      this.ocultarLista = false;
    } else if (this.lista == "habilidad") {
      this._AdminRequest.listaActiva(this.lista);
      this.ocultarLista = false;
    } else if (this.lista == "horario") {
      this._AdminRequest.listaActiva(this.lista);
      this.ocultarLista = false;
    } else if (this.lista == "contratacion") {
      this._AdminRequest.listaActiva(this.lista);
      this.ocultarLista = false;
    } else if (this.lista == "modalidad") {
      this._AdminRequest.listaActiva(this.lista);
      this.ocultarLista = false;
    } else if (this.lista == "empleador") {
      this._AdminRequest.listaActiva(this.lista);
      this.ocultarLista = false;
    } else if (this.lista == "candidato") {
      this._AdminRequest.listaActiva(this.lista);
      this.ocultarLista = false;
    } else if (this.lista == "vacante") {
      this._AdminRequest.listaActiva(this.lista);
      this.ocultarLista = false;
    } else {
      this.enviarAlerta("No hemos podido encontrar una lista con ese nombre.", true);
      this.ocultarLista = true;
    }
  }

  // FUNCION PARA SUSPENDER UNA CUENTA
  suspender() {
    if (this.id_tipoUsuario != 0) {
      const DTO = {
        id_usuario: this.id_usuario,
      }

      this._CandidateRequest.suspenderCuenta(DTO).then((data: any) => {
        if (data.estatus == true) {
          this.enviarAlerta("La cuenta ha sido suspendida de manera exitosa. Al reaizar esta acción la cuenta dejara de ser visible para otros usuarios.", false);
        } else {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio suspender la cuenta.", true);
        }
      });
    } else {
      this.enviarAlerta("No se ha podido identificar el tipo de usuario.", true);
    }
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
