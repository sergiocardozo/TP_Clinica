import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosEspecialistaComponent } from './mis-turnos-especialista.component';
import { MisTurnosPacienteComponent } from '../mis-turnos-paciente/mis-turnos-paciente.component';
import { FormsModule } from '@angular/forms';
import { EncuestaModule } from '../encuesta/encuesta.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CargaHistoriaModule } from '../../components/carga-historia/carga-historia.module';



@NgModule({
  declarations: [MisTurnosEspecialistaComponent],
  imports: [
    CommonModule, FormsModule, EncuestaModule, PipesModule, CargaHistoriaModule
  ],
  exports: [MisTurnosEspecialistaComponent]
})
export class MisTurnosEspecialistaModule { }
