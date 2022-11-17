import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { EspecialistaGuard } from 'src/app/guards/especialista.guard';
import { PacienteGuard } from 'src/app/guards/paciente.guard';
import { PacienteadminGuard } from 'src/app/guards/pacienteadmin.guard';
import { DasboardComponent } from './dasboard.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { MisTurnosEspecialistaComponent } from './mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { TurnosComponent } from './turnos/turnos.component';

const routes: Routes = [
  {
    path: '', component: DasboardComponent,
    children: [
      { path: 'paneladmin', component: PaneladminComponent, canActivate: [AdminGuard] },
      { path: 'miperfil', component: MiperfilComponent },
      { path: 'turnos', component: TurnosComponent, canActivate: [AdminGuard]},
      { path: 'solicitarturno', component: SolicitarTurnoComponent, canActivate: [PacienteadminGuard]},
      { path: 'turnopaciente', component: MisTurnosPacienteComponent, canActivate: [PacienteGuard] },
      { path: 'turnoespecialista', component: MisTurnosEspecialistaComponent, canActivate: [EspecialistaGuard]},
      { path: 'pacientes', component: PacientesComponent, canActivate: [EspecialistaGuard]},
      { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AdminGuard]}
    ],
    
  },
  { path: 'solicitarturno', component: SolicitarTurnoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
