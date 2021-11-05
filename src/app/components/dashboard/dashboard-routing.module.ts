import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: InicioComponent},
    { path: 'inicio', component: InicioComponent},
    { path: 'mapa', component: MapaComponent},
    { path: '**', component: InicioComponent},
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
