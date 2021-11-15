import { Injectable } from "@angular/core";
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AlertController, NavController } from '@ionic/angular';
import * as webNotification from 'simple-web-notification';

@Injectable({
  providedIn: "root"
})
export class NotificationsService {
  token: any = '';
  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public angularFireMessaging: AngularFireMessaging
  ) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.token = token;
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        console.log('Payload => ', payload);
        // const data = JSON.parse(payload.data['gcm.notification.data']);
        const data = payload.data;
        if (this.i) {
          webNotification.showNotification(payload.notification.title, {
            body: data.message,
            icon: 'assets/icon/favicon.png',
            onClick: function onNotificationClicked() {
              this.navCtrl.navigateForward(data.page);
            },
            autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
          }, function onShow(error, hide) {
            if (error) {
              window.alert('Unable to show notification: ' + error.message);
            } else {
              console.log('Notification Shown.');

              setTimeout(function hideNotification() {
                console.log('Hiding notification....');
                hide(); //manually close the notification (you can skip this if you use the autoClose option)
              }, 5000);
            }
          });
        }

        this.redirect(payload.notification.title, data.message, data.page);
      })
  }
  i = true;
  async redirect(title, message, page) {
    setTimeout(() => {
      this.i = true;
    }, 2000);
    if (this.i) {
      this.i = false;
      const alert = await this.alertController.create({
        subHeader: title,
        message: message,
        buttons: [{
          text: 'Okay',
          handler: () => {
            this.navCtrl.navigateForward(page);
          }
        }
        ]
      });

      await alert.present();
    }

  }
}
