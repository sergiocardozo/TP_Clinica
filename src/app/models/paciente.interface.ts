import { Usuario } from "./usuarios.interface";

export interface Paciente extends Usuario {
    obraSocial: string;
}