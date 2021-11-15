import { Component } from "@angular/core";

import { Platform, NavController, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";
import { firebase } from "@firebase/app";
import { NotificationsService } from "./notifications.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "Offline Storage",
      url: "/offline-storage",
      icon: "list"
    },
    {
      title: "Location Tracking",
      url: "/location-tracking",
      icon: "pin"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public push: Push,
    public nav: NavController,
    public alertCtrl: AlertController,
    public notificationsService: NotificationsService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.notificationsService.requestPermission();
    this.notificationsService.receiveMessage();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // console.log("firebase  => ", firebase);
      // if (!firebase.apps.length) {
      // }
      // this.notificationsService.init();
      this.notificationsService.requestPermission();
      this.notificationsService.receiveMessage();


      if (this.platform.is("android")) {
        const options: PushOptions = {
          android: {},
          ios: {
            alert: "true",
            badge: true,
            sound: "false"
          },
          windows: {},
          browser: {
            pushServiceURL: "http://push.api.phonegap.com/v1/push"
          }
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject
          .on("notification")
          .subscribe((notification: any) =>
            console.log("Received a notification", notification)
          );

        pushObject
          .on("registration")
          .subscribe((registration: any) =>
            console.log("Device registered", registration)
          );

        pushObject
          .on("error")
          .subscribe(error => console.error("Error with Push plugin", error));
      }
    });
  }
}
