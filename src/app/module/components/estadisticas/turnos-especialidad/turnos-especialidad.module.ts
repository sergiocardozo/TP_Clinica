import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosEspecialidadComponent } from './turnos-especialidad.component';



@NgModule({
  declarations: [
    TurnosEspecialidadComponent
  ],
  imports: [
    CommonModule,
  
  ], 
  exports: [TurnosEspecialidadComponent]
})
export class TurnosEspecialidadModule { }
