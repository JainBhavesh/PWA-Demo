import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfflineStoragePage } from './offline-storage.page';

const routes: Routes = [
  {
    path: '',
    component: OfflineStoragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflineStoragePageRoutingModule {}
