import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Coordenada } from './Model/coordenada';
import {MatDialog} from '@angular/material/dialog';
import { ModalReporteComponent } from 'src/app/components/dashboard/mapa/modal-reporte/modal-reporte.component';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {

  map: any;
  fecha: string | undefined;
  image: string;

  @ViewChild('mapElement') mapElement: any;
  constructor(public dialog: MatDialog) {
    this.image = "././assets/marcador.png";
   }
   
  ngAfterViewInit(): void {
    
    const posInicial = { lat: 10.997655, lng: -74.790784 };
    
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: posInicial,
      zoom: 19,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ["roadmap", "terrain"],
      },
      streetViewControl: false,
      fullscreenControl: false
    });
    
    google.maps.event.addListener(this.map, "click", (event: any) => {
      this.crearMarcador(event.latLng, this.map);
    });
  }
  
  crearMarcador(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    const marcador = new google.maps.Marker({
      position: location,
      map: map,
      icon: this.image

    });
    google.maps.event.addListener(marcador, "click", (e) => {
      this.openDialog(e);
    })
  }

  openDialog(e: any) {
    this.fecha = moment().format('lll');

    const modalRef = this.dialog.open(ModalReporteComponent, {
      data: ["12345",this.fecha, ""],
    });
    // modalRef.afterClosed().subscribe(modal => {
    //   console.log(e);
    //   if(modal){
    //     console.log('aaaa');
    //   }
    // })
  }

  ngOnInit(): void {
    
  }

}

