import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

  export class InicioComponent implements OnDestroy  {
    
    gridColums: number | undefined;
    gridRows: string | undefined;
    alturaDescripcion: string | undefined;

    destroyed = new Subject<void>();
    currentScreenSize: string | undefined;
  
    displayNameMap = new Map([
      [Breakpoints.XSmall, 'XSmall'],
      [Breakpoints.Small, 'Small'],
      [Breakpoints.Medium, 'Medium'],
      [Breakpoints.Large, 'Large'],
    ]);
  
    constructor(breakpointObserver: BreakpointObserver) {
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
            this.gridRows = "6:8";
          }
        });
    }
  
    ngOnDestroy() {
      this.destroyed.next();
      this.destroyed.complete();
    }
  }


