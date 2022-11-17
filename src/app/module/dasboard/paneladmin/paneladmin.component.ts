import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/service/excel.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.component.html',
  styleUrls: ['./paneladmin.component.css']
})
export class PaneladminComponent implements OnInit {

  close: boolean = false;
  displayRegistro: boolean = false;
  displayUsuarios: boolean = false;
  tipoUsuario: string = '';
  especialistas: Array<any> = [];
  especialidad: Array<any> = [];
  constructor(private userSrv: UserService, private turnoSrv: TurnosService, private exlSrv: ExcelService) {
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
    this.userSrv.updateAccess(uid, acceso);
  }
  seleccionarTipo(tipo: string) {

    this.displayRegistro = true;
    this.tipoUsuario = tipo;

  }
  closed() {
    this.close = true;
    this.displayRegistro = false;
    this.displayUsuarios = false;
  }

  mostrarUsuarios() {
    this.displayUsuarios = true;
  }

  descargarInfo(uid: string) {
    let turnoSpecialista: Array<any> = [];
    let info: any[] = [];
    let paciente: Array<any> = [];
    this.turnoSrv.getTurnosEspecialista(uid).subscribe(res => {
      this.userSrv.getPacientes().subscribe(pacientes => {
        turnoSpecialista = res;
        paciente = pacientes;
        turnoSpecialista.forEach(turno => {
          if (uid === turno.uidEspecialista) {
            this.especialistas.forEach(espe => {
              if (uid == espe.uid) {
                paciente.forEach(pac => {
                  if (turno.uidPaciente === pac.uid) {

                    info.push({
                      Apellido: espe.apellido,
                      Nombre: espe.nombre,
                      DNI: espe.dni,
                      dia: turno.dia,
                      hora: turno.hora,
                      especialidad: turno.especialidad,
                      paciente: pac.nombre + ' ' + pac.apellido,
                      estado: turno.estado
                    })
                  }
                })
              }
            })
          }
        })

        this.exlSrv.exportExcel(info, 'infoEspecialista');
      })
    });

  }
}
