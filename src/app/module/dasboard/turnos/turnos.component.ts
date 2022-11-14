import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  private usuario: any;
  especialidadesLista: Array<any> = [];
  turnosEspecialista: Array<any> = [];
  especialista: Array<any> = [];
  public filtro: string = '';
  pacientes: Array<any> = [];
  turnos: Array<any> = [];
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
    this.usrSrv.getEspecialistas().subscribe((esp) => {
      this.especialista = esp;
    })


    this.turnosSrv.getTurnos().subscribe((res) => {
      this.turnos = [];
      res.forEach(turno => {
        this.pacientes.forEach( element => {
          this.especialista.forEach(esp => {

            if(turno.uidPaciente == element.uid && turno.uidEspecialista == esp.uid){
              let mostrar = { ...turno,
                 'paciente': (element.apellido + ', ' + element.nombre),
                'especialista': (esp.apellido + ', ' + esp.nombre)  }
              this.turnos.push(mostrar);
            }
          })
        })
        
      });
    });
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

          comentario = respuesta.value;
          let turnoUpd = {
            dia: turno.dia,
            especialidad: turno.especialidad,
            uidEspecialista: turno.uidEspecialista,
            estado: 'cancelado',
            hora: turno.hora,
            uidPaciente: turno.uidPaciente,
            comentario_cancela: comentario,
            reseña: turno.reseña,
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

}
