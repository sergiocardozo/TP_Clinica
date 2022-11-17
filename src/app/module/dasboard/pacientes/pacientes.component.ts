import { Component, OnInit } from '@angular/core';
import { HistoriaService } from 'src/app/service/historia.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  listaHistoriaClinica: Array<any> = [];
  misPacientes: Array<any> = [];
  displayTabla: boolean = false;
  public usuario: any;

  constructor(private historiaSrv: HistoriaService, private turnoSrv: TurnosService,
    private usrSrv: UserService) {

    this.ordenarHistorias();
    let ls = localStorage.getItem('usuario-clinica');
    if (ls != null) {
      this.usuario = JSON.parse(ls);
    }

    this.historiaSrv.getHistoriasOrdenadas().subscribe((res) => {
      let count = 0;
      res.forEach(HC => {
        this.usrSrv.getPacientes().subscribe((pacientes: any) => {
          pacientes.forEach((paciente: any) => {
            if (HC.uidPaciente == paciente.uid && HC.uidEspecialista == this.usuario.uid) {
              this.turnoSrv.getTurnosPacientes(paciente.uid).subscribe(resTurno => {
                resTurno.forEach(turno => {
                  if (HC.turno_id === turno.doc_id) {

                    this.misPacientes.push(paciente)
                    if (count > 0) {
                      count++;
                      this.listaHistoriaClinica.push({ mostrar: true, HC, paciente, turno });
                    } else {
                      count++;
                      this.listaHistoriaClinica.push({ mostrar: false, HC, paciente, turno });
                    }
                  }
                })

              })
            }
          });
        })
      });
    });
    console.log(this.listaHistoriaClinica);
  }

  mostrarDatos() {
    this.displayTabla = true;
  }
  ordenarHistorias() {
    let hc: Array<any> = [{ dia: 'lunes 30-05-2022', hora: '08:00' }, { dia: 'martes 02-06-2022', hora: '08:00' }, { dia: 'lunes 07-05-2022', hora: '08:00' }];

    hc.forEach(element => {

    });

  }

  verResenia(turno: any) {
    Swal.fire({
      icon: 'info',
      title: 'Reseña',
      text: '' + turno.resenia
    })
  }


  ngOnInit(): void {
  }

  verHistoria(atencion: any) {
    let opcionales: string = '';
    atencion.opcionales.forEach((opc: any) => {
      if (opc.key != '') {
        opcionales += ('' + opc.key + ': ' + opc.value + '<br>')
      }
    });
    Swal.fire(
      {
        title: (atencion.dia + ' ' + atencion.hora + '<hr>' + atencion.especialidad),
        icon: 'info',
        html: "Peso: " + atencion.peso + "<br>" + "Altura:" + atencion.altura + "<br>" + "Presion: " +
          atencion.presion + "<br>" + "Temperatura:" + atencion.temperatura + "<br>" + opcionales
      })
  }
}
