import { Candidato } from "./candidato";
import { Vacante } from "./vacante";

export class Postulacion {

    id_postulacion: number = 0;
    estatus: boolean = false;
    vacante: Vacante = new Vacante;
    candidato: Candidato = new Candidato;

}
