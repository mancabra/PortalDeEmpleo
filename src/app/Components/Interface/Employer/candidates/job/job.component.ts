import { Component, Input } from '@angular/core';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { Estado } from 'src/app/Services/Entity/estado';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { TipoContratacion } from 'src/app/Services/Entity/tipo-contratacion';
import { TipoHorario } from 'src/app/Services/Entity/tipo-horario';
import { Vacante } from 'src/app/Services/Entity/vacante';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
@Input () vacante : Vacante = new Vacante;
@Input () verSueldoP: string = "";


@Input () nombre : string = "";
@Input () especialista: string  = "";
@Input () sueldo: number  = 6223;
@Input () horario: string = "";
@Input () domicilio: string = "";
@Input () descripcion: string  = "";
@Input () verSueldo: string = "";
@Input () empleador: Empleador = new Empleador;
@Input () tipoContratacion: TipoContratacion = new TipoContratacion;
@Input () tipoHorario: TipoHorario = new TipoHorario;
@Input () modalidadTrabajo: ModalidadTrabajo = new ModalidadTrabajo;
@Input () estado: Estado = new Estado;
@Input () municipio: Municipio = new Municipio;
@Input () empresa: Empresa = new Empresa;

constructor(){

}

ngOnInit(){

}

}
