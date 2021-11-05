import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {

  map: any;
  @ViewChild('mapElement') mapElement: any;


  constructor() {

   }
  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: 10.997655, lng: -74.790784 },
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
    
    const myLatLng = { lat: -25.363, lng: 131.044 };

    // new google.maps.Marker({
    //   position: myLatLng,
    //   map,
    //   title: "Hello World!",
    // });

  }

  ngOnInit(): void {
    
  }
  
}