import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMainPagePage } from './admin-main-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdminMainPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMainPagePageRoutingModule {}
