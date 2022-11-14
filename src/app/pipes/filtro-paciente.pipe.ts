import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPaciente'
})
export class FiltroPacientePipe implements PipeTransform {

  transform(value: any, args: any): any[] {

    const turnosPaciente: Array<any> = [];

    for (const turno of value) {
      if (turno.especialidad.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        turnosPaciente.push(turno);
      }
      else {
        if (turno.paciente.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          turnosPaciente.push(turno);
        }
      }

    }
    return turnosPaciente
  }

}
