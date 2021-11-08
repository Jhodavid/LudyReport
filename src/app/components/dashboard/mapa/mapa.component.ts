import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Coordenada } from './Model/coordenada';
import {MatDialog} from '@angular/material/dialog';
import { ModalReporteComponent } from 'src/app/components/dashboard/mapa/modal-reporte/modal-reporte.component';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {

  map: any;


  @ViewChild('mapElement') mapElement: any;
  constructor(public dialog: MatDialog) { }
   
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
      streetViewControl: true,
      fullscreenControl: true
    });
    
    google.maps.event.addListener(this.map, "click", (event: any) => {
      this.crearMarcador(event.latLng, this.map);
    });
  }
  
  crearMarcador(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    const marcador = new google.maps.Marker({
      position: location,
      map: map,
      

    });
    google.maps.event.addListener(marcador, "click", () => {
      this.openDialog();
      console.log(marcador)
    })
  }
  
  openDialog() {
    this.dialog.open(ModalReporteComponent, {
    });
  }

  ngOnInit(): void {
    
  }

}

