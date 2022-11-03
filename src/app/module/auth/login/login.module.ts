import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthRoutingModule } from '../auth-routing.module';
import { AlertErrorModule } from '../../components/alert-error/alert-error.module';
import { LoadingModule } from '../../components/loading/loading.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModule, 
    AlertErrorModule,
    LoadingModule
  ]
})
export class LoginModule { }
