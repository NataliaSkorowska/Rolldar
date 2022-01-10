import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FirebaseAuthService } from './services/firebase-auth.service';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { Camera } from '@ionic-native/camera/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireAuthGuardModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseAuthService,
    AngularFireAuthGuardModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
