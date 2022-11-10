import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LoadingModule } from '../components/loading/loading.module';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';

import { AlertErrorModule } from '../components/alert-error/alert-error.module';
import { CargaespecialidadModule } from './cargaespecialidad/cargaespecialidad.module';



@NgModule({
  declarations: [
    AuthComponent,
    TipoUsuarioComponent,
  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginModule,
    RegisterModule,
    LoadingModule,
    AlertErrorModule,
    CargaespecialidadModule
  ]
})
export class AuthModule { }
