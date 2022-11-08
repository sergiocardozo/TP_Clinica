import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.interface';
import { AuthService } from 'src/app/service/auth.service';
import { HorariosService } from 'src/app/service/horarios.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {

  listEspecialidades: Array<any> = [];
  especialidadElegida: string = '';
  especialistasDisponibles: Array<any> = [];
  listadoUsuariosEspecialistasCalificados: Array<any> = [];
  listadoPacientes:Array<any>=[];
  especialista_elegido: string = '';
  constructor(private userSrv: UserService, private horariosSrv: HorariosService, private turnoSrv:TurnosService, private authSrv:AuthService) {
    this.userSrv.getEspecialidad().subscribe((res) => {
      this.listEspecialidades = res;
      this.listEspecialidades.forEach(element => {
        if(element.pathImg === '' || element.pathImg == null) {
          element.pathImg = 'https://firebasestorage.googleapis.com/v0/b/tp-clinica-56602.appspot.com/o/noimage.png?alt=media&token=6475bf3f-975b-4366-a11b-1b015dcdc143'
        }
      });
    });

    this.userSrv.getEspecialistas().subscribe((res) => {
      console.log(res);
      this.especialistasDisponibles = res

    });

    this.userSrv.getPacientes().subscribe((res: any) => {
      this.listadoPacientes = res 
    });

    

  }

  ngOnInit(): void {

  }





}
