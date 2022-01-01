import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
 

  constructor(private authService: FirebaseAuthService,
     private router: Router, private alrtCtrl: AlertController
  ) { }

  ngOnInit() {
  }
  async resetPassword(form): Promise<void>{
    this.authService.resetPassword(form.value.email).
    then(
     async () =>{
      const alert = await this.alrtCtrl.create({
        message: 'Na twoją skrzynkę mailową został wysłany link umożliwiający zmianę hasła',
        buttons:[{text:'Ok',role:'cancel',handler:() =>{
          this.router.navigateByUrl('login');
        },},],
      });
      await alert.present();
    },
    async error => {
      const errorAlert = await this.alrtCtrl.create({
        message: error.message,
        buttons:[{text:'Ok',role:'cancel'}],
        
      });
      await errorAlert.present();
    }
    );
  }
}
