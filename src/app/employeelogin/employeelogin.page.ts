import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminauthService } from '../adminauth.service';

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

  constructor(private auth: AdminauthService, private router: Router) {}

  ngOnInit() {}

 
  signIn() {
    this.auth.signIn(this.user).subscribe(user => {
      let role = user['role'];
      if (role === 'ADMIN') {
        this.router.navigateByUrl('/bookings');
      }
    });
  }
}
