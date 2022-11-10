import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './noimage.pipe';
import { FiltroPacientePipe } from './filtro-paciente.pipe';
import { FiltroEspecialistaPipe } from './filtro-especialista.pipe';



@NgModule({
  declarations: [NoimagePipe, FiltroPacientePipe, FiltroEspecialistaPipe],
  imports: [
    CommonModule
  ],
  exports: [NoimagePipe, FiltroPacientePipe, FiltroEspecialistaPipe]
})
export class PipesModule { }
