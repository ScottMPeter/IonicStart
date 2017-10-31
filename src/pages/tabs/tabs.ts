import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:string = 'HomePage';
  tab2Root:string = 'MapsPage';
  tab3Root:string = 'ListPage';

  constructor(public navCtrl: NavController, public authData: AuthProvider) {

  }


  logOut(){
    this.authData.logoutUser();

    this.navCtrl.setRoot('LoginPage');
  }
}
