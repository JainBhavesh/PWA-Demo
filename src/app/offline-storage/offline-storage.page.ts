import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-offline-storage',
  templateUrl: './offline-storage.page.html',
  styleUrls: ['./offline-storage.page.scss'],
})
export class OfflineStoragePage {

  name: any = '';
  pic: any;
  Name: any;
  constructor(public storage: Storage) { }

  save() {
    if (this.name != '') {
      this.storage.set('Name', this.name);
      this.name = '';
    } else {
      alert('Please enter your name');
    }
  }

  getImage() {
    this.storage.get('Image').then(data => {
      this.pic = data;
    });
  }

  getName() {
    this.storage.get('Name').then(data => {
      this.Name = data;
    });
  }
}
