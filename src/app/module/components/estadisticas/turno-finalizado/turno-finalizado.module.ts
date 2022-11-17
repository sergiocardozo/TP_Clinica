import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoFinalizadoComponent } from './turno-finalizado.component';



@NgModule({
  declarations: [
    TurnoFinalizadoComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [TurnoFinalizadoComponent]
})
export class TurnoFinalizadoModule { }
