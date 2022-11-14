import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { FiltroPacientePipe } from 'src/app/pipes/filtro-paciente.pipe';
import { EncuestaModule } from '../encuesta/encuesta.module';



@NgModule({
  declarations: [MisTurnosPacienteComponent],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    EncuestaModule
  ],
  exports: [MisTurnosPacienteComponent]
})
export class MisTurnosPacienteModule { }
