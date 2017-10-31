import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authData: AuthProvider) {

  }

  ionViewCanEnter() {
    return this.authData.authenticated();
  }
}
