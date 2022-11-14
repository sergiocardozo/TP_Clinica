import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.css']
})
export class MisTurnosEspecialistaComponent implements OnInit {

  color = '';
  turnoFinalizado_flag = false;
  turnoFinalizado: any;
  especialidadesLista: Array<any> = [];
  turnosEspecialista: Array<any> = [];
  usuario: any;
  pacientes: Array<any> = [];
  turnos: Array<any> = [];
  public filtro: string = '';

  constructor(private turnosSrv: TurnosService, private authSrv: AuthService,
    private usrSrv: UserService) { }


  ngOnInit(): void {

    this.usuario = this.authSrv.getUser();

    this.usrSrv.getEspecialidad().subscribe((res) => {
      this.especialidadesLista = res;
    });
    this.usrSrv.getPacientes().subscribe((x) => {
      this.pacientes = x;
    });
    this.cargarTurno();


  }

  cargarTurno() {
    this.turnosSrv.getTurnosEspecialista(this.usuario.uid).subscribe((res) => {
      this.turnos = [];
      res.forEach(turno => {
        this.pacientes.forEach(paciente => {
          
          if (turno.uidPaciente == paciente.uid) {
            let turnopush = { ...turno, 'paciente': (paciente.apellido + ', ' + paciente.nombre) }
            this.turnos.push(turnopush);
            
          }
        });
      });
    });
  }

  aceptarTurno(turno: any, estadoNuevo: string) {

    turno.estado = estadoNuevo;
    let turnoUpd = {
      dia: turno.dia,
      especialidad: turno.especialidad,
      uidEspecialista: turno.uidEspecialista,
      estado: estadoNuevo,
      hora: turno.hora,
      uidPaciente: turno.uidPaciente,
      resenia: turno.resenia,
      comentario_cancela: turno.comentario_cancela,
      comentario_anula: turno.comentario_anula,
      calificacion: turno.calificacion
    }

    this.turnosSrv.updateTurno(turno.doc_id, turnoUpd).then((res) => {
      Swal.fire('Turno aceptado');
    });
  }

  rechazarTurno(turno: any, nuevoEstado: string) {
    Swal.fire({
      title: 'Seguro de rechazar el turno?',
      showDenyButton: true,
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          input: 'textarea',
          inputLabel: 'Comente porque rechaza el turno',
          inputPlaceholder: 'Escriba su comentario...',
          inputAttributes: {
            'aria-label': 'Escriba su comentario...'
          },
          showCancelButton: true
        }).then((respuesta) => {
          turno.estado = nuevoEstado;
          let turnoUpd = {
            dia: turno.dia,
            especialidad: turno.especialidad,
            uidEspecialista: turno.uidEspecialista,
            estado: nuevoEstado,
            hora: turno.hora,
            uidPaciente: turno.uidPaciente,
            resenia: respuesta.value,
            comentario_cancela: turno.comentario_cancela,
            comentario_anula: turno.comentario_anula,
            calificacion: turno.calificacion
          }
          this.turnosSrv.updateTurno(turno.doc_id, turnoUpd).then((res) => {
            Swal.fire('Turno rechazado')
          });
        })
      }
    })
  }


  async cancelarTurno(turno: any, nuevoEstado: string) {
    let comentario = '';
    Swal.fire({
      title: 'Seguro de cancelar el turno?',
      showDenyButton: true,
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          input: 'textarea',
          inputLabel: 'Comente porque cancela el turno',
          inputPlaceholder: 'Escriba su comentario...',
          inputAttributes: {
            'aria-label': 'Escriba su comentario...'
          },
          showCancelButton: true
        }).then((respuesta) => {
          console.log('motivo de cancelacion: ' + respuesta.value)
          turno.estado = nuevoEstado;
          comentario = respuesta.value;
          let turnoUpd = {
            dia: turno.dia,
            especialidad: turno.especialidad,
            uidEspecialista: turno.uidEspecialista,
            estado: 'Cancelado',
            hora: turno.hora,
            uidPaciente: turno.uidPaciente,
            resenia: turno.resenia,
            comentario_cancela: turno.comentario_cancela,
            comentario_anula: comentario,
            calificacion: turno.calificacion
          }
          this.turnosSrv.updateTurno(turno.doc_id, turnoUpd).then((fin) => {
            Swal.fire('Turno cancelado')
          });
        });
      }
    });
  }

  async dejarResenia(turno: any) {
    let comentario = '';
    Swal.fire({
      input: 'textarea',
      inputLabel: 'Comente una reseña o diagnostico realizado',
      inputPlaceholder: 'Escriba su comentario...',
      inputAttributes: {
        'aria-label': 'Escriba su comentario...'
      },
      showCancelButton: true
    }).then((res) => {
      if (!res.isDismissed) {
        let turnoUpd = {
          dia: turno.dia,
          especialidad: turno.especialidad,
          uidEspecialista: turno.uidEspecialista,
          estado: 'Finalizado',
          hora: turno.hora,
          uidPaciente: turno.uidPaciente,
          resenia: res.value,
          comentario_cancela: turno.comentario_cancela,
          comentario_anula: turno.comentario_anula,
          calificacion: turno.calificacion
        }
        turno.estado = 'Finalizado';
        console.log(turnoUpd)
        this.turnosSrv.updateTurno(turno.doc_id, turnoUpd).then((res) => {
          this.turnoFinalizado_flag = true;
          this.turnoFinalizado = { ...turnoUpd, turno_id: turno.doc_id };
        });
      }
    })
  }

  manejarHistoria(event: any) {
    this.turnoFinalizado_flag = event;
  }

  verResenia(turno: any) {
    Swal.fire({
      icon: 'info',
      title: 'Reseña',
      text: '' + turno.resenia
    })
  }

}
