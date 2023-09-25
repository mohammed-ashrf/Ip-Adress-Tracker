import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
import { DatePipe } from '@angular/common';
import * as L  from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  input:any;
  reInput:any;
  apiObject:any;
  apiObjectCopy:any;
  errMess: string;
  ip :string;
  ipaddress:string = '';
  latitude:number;
  longitude:number;
  currency:string = '';
  currencysymbol:string = '';
  isp:string= '';
  city:string = '';
  country:string ='';
  timezone:string ='';
  // diplaySubmittingLoading:boolean = false;
  isClicked:boolean = false;
  getmap :boolean = false; 
  time:any;
  mobile:boolean;
  private map : L.Map;
  private centroid: L.LatLngExpression; //sheben el-kom
  constructor(private geolocationService: GeolocationService,
    public datepipe: DatePipe,) { }

  ngOnInit() {
    this.geolocationService.getIpAddress().subscribe(
      (ip) => {
        this.input = document.getElementById('ip-input');
        console.log(ip);
        this.input.value = ip['ip'];
        this.onclick();
      }
    )
  }

  onclick(){
    this.input = document.getElementById('ip-input');
    this.ipaddress = this.input.value;
    console.log(this.ipaddress);
    this.isClicked = true;
    this.geolocationService.getGEOLocation(this.ipaddress).subscribe(res => {
 
      this.ip = res['ip'];
      this.latitude = res['latitude'];
      this.longitude = res['longitude'];
      this.currency = res['currency']['code'];
      this.currencysymbol = res['currency']['symbol'];
      this.city = res['city'] + ",";
      this.country = res['country_code3'];
      this.isp = res['isp'];
      this.timezone = this.datepipe.transform(res['time_zone']['current_time'], 'shortTime');
      this.time = 'UTC -' + this.timezone;
      console.log(res);
      // setting the map
      this.centroid = [this.latitude, this.longitude];
      if (res) {
        this.isClicked = false;
        if(this.map != undefined || this.map != null){
          this.map.remove();
        }
      }
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
      var greenIcon = L.icon({
        iconUrl: '/assets/images/icon-location.svg',
    
        iconSize:     [38, 95], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      var marker = L.marker([this.latitude, this.longitude], {icon: greenIcon});
      marker.addTo(this.map);
      var circle = L.circle([this.latitude, this.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      });
      circle.addTo(this.map);
      marker.bindPopup(this.ip).openPopup();

      function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
      }
    
      this.map.on('click', onMapClick);

    },
    errmess => {this.apiObject = null; this.apiObjectCopy = null; this.errMess = <any>errmess;});
    this.input.value = '';
  }

}
