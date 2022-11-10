import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEspecialista'
})
export class FiltroEspecialistaPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const turnosEspecialista :Array<any>= [];

    for (const turno of value) {
     
      console.log(turno);
      if (turno?.especialidad!.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        turnosEspecialista.push(turno);
      }
      else {
        if (turno.especialista.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          turnosEspecialista.push(turno);
        } 
      }
 
  }
  return turnosEspecialista
  }

}
