import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminauthService } from '../adminauth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-employeelogin',
  templateUrl: './employeelogin.page.html',
  styleUrls: ['./employeelogin.page.scss'],
})
export class EmployeeloginPage implements OnInit {

  user = {
    email: '',
    pw: ''
  };

  constructor(private auth: AdminauthService, 
    private router: Router,
    private alertCtrl:AlertController) {}

  ngOnInit() {}

  signIn() {
    this.auth.signIn(this.user).subscribe(async user => {
      let role = user['role'];
      if (role === 'ADMIN') {
        this.router.navigateByUrl('/admin-main-page');
      }
      if (role === 'UNDEFINED')
      {
        const alert = await this.alertCtrl.create({
          header: 'Uwaga',
          message: 'Podano błędne dane logowania.'
          +' Spróbuj ponownie.',
           buttons:[{text:'Ok',role:'cancel'}],
         });
         await alert.present();
       }
      })
    }
}
