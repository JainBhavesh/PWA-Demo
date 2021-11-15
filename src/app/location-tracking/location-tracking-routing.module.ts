import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationTrackingPage } from './location-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: LocationTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationTrackingPageRoutingModule {}
