import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Material
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { InicioComponent } from '../dashboard/inicio/inicio.component';
import { MapaComponent } from '../dashboard/mapa/mapa.component';
import {LayoutModule} from '@angular/cdk/layout';


@NgModule({
  declarations: [
    InicioComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    LayoutModule,

  ],
  exports: [
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    LayoutModule,

  ]
})
export class SharedModule { }
