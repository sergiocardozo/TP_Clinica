import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';
import { MatCardModule } from '@angular/material/card';
import { TurnosEspecialidadModule } from '../../components/estadisticas/turnos-especialidad/turnos-especialidad.module';
import { TurnosdiaModule } from '../../components/estadisticas/turnosdia/turnosdia.module';
import { TurnoSolicitadoModule } from '../../components/estadisticas/turno-solicitado/turno-solicitado.module';
import { TurnoFinalizadoModule } from '../../components/estadisticas/turno-finalizado/turno-finalizado.module';



@NgModule({
  declarations: [ EstadisticasComponent],
  imports: [
    CommonModule,
    MatCardModule,
    TurnosEspecialidadModule,
    TurnosdiaModule,
    TurnoSolicitadoModule,
    TurnoFinalizadoModule
  ], 
  exports: [ EstadisticasComponent ]
})
export class EstadisticasModule { }
