import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { User, auth } from 'firebase/app';
import { ProfileModel } from './profile/profile.model';
import { filter, map, take, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmployeeloginPageRoutingModule } from './employeelogin/employeelogin-routing.module';

@Injectable()
export class FirebaseAuthService {

  currentUser: User;
  userProviderAdditionalInfo: any;
  redirectResult: Subject<any> = new Subject<any>();
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    public angularFireAuth: AngularFireAuth,
    public platform: Platform,
    public router: Router,
  ) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.isAuthenticated.next(true);
      } else {
        this.currentUser = null;
        this.isAuthenticated.next(false);
      }
    });
    this.angularFireAuth.getRedirectResult()
    .then((result) => {
      if (result.user) {
        this.setProviderAdditionalInfo(result.additionalUserInfo.profile);
        this.currentUser = result.user;
        this.redirectResult.next(result);
        this.isAuthenticated.next(true);
      }
    }, (error) => {
      this.redirectResult.next({error: error.code});
      this.isAuthenticated.next(false);
    });
  }
  
  getRedirectResult(): Observable<any> {
    return this.redirectResult.asObservable();
  }
  
  setProviderAdditionalInfo(additionalInfo: any) {
    this.userProviderAdditionalInfo = {...additionalInfo};
  }

  public getProfileDataSource() {
    return this.angularFireAuth.user
    .pipe(
      filter((user: User) => user != null),
      map((user: User) => {
        return this.getProfileData();
      }),
      take(1) 
    );
  }

  public getProfileData() {
    const userModel = new ProfileModel();
    let providerData : any = this.currentUser.providerData[0];

    if (this.userProviderAdditionalInfo) {
      providerData = {...providerData, ...this.userProviderAdditionalInfo};
    }

    switch (providerData.providerId) {
      case 'facebook.com':
      case 'google.com':
      default:
    }
    userModel.name = providerData.name || providerData.displayName || 'What\'s your name?';
    userModel.description = providerData.description || 'Anything else you would like to share with the world?';
    userModel.phoneNumber = providerData.phoneNumber || 'Is there a number where I can reach you?';
    userModel.email = providerData.email || 'Where can I send you emails?';

    return userModel;
  }

  signOut(): Observable<any> {
    return from(this.angularFireAuth.signOut());
  }

  signInWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  socialSignIn(providerName: string, scopes?: Array<string>): Promise<any> {
    const provider = new auth.OAuthProvider(providerName);

    if (scopes) {
      scopes.forEach(scope => {
        provider.addScope(scope);
      });
    }

    if (this.platform.is('desktop')) {
      return this.angularFireAuth.signInWithPopup(provider);
    } else {
      return this.angularFireAuth.signInWithRedirect(provider);
    }
  }

  signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
    return this.socialSignIn(provider.providerId);
  }

  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const scopes = ['profile', 'email'];
    return this.socialSignIn(provider.providerId, scopes);
  }

  signInWithTwitter() {
    const provider = new auth.TwitterAuthProvider();
    return this.socialSignIn(provider.providerId);
  }

}
