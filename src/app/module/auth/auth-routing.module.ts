import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaespecialidadComponent } from './cargaespecialidad/cargaespecialidad.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { ValidarMailComponent } from './validar-mail/validar-mail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seleccionarusuario', component: TipoUsuarioComponent },
  { path: 'validaremail', component: ValidarMailComponent },
  { path: 'espe', component: CargaespecialidadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
