import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { DatabaseProvider } from '../../providers/database/database';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  markers: FirebaseListObservable<any[]>;
  currentPosition: any;

  constructor(public geolocation: Geolocation, public database: DatabaseProvider) {
    this.markers = this.database.getMarkers(0,0);
  }

  ionViewDidLoad() {
  }


}
