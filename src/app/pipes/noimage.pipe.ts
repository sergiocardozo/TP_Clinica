import { Pipe, PipeTransform } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { UserService } from '../service/user.service';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  listEspecialidades: Array<any> = []
  constructor(private userSrv: UserService) {
    this.userSrv.getEspecialidad().subscribe((res) => {
      
      this.listEspecialidades = res;
    })
  }
  transform(imagen: string): string {
    this.listEspecialidades.forEach( element => {
      if(element.pathImg == '' && imagen.length < 0){
        return imagen = 'https://firebasestorage.googleapis.com/v0/b/tp-clinica-56602.appspot.com/o/noimage.png?alt=media&token=6475bf3f-975b-4366-a11b-1b015dcdc143';

      } else {
        return imagen;
      }
    })

    return '';
    

  }

}
