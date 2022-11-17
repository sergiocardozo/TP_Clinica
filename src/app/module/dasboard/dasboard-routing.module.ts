import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { DasboardComponent } from './dasboard.component';
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
      { path: 'turnos', component: TurnosComponent},
      { path: 'solicitarturno', component: SolicitarTurnoComponent},
      { path: 'turnopaciente', component: MisTurnosPacienteComponent },
      { path: 'turnoespecialista', component: MisTurnosEspecialistaComponent},
      { path: 'pacientes', component: PacientesComponent}
    ],
    
  },
  { path: 'solicitarturno', component: SolicitarTurnoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
