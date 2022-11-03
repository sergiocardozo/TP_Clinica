export interface Usuario {

    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    email?: string;
    password?: string;
    photoURL?: string[];
    photoURL2?: string[];
    tipoUsuario: string;
  }