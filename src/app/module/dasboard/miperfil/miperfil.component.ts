import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HorariosService } from 'src/app/service/horarios.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-500px)' }),
        animate('700ms ease-out', keyframes([
          style({ opacity: 1, transform: 'translateX(220px)' }),
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(0px)' }),
        ])),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0px)' }),
        animate('700ms ease-in', keyframes([
          style({ transform: 'translateX(-30px)', offset: 0.6 }),
          style({ opacity: 0, transform: 'translateX(500px)', offset: 1 }),
        ])),
      ]),
    ])
  ]
})
export class MiperfilComponent implements OnInit {

  tablaHorarios: boolean = true;
  cargaHorario: boolean = false;
  img1: boolean = true;
  img2: boolean = false;
  user: any = '';
  horarios: any;
  especialidades: string[] = [];
  especialidad_elegida: string = '0';
  tieneHorarios: boolean | any;
  horariosActuales: any;
  dias_check: Array<any> = [
    { dia: 'lunes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'martes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'miércoles', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'jueves', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'viernes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'sábado', trabaja: false, ingreso: 0, salida: 0 }
  ];
  listaHorarios: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  listaHorariossalida: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  constructor(private horarioSrv: HorariosService, private userSrv: UserService) {
    let ls = localStorage.getItem('usuario-clinica');
    if (ls != null) {
      this.user = JSON.parse(ls);      
      
      this.especialidades = this.user.especialidad
   
    }
    this.horarioSrv.getHorarioEspecialista(this.user.uid).subscribe(resp => {
      if (resp.length > 0) {
        
        this.tieneHorarios = true;
        this.horarios = resp;

      } else {
        this.tieneHorarios = false;
      }

    })
  }

  ngOnInit(): void {
  }

  cambiarImagen() {
    if (this.img2 === true) {
      this.img1 = true;
      this.img2 = false;
    } else {
      this.img2 = true;
      this.img1 = false;

    }
  }

  mostrarTabla(){
    this.tablaHorarios = false;
    this.cargaHorario = true;
  }

  guardar() {
    let especialidad_guardar = {
      uidEspecialista: this.user.uid,
      especialidad: this.especialidad_elegida,
      horarios: this.dias_check
    }
    this.tablaHorarios = true;
    this.cargaHorario = false;
    if (this.tieneHorarios) {

      this.horarioSrv.updateHorario(this.horariosActuales.doc_id, especialidad_guardar);


    } else {

      this.horarioSrv.addHorarios(especialidad_guardar)

    }

  }


  chooseOptions() {
    this.horarioSrv.getHorarEsp(this.user.uid, this.especialidad_elegida).subscribe((res) => {
      if (res.length == 1) {

        this.horariosActuales = res[0];
        this.tieneHorarios = true;
      } else {
        this.tieneHorarios = false;
      }
    })
  }
}
