import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Injectable()
export class DatabaseProvider {

  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello Database Provider');
  }

  getMarkers(latitude:number, longitude:number): FirebaseListObservable<any> {
    return this.afDB.list('/markers');
  }

  saveMarker(latitude:number, longitude:number){
    this.afDB.list('/markers').push({
      lat: latitude,
      lon: longitude,
      user:"userName",
      time:"moment time value"
    });
  }

}
