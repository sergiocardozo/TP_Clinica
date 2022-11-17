import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaHistoriaComponent } from './carga-historia.component';
import { LoadingModule } from '../loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CargaHistoriaComponent],
  imports: [
    CommonModule, LoadingModule, FormsModule, ReactiveFormsModule
  ], exports: [ CargaHistoriaComponent ]
})
export class CargaHistoriaModule { }
