import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  signUpForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Adres email jest wymagany' },
      { type: 'pattern', message: 'Wprowadź prawidłowy adres email' }
    ],
    'password': [
      { type: 'required', message: 'Hasło jest wymagane' },
      { type: 'minlength', message: 'Hasło musi zawierać minimum 6 znaków' }
    ],
    'name': [
      { type: 'required', message: 'Imię i nazwisko jest wymagane' },
      { type: 'minlength', message: 'Imię i nazwisko musi zawierać minimum 6 znaków' }
    ]
  };

  constructor(
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService,
  ) {
    this.signUpForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      'name': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
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

  signUpWithEmail() {
    this.authService.signUpWithEmail(this.signUpForm.value['email'], this.signUpForm.value['password'])
    .then(user => {
      this.redirectLoggedUserToProfilePage();
    })
    .catch(error => {
      this.submitError = "Ten adres email jest już przypisany do konta";
    });
  }

  
}