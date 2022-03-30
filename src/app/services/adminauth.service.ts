import {
  Injectable
} from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  of
} from 'rxjs';
import {
  CanActivate,
  Router
} from '@angular/router';
import {
  filter
} from 'rxjs/operators';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminauthService {
  public isAuthenticated: boolean;

  user: Observable < any > ;
  private authState = new BehaviorSubject(null);

  constructor(private router: Router) {

    this.user = this.authState
      .asObservable()
      .pipe(filter(response => response));
  }  
  signIn(credentials) {
    let email = credentials.email;
    let pw = credentials.pw;
    let user = null;
    

    if (email === '*' && pw === '*') {
      user = {
        email,
        role: 'ADMIN'
      };
    } else if (email === '*' && pw === '*') {
      user = {
        email,
        role: 'USER'
      };
    }
    else{
      user={
        role: 'UNDEFINED'
      }
    }
    this.authState.next(user);
    return of(user);
  }

  async signOut() {
    this.authState.next(null);
    this.router.navigateByUrl('/login');
  }
}
