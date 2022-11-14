import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './noimage.pipe';
import { FiltroPacientePipe } from './filtro-paciente.pipe';
import { FiltroEspecialistaPipe } from './filtro-especialista.pipe';
import { NombreapellidoPipe } from './nombreapellido.pipe';



@NgModule({
  declarations: [NoimagePipe, FiltroPacientePipe, FiltroEspecialistaPipe, NombreapellidoPipe],
  imports: [
    CommonModule
  ],
  exports: [NoimagePipe, FiltroPacientePipe, FiltroEspecialistaPipe, NombreapellidoPipe]
})
export class PipesModule { }
