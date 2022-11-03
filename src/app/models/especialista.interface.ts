import { Usuario } from "./usuarios.interface";

export interface Especialista extends Usuario {
    especialidad: string;
    estadoAcceso: string;
}