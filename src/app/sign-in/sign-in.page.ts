import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireDatabase } from "@angular/fire/database";
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss'],
})
export class SignInPage {
  user = null;
  ref: any;
  count: Observable<any>;
  signInForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Adres email jest wymagany' },
      { type: 'pattern', message: 'Wprowadź poprawny adres email' }
    ],
    'password': [
      { type: 'required', message: 'Hasło jest wymagane' },
      { type: 'minlength', message: 'Hasło musi mieć długość minimum 6 znaków' }
    ]
  };

  constructor(
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService,
    private db:AngularFireDatabase,
    private fb: FormBuilder,
  ) {
    this.signInForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
   
    this.angularFire.authState.subscribe((user) => {
      this.user = user ? user : null;
      if (this.user !== null) {
        this.ref = db.object(user.uid);
        this.count = this.ref.valueChanges();
        this.count.subscribe((initial) => {
          if (initial === null) this.ref.set(1);
        });
      }
    });

    this.authRedirectResult = this.authService.getRedirectResult()
    .subscribe(result => {
      if (result.user) {
        this.redirectLoggedUserToProfilePage();
      } else if (result.error) {
        this.submitError = result.error;
      }
    });
  }

  redirectLoggedUserToProfilePage() {
    this.ngZone.run(() => {
      this.router.navigate(['offer']);
    });
  }
  logout() {
    this.angularFire.signOut();
  }
  signInWithEmail() {
    this.authService.signInWithEmail(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      this.redirectLoggedUserToProfilePage();
    })
    .catch(error => {
      this.submitError = error.message;
    });
  }

  facebookSignIn() {
    this.authService.signInWithFacebook()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.redirectLoggedUserToProfilePage();
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }

  googleSignIn() {
    this.authService.signInWithGoogle()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.redirectLoggedUserToProfilePage();
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }

  twitterSignIn() {
    this.authService.signInWithTwitter()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Twitter Access Token. You can use it to access the Twitter API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.redirectLoggedUserToProfilePage();
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }
}
