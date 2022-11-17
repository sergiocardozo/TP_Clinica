import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { HorariosService } from 'src/app/service/horarios.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

moment.locale('es');
@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-500px)' }),
        animate('900ms ease-out', keyframes([
          style({ opacity: 1, transform: 'translateY(220px)' }),
          style({ transform: 'translateY(-10px)' }),
          style({ transform: 'translateY(0px)' }),
        ])),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0px)' }),
        animate('900ms ease-in', keyframes([
          style({ transform: 'translateY(-30px)', offset: 0.6 }),
          style({ opacity: 0, transform: 'translateY(500px)', offset: 1 }),
        ])),
      ]),
    ])
  ]
})
export class SolicitarTurnoComponent implements OnInit {

  show = true;
  user: any;
  paciente_elegido?: any;
  especialidadesLista: Array<any> = [];
  especialidadElegida: string = '';
  especialistaSeleccionado: Array<any> = [];

  especialistasDisponibles: Array<any> = [];
  listadoPacientes: Array<any> = [];
  especialista_elegido: string = '';
  proximosQuinceDias: Array<any> = [];
  horarios_final: Array<any> = [];

  constructor(private userSrv: UserService, private horariosSrv: HorariosService, private turnoSrv: TurnosService, private authSrv: AuthService) {

    this.userSrv.getEspecialidad().subscribe((res) => {
      this.especialidadesLista = res;
      this.especialidadesLista.forEach(element => {
        if (element.pathImg === '' || element.pathImg == null) {
          element.pathImg = 'https://firebasestorage.googleapis.com/v0/b/tp-clinica-56602.appspot.com/o/noimage.png?alt=media&token=6475bf3f-975b-4366-a11b-1b015dcdc143'
        }
      });
    });

    this.userSrv.getEspecialistas().subscribe((res) => {
      this.especialistasDisponibles = res
    });

    this.userSrv.getPacientes().subscribe((res: any) => {
      this.listadoPacientes = res
    });

    this.proximosQuinceDias = this.calculaDias();

    let ls = localStorage.getItem('usuario-clinica');
    this.user = JSON.parse(ls);
  }

  ngOnInit(): void {

  }

  calculaDias() {
    let turnos: Array<any> = [];
    let formato = "dddd YYYY-MM-DD";
    for (let i = 0; i < 15; i++) {
      turnos.push((moment().add(i, 'day').format(formato)))
    }
    return turnos;
  }

  calcularTurnos(duracionTurno: number, dia: any, ingreso_param: string, salida_param: any) {
    let formato = "HH:mm";
    let retorno: Array<any> = [{ dia: dia, horarios: [] }];
    let ingreso = ingreso_param.split(':', 2);
    let salida = salida_param.split(':', 2);
    let inicio = moment({ hour: Number(ingreso[0]), minute: Number(ingreso[1]) });
    let final = moment({ hour: Number(salida[0]), minute: Number(salida[1]) });
    let cantidadTurnos = (final.diff(inicio, 'minute') / duracionTurno);
    let cantidadMinutos = cantidadTurnos * duracionTurno;

    for (let i = 0; i < cantidadMinutos; i += duracionTurno) {
      let nuevaHora = inicio.clone().add(i, 'minutes').format(formato);
      retorno[0].horarios.push({ hora: nuevaHora, disponible: true });
    }

    this.turnoSrv.getTurnosEspec_Especialidad(this.especialista_elegido, this.especialidadElegida).subscribe((turnos) => {
      retorno[0].horarios.forEach((horario: any) => {
        turnos.forEach(turno => {

          if (turno.hora == horario.hora && turno.dia == retorno[0].dia && turno.estado != 'cancelado') {
            horario.disponible = false
          }
        });
      });
    });

    return retorno;
  }


  seleccionarEspecialidad(especialidad: string) {
    this.horarios_final = [];
    
    this.especialidadElegida = especialidad;
    let duracionMinEspecialidad: number = 30;
    this.horariosSrv.getHorarEsp(this.especialista_elegido, this.especialidadElegida).subscribe((res: any) => {
      if (res.length === 0) {
        this.horarios_final = [];
      } else {
        this.proximosQuinceDias.forEach(dia => {
          res[0].horarios.forEach((element: any) => {
            if (dia.includes(element.dia) && element.trabaja) {
              this.horarios_final.push(this.calcularTurnos(duracionMinEspecialidad, dia, element.ingreso, element.salida));
            } else {

            }

          });
        });
      }
    });
  }


  seleccionoEspecialista(uid: string) {
    this.especialistaSeleccionado = [];
    this.especialista_elegido = uid;
    this.horarios_final = [];
    this.especialistasDisponibles.forEach(element => {
      if (element.uid === this.especialista_elegido) {
        element.especialidad.forEach(especialidad => {
          this.especialidadesLista.forEach(espe => {
            if (especialidad === espe.nombre) {

              this.especialistaSeleccionado.push(espe);
            }
          })
        })
      }
    })
  }

  seleccionarPaciente(pac: any) {
    this.paciente_elegido = pac.uid;
  }

  generarTurno(dia: any, hora: string) {
    Swal.fire({
      title: 'Turno ' + dia + ' ' + hora,
      showDenyButton: true,
      confirmButtonText: 'Generar Turno'
    }).then(res => {
      if (res.isConfirmed) {
        if (this.user.tipoUsuario == 'Administrador') {
          let dato = {
            uidPaciente: this.paciente_elegido,
            uidEspecialista: this.especialista_elegido,
            especialidad: this.especialidadElegida,
            dia: dia,
            hora: hora,

            estado: 'Pendiente',
            comentario_anula: '',
            comentario_cancela: '',
            resenia: '',
            calificacion: 0
          }
          this.turnoSrv.addTurno(dato).then(() => {
            Swal.fire('Turno Generado', '', 'info')
            this.horarios_final.forEach(element => {
              element[0].horarios.forEach(horar => {
                if (horar.hora == hora && element[0].dia == dia) {
                  horar.disponible = false;
                }
              })
            })
          })
        } else {
          let dato = {
            uidPaciente: this.user.uid,
            uidEspecialista: this.especialista_elegido,
            especialidad: this.especialidadElegida,
            dia: dia,
            hora: hora,
            estado: 'Pendiente',
            comentario_anula: '',
            comentario_cancela: '',
            resenia: '',
            calificacion: 0
          }
          this.turnoSrv.addTurno(dato).then(() => {
            Swal.fire('Turno Generado', '', 'info')
            this.horarios_final.forEach(element => {
              element[0].horarios.forEach(horar => {
                if (horar.hora == hora && element[0].dia == dia) {
                  horar.disponible = false;
                }
              })
            })
          })
        }
      } else {
        Swal.fire('Turno no guardado', '', 'warning');
      }
    })
  }
}
