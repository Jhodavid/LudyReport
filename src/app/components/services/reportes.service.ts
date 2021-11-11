import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private firestore: AngularFirestore) { }

  agregarReporte(reporte: any): Promise<any>{
    return this.firestore.collection('Reportes').add(reporte);
  }

  getReportes(): Observable<any>{
    return this.firestore.collection('Reportes', ref => ref.orderBy('fecha','asc')).snapshotChanges();
  }

  eliminarReporte(id: string): Promise<any> {
    return this.firestore.collection('Reportes').doc(id).delete();
  }

  actualizarReporte(id: string, data:any): Promise<any>{
    return this.firestore.collection('Reportes').doc(id).update(data);
  }
  
}
