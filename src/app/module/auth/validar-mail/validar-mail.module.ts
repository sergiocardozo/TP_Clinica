import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidarMailComponent } from './validar-mail.component';



@NgModule({
  declarations: [ ValidarMailComponent],
  imports: [
    CommonModule
  ], 
  exports: [ ValidarMailComponent]
})
export class ValidarMailModule { }
