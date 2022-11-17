import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { FiltroPacientePipe } from 'src/app/pipes/filtro-paciente.pipe';
import { EncuestaModule } from '../encuesta/encuesta.module';
import { DirectivasModule } from 'src/app/directivas/directivas.module';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [MisTurnosPacienteComponent],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    EncuestaModule,
    DirectivasModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [MisTurnosPacienteComponent]
})
export class MisTurnosPacienteModule { }
