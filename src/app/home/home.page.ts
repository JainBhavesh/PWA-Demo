import { Component, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { NotificationsService } from '../notifications.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  deferredPrompt;
  image: any;
  showBtn: true;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  deviceId: any;
  constructor(
    public camera: Camera,
    public storage: Storage,
    public notification: NotificationsService
  ) {
  }


  ionViewWillEnter() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later on the button event.
      this.deferredPrompt = e;

      // Update UI by showing a button to notify the user they can add to home screen
      this.showBtn = true;
    });

    //button click event to show the promt

    window.addEventListener('appinstalled', (event) => {
      alert('installed');
    });


    if (window.matchMedia('(display-mode: standalone)').matches) {
      alert('display-mode is standalone');
    }
  }

  add_to_home() {
    // hide our user interface that shows our button
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          alert('User accepted the prompt');
        } else {
          alert('User dismissed the prompt');
        }
        this.deferredPrompt = null;
      });
  };

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.storage.set('Image', this.image);
    }, (err) => {
      // Handle error
    });
  }

  //Webcame 

  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
