import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../auth-routing.module';

import { RegisterComponent } from './register.component';

import { LoadingModule } from '../../components/loading/loading.module';
import { ValidarMailModule } from '../validar-mail/validar-mail.module';
import { AlertErrorModule } from '../../components/alert-error/alert-error.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CargaespecialidadModule } from '../cargaespecialidad/cargaespecialidad.module';



@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatButtonModule,
    LoadingModule,
    MatCardModule,
    MatDividerModule,
    AlertErrorModule,
    ValidarMailModule,
    CargaespecialidadModule
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
