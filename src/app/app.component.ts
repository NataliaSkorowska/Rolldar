import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  navigate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.sideNav();  
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  sideNav() {  
    this.navigate =   
    [  
        { 
        title : 'Oferta',
        url   : '/offer',
        icon  : 'apps' 
        },
        {
          title: 'Rezerwuj usługę',
          url: '/booking',
          icon: 'book'
        },
        {
          title: 'Wyloguj',
          url: '/home',
          icon: 'exit-outline'
        }
    ];  
  }  
}
