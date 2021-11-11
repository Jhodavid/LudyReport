import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ReportesService } from '../../services/reportes.service';
import { FechaService } from '../../services/fecha.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

  export class InicioComponent implements OnDestroy, OnInit  {
    
    gridColums: number | undefined;
    gridRows: string | undefined;
    alturaDescripcion: string | undefined;
    reportes: any[] = [];
    dateString: any;

    destroyed = new Subject<void>();
    currentScreenSize: string | undefined;
  
    displayNameMap = new Map([
      [Breakpoints.XSmall, 'XSmall'],
      [Breakpoints.Small, 'Small'],
      [Breakpoints.Medium, 'Medium'],
      [Breakpoints.Large, 'Large'],
    ]);
  
    constructor(breakpointObserver: BreakpointObserver,
                private reportesService: ReportesService,
                private fechaService: FechaService) {
      breakpointObserver
        .observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
        ])
        .pipe(takeUntil(this.destroyed))
        .subscribe(result => {
          for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
              this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            }
          }
          if(this.currentScreenSize == 'XSmall'){
            this.gridColums = 1;
            this.gridRows = "10:6";
          }else if(this.currentScreenSize == 'Small'){
            this.gridColums = 2;
            this.gridRows = "10:12";
          }else if(this.currentScreenSize == 'Medium'){
            this.gridColums = 4;
            this.alturaDescripcion = '4em';
            this.gridRows = "8:10";
          }else if(this.currentScreenSize == 'Large'){
            this.gridColums = 5;
            this.gridRows = "5:5";
          }
        });
    }
  
    ngOnDestroy() {
      this.destroyed.next();
      this.destroyed.complete();
    }

    ngOnInit(): void {
      this.getReportes();
      // this.registrarReportes(this.reportes);
    }

    getReportes(){
      this.reportesService.getReportes().subscribe(datos => {
        this.reportes = [];
        datos.forEach((reporte:any) => {
          this.reportes.push({
            id: reporte.payload.doc.id,
            ...reporte.payload.doc.data()
          })
          console.log(reporte.fecha);
        });
      })
    }

    formatearFecha(fecha: string){
      return this.fechaService.formatearFecha(fecha);
    }
  }


