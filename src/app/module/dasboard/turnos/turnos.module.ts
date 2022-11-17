import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosComponent } from './turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DirectivasModule } from 'src/app/directivas/directivas.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [ TurnosComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    DirectivasModule,
    MatCardModule,
    MatDividerModule
  ], 
  exports: [TurnosComponent]
})
export class TurnosModule { }
