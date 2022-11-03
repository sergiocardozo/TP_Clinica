import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { DasboardComponent } from './dasboard.component';
import { PaneladminComponent } from './paneladmin/paneladmin.component';

const routes: Routes = [
  {
    path: '', component: DasboardComponent,
    children: [
      { path: 'paneladmin', component: PaneladminComponent, canActivate: [AdminGuard] }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
