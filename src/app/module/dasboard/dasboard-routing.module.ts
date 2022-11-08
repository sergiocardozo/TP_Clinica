import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { DasboardComponent } from './dasboard.component';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';

const routes: Routes = [
  {
    path: '', component: DasboardComponent,
    children: [
      { path: 'paneladmin', component: PaneladminComponent, canActivate: [AdminGuard] },
      { path: 'miperfil', component: MiperfilComponent },
      { path: 'solicitarturno', component: SolicitarTurnoComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
