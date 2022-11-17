import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from '../../auth/register/register.module';
import { MatCardModule } from '@angular/material/card';
import { PaneladminComponent } from './paneladmin.component';
import { DirectivasModule } from 'src/app/directivas/directivas.module';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [PaneladminComponent],
  imports: [
    CommonModule,
    RegisterModule,
    MatCardModule,
    MatDividerModule,
    DirectivasModule
  ], exports: [PaneladminComponent]
})
export class PaneladminModule { }
