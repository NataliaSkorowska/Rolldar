import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMainPagePageRoutingModule } from './admin-main-page-routing.module';

import { AdminMainPagePage } from './admin-main-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMainPagePageRoutingModule
  ],
  declarations: [AdminMainPagePage]
})
export class AdminMainPagePageModule {}
