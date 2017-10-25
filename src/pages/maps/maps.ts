import { Component, ViewChild, ElementRef } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { DatabaseProvider } from '../../providers/database/database';
import { IonicPage } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})

export class MapsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers: FirebaseListObservable<any>;
  currentPosition: any;

  constructor(public geolocation: Geolocation, public database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    this.geolocation.getCurrentPosition().then((position) => {

           this.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

           this.markers = this.database.getMarkers(position.coords.latitude, position.coords.longitude);

           let mapOptions = {
             center: this.currentPosition,
             zoom: 15,
             mapTypeId: google.maps.MapTypeId.ROADMAP
           }

           this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

         }, (err) => {
           console.log(err);
         });
  }

  addMarker(){
    this.geolocation.getCurrentPosition().then((position) => {
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
     });

     this.currentPosition = marker.position;

     let content = "<h4>Current Position!</h4><div>" + this.currentPosition +"</div>";

     this.database.saveMarker(position.coords.latitude, position.coords.longitude);

     this.addInfoWindow(marker, content);

    }, (err) => {
      console.log(err);
    });
  }

   addInfoWindow(marker, content){

     let infoWindow = new google.maps.InfoWindow({
       content: content
     });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });

   }

}
