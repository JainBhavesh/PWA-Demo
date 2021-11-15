import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-location-tracking',
  templateUrl: './location-tracking.page.html',
  styleUrls: ['./location-tracking.page.scss'],
})
export class LocationTrackingPage {
  location: any;
  constructor(public geolocation: Geolocation) {
    this.getLocation();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Response => ', resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // For Live location update
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data: any) => {
      this.location = data.coords;
    });
  }

}
