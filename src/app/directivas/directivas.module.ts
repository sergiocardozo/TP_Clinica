import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResaltarespecialistaDirective } from './resaltarespecialista.directive';
import { ResaltarestadoDirective } from './resaltarestado.directive';
import { EstadoResaltadoDirective } from './estado-resaltado.directive';



@NgModule({
  declarations: [ResaltarespecialistaDirective, ResaltarestadoDirective, EstadoResaltadoDirective],
  imports: [
    CommonModule
  ],
  exports: [ResaltarespecialistaDirective, ResaltarestadoDirective, EstadoResaltadoDirective]
})
export class DirectivasModule { }
