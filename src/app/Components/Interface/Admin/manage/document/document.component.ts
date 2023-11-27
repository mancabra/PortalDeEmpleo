import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { Estado } from 'src/app/Services/Entity/estado';
import { Usuario } from 'src/app/Services/Entity/usuario';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
  entidadSeleccionada: any;
  filtroSeleccionado: any;

  filtros: string[] = ['Activas', 'Inactivas'];
  entidades: string[] = ['Usuario', 'Vacante'];

  estados: Estado[] = [];
  filtroPlus: String = "";
  filtroPlusB: boolean = false;
  rolEstado: Estado[] = [];

  vacantes: Vacante[] = [];
  usuarios: Usuario[] = [];

  estadoSeleccionado: Estado = new Estado;

  constructor(private _UserRequest: InterfaceService,
    private _AdminRequest: AdminService) {
    this.entidadSeleccionada = "Seleccione una entidad";
    this.filtroSeleccionado = "Seleccione un filtro";
  }

  ngOnInit(): void {
    this.estadoSeleccionado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.bloquearFiltros();
    this.ocultarFiltroPlus();
    this.obtenerEstados();
  }

  ngOnDestroy(): void {

  }


  obtenerEstados() {
    this._UserRequest.obtenerEstados().subscribe(data => {
      this.estados = data;
    });
  }

  cargarRoles() {
    this.rolEstado = [
      { id_estado: 0, nombreEstado: "Administradores", municipios: [] },
      { id_estado: 0, nombreEstado: "Candidatos", municipios: [] },
      { id_estado: 0, nombreEstado: "Empleadores", municipios: [] }
    ];
  }

  actualizarFiltro(filtro: string) {
    if (filtro == 'estado') {
      this.filtroPlus = "Edo. selecionado:"
      this.estadoSeleccionado.nombreEstado = "Selecciona un Estado";
      this.rolEstado = this.estados;
      this.grande();
      setTimeout(() => {
        this.filtroPlusB = true;
        this.mostarFiltroPlus();
      }, 300);

    } else if (filtro == 'roles') {
      this.filtroPlus = "Rol. seleccionado:"
      this.estadoSeleccionado.nombreEstado = "Selecciona un Rol";
      this.cargarRoles();
      this.grande();
      setTimeout(() => {
        this.filtroPlusB = true;
        this.mostarFiltroPlus();
      }, 300);

    } else {
      this.ocultarFiltroPlus();
      setTimeout(() => {
        this.filtroPlusB = false;
        this.chico();
      }, 301);
    }
    this.filtroSeleccionado = filtro;
  }

  actualizarEntidad(entidad: string) {
    if (this.filtroPlusB == true) {
      this.ocultarFiltroPlus();
      setTimeout(() => {
        this.filtroPlusB = false;
        this.chico();
      }, 301);
    }
    if (entidad == "Usuario") {
      this.filtros = ['activos', 'inactivos', 'roles'];
    } else {
      this.filtros = ['activas', 'inactivas', 'estado'];
    }
    this.entidadSeleccionada = entidad;
    this.filtroSeleccionado = 'Seleccione un filtro';
    this.desbloquearFiltros();
  }

  generar() {
    if (this.entidadSeleccionada == "Usuario") {
      this.evaluarEntidadUsuario();
    } else {
      this.evaluarEntidadVacante();
    }
  }

  evaluarEntidadUsuario() {
    switch (this.filtroSeleccionado) {
      case "activos":
        this.solicitarUsuariosActivosInactivos();
        break;

      case "inactivos":
        this.solicitarUsuariosActivosInactivos();
        break;

      case "roles":
        this.solicitarUsuarioRol();
        break;

      default:

        break;
    }
  }

  evaluarEntidadVacante() {
    switch (this.filtroSeleccionado) {
      case "activas":
        this.solicitarVacantesActivasInactivas();
        break;

      case "inactivas":
        this.solicitarVacantesActivasInactivas();
        break;

      case "estado":
        this.solicitarVacantesEstado();
        break;

      default:

        break;
    }
  }

  solicitarVacantesActivasInactivas() {
    this._AdminRequest.obtenerVacantesPor_actividad(this.filtroSeleccionado).subscribe(data => {
      this.vacantes = data;
    });
  }


  solicitarVacantesEstado() {
    this._AdminRequest.obtenerVacantesPor_estado(this.estadoSeleccionado.id_estado).subscribe(data => {
      this.vacantes = data;
    });
  }

  solicitarUsuariosActivosInactivos() {
    this._AdminRequest.obtenerUsuariosPor_actividad(this.filtroSeleccionado).subscribe(data => {
      this.usuarios = data;
    });
  }


  solicitarUsuarioRol() {
    this._AdminRequest.obtenerUsuariosPor_rol(this.estadoSeleccionado.nombreEstado).subscribe(data => {
      this.usuarios = data;
    });
  }



  actualizarEstado(estado: Estado) {
    this.estadoSeleccionado = estado;
  }

  bloquearFiltros() {
    const btn = document.getElementsByName('filtro')[0];
    btn.classList.add('block');
  }

  desbloquearFiltros() {
    const btn = document.getElementsByName('filtro')[0];
    btn.classList.remove('block');
  }


  mostarFiltroPlus() {
    const btn = document.getElementsByName('filtroPlus')[0];
    btn.classList.remove('ocultar');
  }

  ocultarFiltroPlus() {
    const btn = document.getElementsByName('filtroPlus')[0];
    btn.classList.add('ocultar');
  }

  grande() {
    const btn = document.getElementsByName('formulario')[0];
    btn.classList.add('agrandar');
  }

  chico() {
    const btn = document.getElementsByName('formulario')[0];
    btn.classList.remove('agrandar');
  }

  botonCerrar(){
    this.estadoSeleccionado = { id_estado: 0, nombreEstado: "Selecciona un Estado", municipios: [] };
    this.entidadSeleccionada = "Seleccione una entidad";
    this.filtroSeleccionado = "Seleccione un filtro";
    this.bloquearFiltros();
    this.ocultarFiltroPlus();
    this._AdminRequest.activarForm();
  }


}
