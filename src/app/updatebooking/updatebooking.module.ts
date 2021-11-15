import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdatebookingPageRoutingModule } from './updatebooking-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatebookingPage } from './updatebooking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatebookingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatebookingPage]
})
export class UpdatebookingPageModule {}
