import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationTrackingPageRoutingModule } from './location-tracking-routing.module';

import { LocationTrackingPage } from './location-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationTrackingPageRoutingModule
  ],
  declarations: [LocationTrackingPage]
})
export class LocationTrackingPageModule {}
