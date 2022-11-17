import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atencion'
})
export class AtencionPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return '📅 '+value.dia+' ⏰ '+value.hora +' 👨‍⚕️ '+value.especialidad;;
  }

}
