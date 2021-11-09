import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
      descripcion: datos[2]
    }
   }

  ngOnInit(): void {
  }

  enviarReporte(){
    // this.router.navigate(['./dashboard/mapa']);
    this.modalRef.beforeClosed
    console.log(this.datos)

    this.formulario.reset();
  }

}
