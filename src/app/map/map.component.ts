import { Component, OnInit } from '@angular/core';
import * as L  from 'leaflet';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  ip: any = this.homecomponent.ip;
  lat : number;
  lng : number;
  clickEvent : boolean = this.homecomponent.isClicked;
  private map : L.Map;
  private centroid: L.LatLngExpression; //sheben el-kom
  private initMap(): void {
    if (this.clickEvent) {
      this.lat = this.homecomponent.latitude;
      console.log(this.lat);
      this.lng = this.homecomponent.longitude;
    }else {
      this.lat = 30.602689478643327; 
      this.lng = 31.00428201827206;
    }
    this.centroid = [this.lat, this.lng];
    this.map = L.map('mapid', {
      center: this.centroid,
      zoom: 13
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
    });
    tiles.addTo(this.map);
    var marker = L.marker([this.lat, this.lng]);
    marker.addTo(this.map);
    var circle = L.circle([this.lat, this.lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    });
    circle.addTo(this.map);
    // marker.bindPopup(this.ip).openPopup();
    // circle.bindPopup("this my area.");

    function onMapClick(e) {
      alert("You clicked the map at " + e.latlng);
    }
  
    this.map.on('click', onMapClick);

  }
  constructor(private homecomponent: HomeComponent) {}

  ngOnInit() {
  }

}
