import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private firestore: AngularFirestore) { }

  agregarReporte(reporte: any): Promise<any>{
    return this.firestore.collection('Reportes').add(reporte);
  }
}
