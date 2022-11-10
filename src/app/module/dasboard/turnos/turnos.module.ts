import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosComponent } from './turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [ TurnosComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule
  ], 
  exports: [TurnosComponent]
})
export class TurnosModule { }
