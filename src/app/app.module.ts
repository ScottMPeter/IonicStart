import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// AF2 Settings
const firebaseConfig = {
    apiKey: "AIzaSyAHse8h1bCLUCnvxOoc5xDVRRE46J8JZXA",
    authDomain: "ionic-start-6352d.firebaseapp.com",
    databaseURL: "https://ionic-start-6352d.firebaseio.com",
    projectId: "ionic-start-6352d",
    storageBucket: "ionic-start-6352d.appspot.com",
    messagingSenderId: "890838654519"
  };

  const IonicPro = Pro.init('5b7acb30', {
    appVersion: "0.0.1"
  });

  export class MyErrorHandler implements ErrorHandler {
    handleError(err: any): void {
      IonicPro.monitoring.handleNewError(err);
    }
  }

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { preloadModules: true }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: MyErrorHandler},
    AuthProvider,
    DatabaseProvider,
    Facebook,
    Geolocation
  ]
})
export class AppModule {}
