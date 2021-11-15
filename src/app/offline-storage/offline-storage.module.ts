import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfflineStoragePageRoutingModule } from './offline-storage-routing.module';

import { OfflineStoragePage } from './offline-storage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfflineStoragePageRoutingModule
  ],
  declarations: [OfflineStoragePage]
})
export class OfflineStoragePageModule {}
