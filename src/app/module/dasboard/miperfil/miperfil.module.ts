import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiperfilComponent } from './miperfil.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HistoriaClinicaModule } from '../../components/historia-clinica/historia-clinica.module';



@NgModule({
  declarations: [MiperfilComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    FormsModule,
    HistoriaClinicaModule,
    
  ],
  exports: [MiperfilComponent]
})
export class MiperfilModule { }
