import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.component.html',
  styleUrls: ['./paneladmin.component.css']
})
export class PaneladminComponent implements OnInit {

  close: boolean = false;
  displayRegistro: boolean = false;
  tipoUsuario: string = '';
  especialistas: Array<any> = [];
  especialidad: Array<any> = [];
  constructor(private userSrv: UserService) {
    this.userSrv.getEspecialistas().subscribe((data) => {
      
      this.especialistas = data;
      this.especialistas.forEach(element => {
        this.especialidad.push(element.especialidad.nombre);
        
      });  
    })

    
  }

  ngOnInit(): void {
    
  }
  modificarAcceso(uid: string, acceso: string) {
    this.userSrv.updateAccess(uid,acceso);
  }
  seleccionarTipo(tipo: string) {

    this.displayRegistro = true;
    this.tipoUsuario = tipo;

  }
  closed() {
    this.close = true;
    this.displayRegistro = false;
  }
}
