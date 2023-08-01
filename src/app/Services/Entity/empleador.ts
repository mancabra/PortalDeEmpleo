import { Usuario } from "./usuario";
import { Vacante } from "./vacante";

export class Empleador {

    id_empleador: number = 0;
    vacantes: Vacante[] = [];
    usuario: Usuario = new Usuario;
}
