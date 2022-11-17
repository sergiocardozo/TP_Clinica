import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HistoriaClinicaComponent],
  imports: [
    CommonModule, MatCardModule, FormsModule
  ],
  exports: [HistoriaClinicaComponent]
})
export class HistoriaClinicaModule { }
