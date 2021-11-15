import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blind } from './blind.model';
import { BlindService } from '../blind.service';
import { FirebaseAuthService } from '../firebase-auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileModel } from '../profile/profile.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  user: ProfileModel;
  term;
  blinds: Blind[]=[];
  
  constructor(private blindService: BlindService, private router : Router,
    private route: ActivatedRoute,
      private authService: FirebaseAuthService) { }

  ngOnInit() {
    this.blinds = this.blindService.getBlinds();
    this.route.data
      .subscribe((result) => {
        this.user = result['data'];
      }, (err) => {})
  }
  signOut() {
    this.authService.signOut().subscribe(() => {
      // Sign-out successful.
      this.router.navigate(['sign-in']);
    }, (error) => {
      console.log('signout error', error);
    });
  }
  goToDetailPage(id: number) {
    this.router.navigate(['offer-details', id]);
  }
}
