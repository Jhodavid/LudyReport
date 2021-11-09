import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalReporteComponent } from './components/dashboard/mapa/modal-reporte/modal-reporte.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModalReporteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
