import { trigger, transition, query, style, group, animate, sequence, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HistoriaService } from 'src/app/service/historia.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
 
})
export class PacientesComponent implements OnInit {

  
  listaHistoriaClinica: Array<any> = [];
  listaTurnos: Array<any> = [];
  misPacientes: Array<any> = [];
  displayTabla: boolean = false;
  public usuario: any;

  constructor(private historiaSrv: HistoriaService, private turnoSrv: TurnosService,
    private usrSrv: UserService) {
    this.listaHistoriaClinica = [];
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
  }

  mostrarDatos(turno: any) {
    this.listaTurnos = [];
    this.displayTabla = true;
    console.log(turno);
    this.turnoSrv.getTurnosPacientes(turno).subscribe(res => {
      
      res.forEach( turn => {
        if(turn.estado === 'Finalizado' && turno === turn.uidPaciente){
          
          this.listaTurnos.push(turn);
          console.log(this.listaTurnos);
          
        }
      })
    })
  }
  

  verResenia(turno: any) {
    Swal.fire({
      icon: 'info',
      title: 'Rese??a',
      text: '' + turno.resenia
    })
  }

  close(){
    
    this.displayTabla = false;
  }
  ngOnInit(): void {
  }

  
}
