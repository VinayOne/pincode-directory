import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { SearchResultComponent } from './dashboard/search-result/search-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pincode/:pincode/:state/:district/:postoffice', component: SearchResultComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
