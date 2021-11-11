import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FechaService } from 'src/app/components/services/fecha.service';
import { ReportesService } from 'src/app/components/services/reportes.service';
import { MapaComponent } from '../mapa.component';

@Component({
  selector: 'app-modal-reporte',
  templateUrl: './modal-reporte.component.html',
  styleUrls: ['./modal-reporte.component.css']
})
export class ModalReporteComponent implements OnInit {

  formulario: FormGroup;
  datosReporte: any;
  fechaFormulario: any;
  existeReporte: any;

  constructor(private fb: FormBuilder, private router: Router,
              public modalRef: MatDialogRef<ModalReporteComponent>,
              private reporteService: ReportesService,
              private toastr: ToastrService,
              private fechaService: FechaService,
              // private mapaComponent: MapaComponent,
              @Inject(MAT_DIALOG_DATA) public datos: any
    ) {
    this.formulario = this.fb.group({
      id: [],
      codigo: [],
      fechaReporte: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
    
    this.datosReporte = {
      id: datos[0],
      codigo: datos[1],
      fecha: datos[2],
      descripcion: datos[3],
      ubicacion: datos[4],
      marcador: datos[5]
    }
   }

  ngOnInit(): void {
    this.formatearFecha();
    this.existeReporteMethod();
  }

  agregarReporte(){
    // this.router.navigate(['./dashboard/mapa']);
    
    const reporte: any = {
      codigo: this.datosReporte.codigo,
      fecha: this.datosReporte.fecha,
      descripcion: this.formulario.value.descripcion,
      ubicacion: this.datosReporte.ubicacion
    }

    this.reporteService.agregarReporte(reporte).then(() => {
      this.toastr.success('El reporte fué guardado con éxito.', 'Reporte guardado',{
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })

    this.formulario.reset();
    }
    
    formatearFecha(){
      this.fechaFormulario = this.fechaService.formatearFecha(this.datosReporte.fecha);
  }

  eliminarReporte(id: string){
    this.reporteService.eliminarReporte(id).then(() => {
      this.toastr.error('El reporte fué eliminado con exito','Reporte eliminado',{
        positionClass: 'toast-bottom-right',
      })
    }).catch(error => {
      console.log(error);
    })  
    // this.mapaComponent.eliminarMarcador();
  }

  editarReporte(id: string){
    const reporte: any = {
      codigo: "",
      descripcion: this.formulario.value.descripcion,
      fecha: this.datosReporte.fecha,
    }

    this.reporteService.actualizarReporte(id, reporte).then(() => {
      this.toastr.info('El reporte fue modificado con exito','Reporte modificado',{
        positionClass: 'toast-bottom-right'
      })
    })
  }

  existeReporteMethod(){
    if(this.datosReporte.id == ""){
      this.existeReporte = false;
    }else{
      this.existeReporte = true;
    }
  }

  }

