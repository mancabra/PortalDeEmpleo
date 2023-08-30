import { Estado } from "./estado";
import { Habilidad } from "./habilidad";
import { Idioma } from "./idioma";
import { Municipio } from "./municipio";
import { Usuario } from "./usuario";
import { Vacante } from "./vacante";

export class Candidato {

    id_candidato: number = 0;
    edad: number = 0;
    domicilio: string  = "";
    puestoActual: string  = "";
    descripcion: string  = "";
    centroEducativo: string  = "";
    rutaCv: string  = "";
    usuario: Usuario = new Usuario;

    vacantes: Vacante[] = [];
    idiomas: Idioma[] = [];


    municipio: Municipio = new Municipio;
    estado: Estado = new Estado;

    profesion: string = "";

    fechaNacimiento: Date = new Date;
    habiliadades: Habilidad [] = [];

}
