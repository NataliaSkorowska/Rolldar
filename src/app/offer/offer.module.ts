import { OfferPageRoutingModule } from './offer-routing.module';
import { OfferPage } from './offer.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { newArray } from '@angular/compiler/src/util';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);

const routes: Routes = [
  {
    path: '',
    component: OfferPage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferPageRoutingModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
  ],
  declarations: [OfferPage]
})
export class OfferPageModule {}
