import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PacientesComponent } from './pacientes.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [ PacientesComponent],
  imports: [
    CommonModule,
    PipesModule,
    MatCardModule
  ], exports: [ PacientesComponent]
})
export class PacientesModule { }
