import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { FirebaseAuthService } from './firebase-auth.service';
import { GuardService } from './services/guard.service';
import { AdminauthService } from './adminauth.service';

const routes: Routes = [
  { path: 'profile',
  loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
  canActivate: [GuardService],
},
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'offer',
    loadChildren: () => import('./offer/offer.module').then( m => m.OfferPageModule),
    canActivate: [GuardService]
  },
  { path: 'offer-details/:id',
    loadChildren: () =>
    import('./offer-details/offer-details.module').then((m) => m.OfferDetailsPageModule),
    canActivate: [GuardService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'employeelogin',
    loadChildren: () => import('./employeelogin/employeelogin.module').then( m => m.EmployeeloginPageModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then( m => m.BookingsPageModule),
  },
  {
    path: 'offer-details',
    loadChildren: () => import('./offer-details/offer-details.module').then( m => m.OfferDetailsPageModule),
    canActivate: [GuardService]   
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule),
  },
  {
    path: 'updatebooking/:id',
    loadChildren: () => import('./updatebooking/updatebooking.module').then( m => m.UpdatebookingPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'updatebooking',
    loadChildren: () => import('./updatebooking/updatebooking.module').then( m => m.UpdatebookingPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then( m => m.InvoicesPageModule)
  },
  {
    path: 'admin-main-page',
    loadChildren: () => import('./admin-main-page/admin-main-page.module').then( m => m.AdminMainPagePageModule)
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
