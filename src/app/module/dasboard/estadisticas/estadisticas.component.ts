import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/service/excel.service';
import { LogsService } from 'src/app/service/logs.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  logs: Array<any> = [];
  users: Array<any> = [];
  mostrarTurnosEspecialidad: boolean = false;
  mostrarTurnosPorDia: boolean = false;
  mostrarTurnosSolicitados: boolean = false;
  mostrarTurnosFinalizados: boolean = false;
  constructor(private excelSrv: ExcelService, private logSrv: LogsService, private userSrv: UserService) {
    this.logSrv.getLogs().subscribe(resp => {
      this.logs = resp;
    })
    this.userSrv.getAll().subscribe(respUsuario => {
      this.users = respUsuario;
    })
  }

  ngOnInit(): void {
  }

  ingresosAlSistema(): Array<any> {
    let user_log: Array<any> = [];
    this.logs.forEach(log => {
      this.users.forEach(user => {

        if (log.id == user.uid) {

          user_log.push({
            ...log,
            nombre: user.nombre,
            apellido: user.apellido,
            tipoUsuario: user.tipoUsuario
          })
        }
      })
    });
    return user_log;
  }
  descargar(opcion: number) {

    switch (opcion) {
      case 1:
        this.excelSrv.exportExcel(this.ingresosAlSistema(), 'LogsUsuarios');
        break;
      case 2:
        this.mostrarTurnosEspecialidad = true;
        this.mostrarTurnosPorDia = false;
        this.mostrarTurnosSolicitados = false;
        this.mostrarTurnosFinalizados = false;
        break
      case 3:
        this.mostrarTurnosPorDia = true;
        this.mostrarTurnosEspecialidad = false;
        this.mostrarTurnosSolicitados = false;
        this.mostrarTurnosFinalizados = false;
        break;
      case 4:
        this.mostrarTurnosPorDia = false;
        this.mostrarTurnosEspecialidad = false;
        this.mostrarTurnosSolicitados = true;
        this.mostrarTurnosFinalizados = false;
        break;
      case 5:
        this.mostrarTurnosPorDia = false;
        this.mostrarTurnosEspecialidad = false;
        this.mostrarTurnosSolicitados = false;
        this.mostrarTurnosFinalizados = true;
        break;
      default:
        break;
    }
  }
}
