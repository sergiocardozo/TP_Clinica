import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from '../../auth/register/register.module';
import { MatCardModule } from '@angular/material/card';
import { PaneladminComponent } from './paneladmin.component';



@NgModule({
  declarations: [PaneladminComponent],
  imports: [
    CommonModule,
    RegisterModule,
    MatCardModule
  ], exports: [PaneladminComponent]
})
export class PaneladminModule { }
