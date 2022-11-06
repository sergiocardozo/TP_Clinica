import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiperfilComponent } from './miperfil.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [MiperfilComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  exports: [MiperfilComponent]
})
export class MiperfilModule { }