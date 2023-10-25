import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { Estado } from 'src/app/Services/Entity/estado';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { TipoContratacion } from 'src/app/Services/Entity/tipo-contratacion';
import { TipoHorario } from 'src/app/Services/Entity/tipo-horario';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnDestroy {

  // VARIABLES PARA AL MACENAR DATOS INDIVIDUALES
  // LOS DATOS ALMACENADOS PROVIENEN DE UN COMPONENTE EXTERIOR
  @Input() nombre: string = "";
  @Input() especialista: string = "";
  @Input() sueldo: number = 6223;
  @Input() horario: string = "";
  @Input() domicilio: string = "";
  @Input() descripcion: string = "";
  @Input() verSueldo: string = "";
  @Input() empleador: Empleador = new Empleador;
  @Input() tipoContratacion: TipoContratacion = new TipoContratacion;
  @Input() tipoHorario: TipoHorario = new TipoHorario;
  @Input() modalidadTrabajo: ModalidadTrabajo = new ModalidadTrabajo;
  @Input() estado: Estado = new Estado;
  @Input() municipio: Municipio = new Municipio;
  @Input() empresa: Empresa = new Empresa;

  subscription: Subscription;

  constructor(private _UserRequest: InterfaceService) {
    this.subscription = this._UserRequest.getVacante().subscribe(data => {
     this.asignarDatos(data);
    });
  }
  ngOnInit() {
    this.funcionEstilos();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  asignarDatos(vacante: Vacante) {
    this.nombre = vacante.nombreVacante;
    this.especialista = vacante.especialista;
    this.sueldo = vacante.sueldo;
    this.horario = vacante.horario;
    this.domicilio = vacante.domicilio;
    this.descripcion = vacante.descripcion;
    this.empleador = vacante.empleador;
    this.tipoContratacion = vacante.tipoContratacion;
    this.tipoHorario = vacante.tipoHorario;
    this.modalidadTrabajo = vacante.modalidadTrabajo;
    this.estado = vacante.estado;
    this.municipio = vacante.municipio;
    this.empresa = vacante.empresa;
    this._UserRequest.actualizarPantalla(true);
    this.ocultar();
    this.aparecer();
  }

  ocultar(){
    const pantalla = document.getElementsByName("contenedor")[0];
    pantalla.className = "estilos";
  }

  aparecer(){
    const pantalla = document.getElementsByName("contenedor")[0];
    pantalla.className = "aparecer";
  }

  funcionEstilos() {
    const textoSueldo = document.getElementsByName("textoSueldo")[0];
    const variableSueldo = document.getElementsByName("variableSueldo")[0];
    textoSueldo.addEventListener("mouseover", function(){
      variableSueldo.classList.add("seleccionado");
    }, false);

    textoSueldo.addEventListener("mouseout", function(){
      variableSueldo.classList.remove("seleccionado");
    }, false);

    const textoHorario = document.getElementsByName("textoHorario")[0];
    const variableHorario = document.getElementsByName("variableHorario")[0];
    textoHorario.addEventListener("mouseover", function(){
      variableHorario.classList.add("seleccionado");
    }, false);

    textoHorario.addEventListener("mouseout", function(){
      variableHorario.classList.remove("seleccionado");
    }, false)

    const textoDias = document.getElementsByName("textoDias")[0];
    const variableDias = document.getElementsByName("variableDias")[0];
    textoDias.addEventListener("mouseover", function(){
      variableDias.classList.add("seleccionado");
    }, false);

    textoDias.addEventListener("mouseout", function(){
      variableDias.classList.remove("seleccionado");
    }, false)

    const textoModalidad = document.getElementsByName("textoModalidad")[0];
    const variableModalidad = document.getElementsByName("variableModalidad")[0];
    textoModalidad.addEventListener("mouseover", function(){
      variableModalidad.classList.add("seleccionado");
    }, false);

    textoModalidad.addEventListener("mouseout", function(){
      variableModalidad.classList.remove("seleccionado");
    }, false)

    const textoContratacion = document.getElementsByName("textoContratacion")[0];
    const variableContratacion = document.getElementsByName("variableContratacion")[0];
    textoContratacion.addEventListener("mouseover", function(){
      variableContratacion.classList.add("seleccionado");
    }, false);

    textoContratacion.addEventListener("mouseout", function(){
      variableContratacion.classList.remove("seleccionado");
    }, false)
  }

}
