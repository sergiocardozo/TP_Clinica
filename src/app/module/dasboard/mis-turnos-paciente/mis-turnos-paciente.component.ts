import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('800ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('800ms', style({ opacity: 0, transform: 'translateX(40px)' })),
      ]),
    ])
  ]
})
export class MisTurnosPacienteComponent implements OnInit {

  show = true;
  public paciente: any;
  public especialidadesLista: Array<any> = [];
  public especialistasDisponibles: Array<any> = [];
  public turnosPaciente: Array<any> = [];
  public filtro: string = '';
  completarEncuesta_flag: boolean = false;
  turnoEncuesta: any;
  constructor(private userSrv: UserService,
    private authSrv: AuthService, private turnosSrv: TurnosService, private spinnerSrv: SpinnerService) {
    
    this.userSrv.getEspecialidad().subscribe((res) => {
      this.especialidadesLista = res;
    });

    this.userSrv.getEspecialistas().subscribe((res: any) => {
      this.especialistasDisponibles = res

    });

    this.paciente = this.authSrv.getUser();

    this.turnosSrv.getTurnosPacientes(this.paciente.uid).subscribe((res) => {

      this.turnosPaciente = [];
      res.forEach(turno => {
        this.especialistasDisponibles.forEach(especialista => {
          if (turno.uidEspecialista == especialista.uid) {
            let turnopush = { ...turno, 'especialista': (especialista.apellido + ', ' + especialista.nombre) }
            this.turnosPaciente.push(turnopush);

          }
        });
      });
    })

  }

  ngOnInit(): void {
  }


  cancelarTurno(turno: any) {
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
          turno.estado = 'cancelado';
          comentario = respuesta.value;
          let turnoUpd = {
            dia: turno.dia,
            especialidad: turno.especialidad,
            uidEspecialista: turno.uidEspecialista,
            estado: 'Cancelado',
            hora: turno.hora,
            uidPaciente: turno.uidPaciente,
            resenia: turno.resenia,
            comentario_cancela: comentario,
            comentario_anula: turno.comentario_anula,
            calificacion: turno.calificacion
          }
          this.turnosSrv.updateTurno(turno.doc_id, turnoUpd).then((fin) => {
            Swal.fire('Turno cancelado')
          });
        });
      }
    });

  }

  verResenia(turno: any) {
    Swal.fire({
      icon: 'info',
      title: 'Reseña',
      text: '' + turno.resenia
    })
  }

  async completarEncuesta(turno: any) {
    this.turnoEncuesta = turno;
    this.completarEncuesta_flag = true;
  }
  manejarEncuesta(event: any) {
    this.completarEncuesta_flag = event;
  }

  async calificarAtencion(turno: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    Swal.fire({
      title: 'Califique la atencion',
      icon: 'question',
      input: 'range',
      inputLabel: 'Tu puntaje',
      inputValue: 0,
      showCancelButton: true
    }).then((result) => {
      console.log(result)

      if (result.isConfirmed) {
        //actualizar
        let turnoUpd = {
          dia: turno.dia,
          especialidad: turno.especialidad,
          uidEspecialista: turno.uidEspecialista,
          estado: turno.estado,
          hora: turno.hora,
          uidPaciente: turno.uidPaciente,
          resenia: turno.resenia,
          comentario_cancela: turno.comentario_cancela,
          comentario_anula: turno.comentario_anula,
          calificacion: result.value
        }
        this.turnosSrv.updateTurno(turno.doc_id, turnoUpd).finally(() => {
          swalWithBootstrapButtons.fire(
            'Calificado!'
          )
        });


      } else if (result.isDismissed) {
        swalWithBootstrapButtons.fire(
          'Cancelado!'
        )
      }
    });



  }

}
