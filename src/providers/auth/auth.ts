import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook'

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public facebook: Facebook) {
    console.log('Hello AuthProvider Provider');
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
        firebase.database().ref('/userProfile').child(newUser.uid)
        .set({ email: email });
  });
}

  logoutUser(): firebase.Promise<void>{
    return this.afAuth.auth.signOut();
  }

  authenticated(): boolean{
    return this.afAuth.auth.currentUser.uid !== null;
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
          });

      }).catch((error) => { console.log(error) });

  }

  googleLogin():void {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then( () => {
      firebase.auth().getRedirectResult().then( result => {
        if (result.credential) {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log(token, user);
        }
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error.message);
      });
    });
  }

}
