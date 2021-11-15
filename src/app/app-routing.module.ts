import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },  {
    path: 'offline-storage',
    loadChildren: () => import('./offline-storage/offline-storage.module').then( m => m.OfflineStoragePageModule)
  },
  {
    path: 'location-tracking',
    loadChildren: () => import('./location-tracking/location-tracking.module').then( m => m.LocationTrackingPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
