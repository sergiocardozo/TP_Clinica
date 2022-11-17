import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPacientePipe } from './filtro-paciente.pipe';
import { FiltroEspecialistaPipe } from './filtro-especialista.pipe';
import { AtencionPipe } from './atencion.pipe';



@NgModule({
  declarations: [ FiltroPacientePipe, FiltroEspecialistaPipe, AtencionPipe,],
  imports: [
    CommonModule
  ],
  exports: [ FiltroPacientePipe, FiltroEspecialistaPipe, AtencionPipe]
})
export class PipesModule { }
