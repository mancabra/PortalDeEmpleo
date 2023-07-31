import { Candidato } from "./candidato";
import { Empleador } from "./empleador";
import { Empresa } from "./empresa";
import { ModalidadTrabajo } from "./modalidad-trabajo";
import { Municipio } from "./municipio";
import { TipoContratacion } from "./tipo-contratacion";
import { TipoHorario } from "./tipo-horario";

export class Vacante {

    id_vacante: number = 0;
    nombreVacante: string = "";
    especialista: string  = "";
    sueldo: number  = 0;
    horario: string = "";
    municipio: Municipio = new Municipio;
    estatus: boolean = false;
    descripcion: string  = "";
    empresa: Empresa = new Empresa;
    empleador: Empleador = new Empleador;
    candidatos: Candidato[] = [];
    tipoHorario: TipoHorario = new TipoHorario;
    tipoContratacion: TipoContratacion = new TipoContratacion;
    modalidadTrabajo: ModalidadTrabajo = new ModalidadTrabajo;

}
