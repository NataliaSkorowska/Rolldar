import {
  Injectable
} from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  of
} from 'rxjs';
import {
  Router
} from '@angular/router';
import {
  filter
} from 'rxjs/operators';
const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AdminauthService {

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

    if (email === 'admin' && pw === 'admin') {
      user = {
        email,
        role: 'ADMIN'
      };
    } else if (email === 'user' && pw === 'user') {
      user = {
        email,
        role: 'USER'
      };
    }
    this.authState.next(user);

    return of(user);
  }

  async signOut() {
    this.authState.next(null);
    this.router.navigateByUrl('/login');
  }
}
