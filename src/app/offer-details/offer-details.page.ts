import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blind } from '../offer/blind.model';
import { BlindService } from '../services/blind.service';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.page.html',
  styleUrls: ['./offer-details.page.scss'],
})
export class OfferDetailsPage implements OnInit {
  id: number;
  blind: Blind;
  slider: any;
  slideOptions = {
  initialSlide: 0,
  slidesPerView: 1,
  autoplay: true
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private blindService: BlindService,
    private navCtrl: NavController) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.blind=this.blindService.getBlind(this.id);
  }
}
