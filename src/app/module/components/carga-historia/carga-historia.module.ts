import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaHistoriaComponent } from './carga-historia.component';
import { LoadingModule } from '../loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [CargaHistoriaComponent],
  imports: [
    CommonModule, 
    LoadingModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule
  ], exports: [ CargaHistoriaComponent ]
})
export class CargaHistoriaModule { }
