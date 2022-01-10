import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import * as firebase from 'firebase/app';
import "firebase/auth";
import { AdminauthService } from "./adminauth.service";

@Injectable({
  providedIn: "root",
})
export class GuardService implements CanActivate {
  constructor(private router: Router,
    private adminAuth:AdminauthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise<boolean>((resolve) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (!user) {
          this.router.navigate(["home"]);
        }
        resolve(true);
      });
    });
  }
}

