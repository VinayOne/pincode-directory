import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SearchResultComponent } from './dashboard/search-result/search-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(mod => mod.AboutUsModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(mod => mod.PrivacyPolicyModule)
  },
  {
    path: 'disclaimer',
    loadChildren: () => import('./disclaimer/disclaimer.module').then(mod => mod.DisclaimerModule)
  },
  { path: 'pincode/:pincode/:state/:district/:postoffice', component: SearchResultComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
