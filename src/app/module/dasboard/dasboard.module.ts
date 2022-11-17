import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DasboardRoutingModule } from './dasboard-routing.module';
import { DasboardComponent } from './dasboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { RegisterModule } from '../auth/register/register.module';
import { MiperfilModule } from './miperfil/miperfil.module';
import { SolicitarTurnoModule } from './solicitar-turno/solicitar-turno.module';
import { TurnosModule } from './turnos/turnos.module';
import { MisTurnosPacienteModule } from './mis-turnos-paciente/mis-turnos-paciente.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { MisTurnosEspecialistaModule } from './mis-turnos-especialista/mis-turnos-especialista.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { PaneladminModule } from './paneladmin/paneladmin.module';


@NgModule({
  declarations: [
    DasboardComponent,
  ],
  imports: [
    CommonModule,
    DasboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    RegisterModule,
    MiperfilModule,
    TurnosModule,
    SolicitarTurnoModule,
    MisTurnosPacienteModule,
    MisTurnosEspecialistaModule,
    EncuestaModule,
    PacientesModule,
  ]
})
export class DasboardModule { }
