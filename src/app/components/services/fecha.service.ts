import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }

  formatearFecha(fecha: string){
    return moment(fecha).format('L - '+'LT');
  }

  desformatearFecha(fecha: string){
    return moment(fecha).format('L - '+'LT');
  }

  fechaActual(){
    return moment().format('L - '+'LT');
  }
}
