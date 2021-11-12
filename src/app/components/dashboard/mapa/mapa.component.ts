import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalReporteComponent } from 'src/app/components/dashboard/mapa/modal-reporte/modal-reporte.component';
import * as moment from 'moment';
import { ReportesService } from '../../services/reportes.service';
import { FechaService } from '../../services/fecha.service';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {

  map: any;
  image: string;
  reportes: any[] = [];
  marcadores: any[] = [];
  contadorMarcadores: number;

  @ViewChild('mapElement') mapElement: any;
  constructor(public dialog: MatDialog,
              private reportesService: ReportesService,
              private fecha: FechaService) {
    this.image = "././assets/marcador.png";
    this.contadorMarcadores = 0;
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
      icon: "././assets/marcadorRojo.png",
      animation: google.maps.Animation.DROP,
    });

    // ELIMINAMOS ESPACIOS Y PARANTESIS DEL STRING DE UBICACION Y CONVERTIMOS EN ARRAY
    // PARA LUEGO CONVERTIRLO UN OBJETO DE TIPO UBICACION 
    const ubic = (((""+marcador.getPosition()).slice(1, -1)).replace(/\s/g, "")).split(",");
    const ubicacion = {
      lat: ubic[0],
      lng: ubic[1]
    }

    google.maps.event.addListener(marcador, "click", () => {
      const fecha = moment().format('lll');
      const fechaActual = Date.parse(fecha);
      this.openDialog("", "",fechaActual ,"" ,ubicacion, marcador);
      marcador.setMap(null);
    })
  }

  // METODOS
  openDialog(id: any, codigo: any, fecha: any, descripcion: string | undefined, ubicacion: {}, marcador:any) {

    const modalRef = this.dialog.open(ModalReporteComponent, {
      data: [id,codigo,fecha, descripcion, ubicacion],
    });  
  }
  
  generarMarcadores(id: any, codigo: number, fecha: number, descripcion: string , ubicacion: any){

    const posicionMarcador = { lat: parseFloat(ubicacion.lat), lng: parseFloat(ubicacion.lng)}

    const marcador = new google.maps.Marker({
      position: posicionMarcador,
      map: this.map,
      icon: "././assets/marcador.png",
      animation: google.maps.Animation.DROP,
    });

    this.marcadores.push(marcador);

    google.maps.event.addListener(marcador, "click", () => {
      this.openDialog(id, codigo, fecha ,descripcion ,ubicacion, marcador);
    })
  }
  
  getReportes(){

    this.reportesService.getReportes().subscribe(datos => {
      this.reportes = [];
      datos.forEach((reporte:any) => {
        this.reportes.push({
          id: reporte.payload.doc.id,
          ...reporte.payload.doc.data()
        })
        this.contadorMarcadores++;
      });
      this.eliminarMarcadores();

    this.reportes.forEach(reporte => {
      this.generarMarcadores(reporte.id, reporte.codigo, reporte.fecha, reporte.descripcion, reporte.ubicacion);
    })

    })
  }

  eliminarMarcadores(){
    this.marcadores.forEach((marcador:any) => {
        marcador.setMap(null);
    })
  }

  ngOnInit(): void {
    this.getReportes();
  }
}

