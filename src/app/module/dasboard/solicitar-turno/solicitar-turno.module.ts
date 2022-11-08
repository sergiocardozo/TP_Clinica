import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from 'src/app/pipes/noimage.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatCardModule } from '@angular/material/card';
import { SolicitarTurnoComponent } from './solicitar-turno.component';



@NgModule({
  declarations: [SolicitarTurnoComponent],
  imports: [
    CommonModule,
    PipesModule,
    MatCardModule
  ]
})
export class SolicitarTurnoModule { }
