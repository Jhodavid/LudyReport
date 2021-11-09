import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportesService } from 'src/app/components/services/reportes.service';

@Component({
  selector: 'app-modal-reporte',
  templateUrl: './modal-reporte.component.html',
  styleUrls: ['./modal-reporte.component.css']
})
export class ModalReporteComponent implements OnInit {

  formulario: FormGroup;
  datosReporte: any;

  constructor(private fb: FormBuilder, private router: Router,
              public modalRef: MatDialogRef<ModalReporteComponent>,
              private reporteService: ReportesService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public datos: string
    ) {
    this.formulario = this.fb.group({
      codigo: [],
      fechaReporte: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
    
    this.datosReporte = {
      codigo: datos[0],
      fecha: datos[1],
      descripcion: datos[2],
      ubicacion: datos[3]
    }

   }

  ngOnInit(): void {
  }

  agregarReporte(){
    // this.router.navigate(['./dashboard/mapa']);


    const reporte: any = {
      codigo: this.datosReporte.codigo,
      fecha: this.formulario.value.fechaReporte,
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

  }

